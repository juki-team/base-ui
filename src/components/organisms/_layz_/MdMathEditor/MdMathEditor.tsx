import {
  ChatCompletionsWebSocketEventDTO,
  consoleWarn,
  isSenDataChatCompletionsWebSocketResponseEventDTO,
  Status,
  SubscribeGetDataWebSocketEventDTO,
  WebSocketMessageEvent,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { editorViewCtx } from '@milkdown/core';
import { insert } from '@milkdown/kit/utils';
import { MilkdownProvider, useInstance } from '@milkdown/react';
import { getMarkdown } from '@milkdown/utils';
import { type Dispatch, memo, type SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { useWebsocketStore } from '../../../../stores/websocket/useWebsocketStore';
import { Modal, T, TextArea } from '../../../atoms';
import { ArticleIcon, CodeIcon, DownloadIcon, EditNoteIcon, LineLoader, SendIcon } from '../../../atoms/server';
import { classNames, downloadBlobAsFile, upperFirst } from '../../../helpers';
import { useStableRef } from '../../../hooks/useStableRef';
import { useSubscribe } from '../../../hooks/useSubscribe';
import { ButtonLoader, FloatToolbar } from '../../../molecules';
import { MdMathViewer } from '../../MdMathViewer/MdMathViewer';
import { ImageUploaderModal } from '../../modals';
import { MilkdownEditorContent } from './MilkdownEditorContent/MilkdownEditorContent';
import { TextPlainEditorContent } from './TextPlainEditorContent/TextPlainEditorContent';
import type { MdMathEditorProps } from './types';

enum Mode {
  WYSIWYG = 'WYSIWYG',
  TEXT_PLAIN = 'TEXT_PLAIN',
}

interface ToolbarProps {
  enableDownload: boolean,
  enableIA: boolean,
  enableTextPlain: boolean,
  mode: Mode,
  setMode: Dispatch<SetStateAction<Mode>>,
}

enum ChatRole {
  IA = 'IA',
  USER = 'USER',
}

function IAModalContent() {
  
  const [ value, setValue ] = useState('');
  const [ chat, setChat ] = useState<{ content: string, user: ChatRole }[]>([]);
  const clientId = useUserStore(store => store.clientId);
  const t = useI18nStore(store => store.i18n.t);
  const chatIdRef = useRef(v4());
  const channelMessages = useWebsocketStore(store => store.channelPublishMessages);
  
  const event: Omit<SubscribeGetDataWebSocketEventDTO, 'clientId'> = {
    event: WebSocketSubscriptionEvent.SUBSCRIBE_GET_DATA,
    dataId: chatIdRef.current,
  };
  useSubscribe(
    event,
    (data) => {
      if (isSenDataChatCompletionsWebSocketResponseEventDTO(data)) {
        setChat(prevState => [
          ...prevState,
          ...data.content.choices.map(({ message }) => ({ content: message.content, user: ChatRole.IA })),
        ]);
      }
    },
  );
  
  return (
    <div className="jk-pg jk-col gap stretch">
      <h3><T>Juki Redactor Agent</T></h3>
      <div className="jk-col gap wh-100">
        {chat.map((chat) => (
          chat.user === ChatRole.IA ?
            <div
              key={chat.content}
              className="jk-pg-sm bc-hl jk-br-ie"
              style={{
                maxWidth: '60%',
                whiteSpace: 'break-spaces',
                alignSelf: 'start',
              }}
            >
              <MdMathViewer source={chat.content} />
            </div>
            :
            <div
              key={chat.content}
              className="jk-pg-sm bc-hl jk-br-ie"
              style={{
                maxWidth: '60%',
                whiteSpace: 'break-spaces',
                alignSelf: 'end',
              }}
            >
              {chat.content}
            </div>
        ))}
      </div>
      <div className="jk-row gap nowrap wh-100 sticky-bottom jk-pg-sm bc-we jk-br-ie stretch">
        <TextArea value={value} onChange={setValue} placeholder={upperFirst(t('ask something'))} />
        <ButtonLoader
          icon={<SendIcon />}
          onClick={async (setLoader) => {
            setLoader(Status.LOADING);
            try {
              const event: ChatCompletionsWebSocketEventDTO = {
                event: WebSocketMessageEvent.CHAT_COMPLETIONS,
                clientId,
                content: value,
                chatAiId: chatIdRef.current,
              };
              await channelMessages?.publish('', event);
              setChat(prevState => [ ...prevState, { content: value, user: ChatRole.USER } ]);
              setLoader(Status.NONE);
            } catch (error) {
              consoleWarn('error on run code', { error });
              setLoader(Status.ERROR);
            }
          }}
        />
      </div>
    </div>
  );
}

const Toolbar = memo(function Toolbar({
                                        enableDownload,
                                        enableTextPlain,
                                        setMode,
                                        mode,
                                        enableIA,
                                      }: ToolbarProps) {
  
  const [ , getInstance ] = useInstance();
  const [ openModalIA, setOpenModalIA ] = useState(false);
  
  const actionButtons = useMemo(() => [
    ...(enableTextPlain ? [ {
      icon: mode === Mode.TEXT_PLAIN
        ? <ArticleIcon
          onClick={() => setMode(Mode.WYSIWYG)}
          data-tooltip-id="jk-tooltip"
          data-tooltip-content="WYSIWYG"
          data-tooltip-place="left"
        />
        : <CodeIcon
          onClick={() => setMode(Mode.TEXT_PLAIN)}
          data-tooltip-id="jk-tooltip"
          data-tooltip-content="view as text plain"
          data-tooltip-place="left"
        />,
    } ] : []),
    ...(enableDownload ? [ {
      icon: <DownloadIcon />,
      buttons: [
        // TODO:
        // {
        //   icon: <DownloadIcon />,
        //   label: <T>pdf</T>,
        //   onClick: handleShareMdPdf('pdf', source, sourceUrl, setSourceUrl, userTheme),
        // },
        {
          icon: <DownloadIcon />,
          label: <T>md</T>,
          onClick: () => downloadBlobAsFile(new Blob([ getInstance()?.action(getMarkdown()) ?? '' ], { type: 'text/plain' }), 'file.md'),
        },
      ],
    } ] : []),
    ...(enableIA ? [ {
      icon: (
        <EditNoteIcon
          onClick={() => setOpenModalIA(!openModalIA)}
          data-tooltip-id="jk-tooltip"
          data-tooltip-content="Juki Redactor Agent"
          data-tooltip-place="left"
        />
      ),
    } ] : []),
  ], [ enableDownload, enableIA, enableTextPlain, getInstance, mode, openModalIA, setMode ]);
  
  return (
    <>
      <Modal isOpen={openModalIA} onClose={() => setOpenModalIA(false)} closeIcon>
        <IAModalContent />
      </Modal>
      <FloatToolbar actionButtons={actionButtons} offset={4} />
    </>
  );
});

function ImageUploader({ mode }: { mode: Mode }) {
  
  const [ isLoading, getInstance ] = useInstance();
  const [ openImageModal, setOpenImageModal ] = useState(false);
  
  return (
    <ImageUploaderModal
      isOpen={openImageModal}
      onClose={() => setOpenImageModal(false)}
      copyButtons
      onPickImageUrl={({ imageUrl }) => {
        if (mode === Mode.TEXT_PLAIN) {
          // TODO: insert on text area
        } else if (mode === Mode.WYSIWYG) {
          if (isLoading) return;
          
          const editor = getInstance();
          if (!editor) return;
          
          editor.action(insert(`![image](${imageUrl})`));
          setOpenImageModal(false);
        }
      }}
    />
  );
}

const Focus = () => {
  
  const [ isLoading, getInstance ] = useInstance();
  
  useEffect(() => {
    if (!isLoading) {
      const editor = getInstance();
      if (editor) {
        editor.action((ctx) => {
          const view = ctx.get(editorViewCtx);
          view.focus();
        });
      }
    }
  }, [ isLoading, getInstance ]);
  
  return null;
};

export default function MdMathEditor(props: MdMathEditorProps) {
  
  const {
    value,
    onChange,
    className,
    enableTextPlain = false,
    enableDownload = false,
    enableImageUpload = false,
    enableIA = false,
    onBlur,
  } = props;
  
  const [ loader, setLoader ] = useState(Status.NONE);
  const [ mode, setMode ] = useState(Mode.WYSIWYG);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onBlurRef = useStableRef(onBlur);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains?.(event.target as Node)) {
        onBlurRef.current?.();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ wrapperRef, onBlurRef ]);
  
  return (
    <MilkdownProvider>
      <div ref={wrapperRef} className={classNames('jk-md-math-editor wh-100 pn-re', className)} onBlur={onBlur}>
        {!!onBlur && <Focus />}
        {loader === Status.LOADING && <LineLoader />}
        {loader === Status.LOADING && (
          <div className="jk-loader-layer pn-ae jk-col">
            <div className="jk-loader-layer pn-ae jk-overlay-backdrop" style={{ opacity: 0.8, zIndex: 1 }}></div>
            <div
              className="jk-row"
              style={{
                zIndex: 1,
                position: 'sticky',
                margin: '0 auto',
                top: 0,
                bottom: '50%',
                transform: 'translate(0, 100%)',
              }}
            >
              <div className="jk-row bc-we jk-pg-sm jk-br-ie" style={{ alignItems: 'baseline' }}>
                <T className="tt-se">uploading images</T> &nbsp;
                <div className="dot-flashing" />
              </div>
            </div>
          </div>
        )}
        <Toolbar
          enableTextPlain={enableTextPlain}
          enableDownload={enableDownload}
          enableIA={enableIA}
          setMode={setMode}
          mode={mode}
        />
        <ImageUploader mode={mode} />
        {mode === Mode.WYSIWYG && (
          <MilkdownEditorContent
            value={value}
            onChange={onChange}
            setLoader={setLoader}
            enableImageUpload={enableImageUpload}
          />
        )}
        {mode === Mode.TEXT_PLAIN && (
          <TextPlainEditorContent
            value={value}
            onChange={onChange}
            setLoader={setLoader}
            enableImageUpload={enableImageUpload}
          />
        )}
      </div>
    </MilkdownProvider>
  );
}
