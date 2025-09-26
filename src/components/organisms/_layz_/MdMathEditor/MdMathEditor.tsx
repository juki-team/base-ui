import {
  cleanRequest,
  consoleWarn,
  type ContentResponseType,
  isChatCompletionsResponseWebSocketResponseEventDTO,
  Status,
  type SubscribeChatCompletionsDataWebSocketEventDTO,
  WebSocketActionEvent,
} from '@juki-team/commons';
import { insert } from '@milkdown/kit/utils';
import { MilkdownProvider, useInstance } from '@milkdown/react';
import { getMarkdown } from '@milkdown/utils';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { authorizedRequest, classNames, downloadBlobAsFile, upperFirst } from '../../../helpers';
import { jukiApiManager } from '../../../../settings';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { useWebsocketStore } from '../../../../stores/websocket/useWebsocketStore';
import { Modal, T, TextArea } from '../../../atoms';
import { ArticleIcon, CodeIcon, DownloadIcon, EditNoteIcon, LineLoader, SendIcon } from '../../../atoms/server';
import { ButtonLoader, FloatToolbar } from '../../../molecules';
import { ImageUploaderModal } from '../../ImageUploaderModal/ImageUploaderModal';
import type { MdMathEditorProps } from '../../MdMathViewer/types';
import { MilkdownEditorContent } from './MilkdownEditorContent/MilkdownEditorContent';
import { TextPlainEditorContent } from './TextPlainEditorContent/TextPlainEditorContent';

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
  const websocket = useWebsocketStore(store => store.websocket);
  const connectionId = useWebsocketStore(store => store.connectionId);
  const sessionId = useUserStore(store => store.user.sessionId);
  const t = useI18nStore(store => store.i18n.t);
  
  useEffect(() => {
    const event: SubscribeChatCompletionsDataWebSocketEventDTO = {
      event: WebSocketActionEvent.SUBSCRIBE_CHAT_COMPLETIONS_DATA,
      sessionId,
    };
    websocket.subscribe(event, (data) => {
      if (isChatCompletionsResponseWebSocketResponseEventDTO(data)) {
        setChat(prevState => [
          ...prevState,
          ...data.content.choices.map(({ message }) => ({ content: message.content, user: ChatRole.IA })),
        ]);
      }
    });
    
    return () => {
      websocket.unsubscribeAll(event);
    };
  }, [ sessionId, websocket ]);
  
  return (
    <div className="jk-pg jk-col gap stretch">
      <h3><T>Juki Redactor Agent</T></h3>
      <div className="jk-col gap">
        {chat.map((chat) => (
          <div
            className="jk-pg-sm bc-hl jk-br-ie"
            style={{
              maxWidth: '60%',
              whiteSpace: 'break-spaces',
              alignSelf: chat.user === ChatRole.IA ? 'start' : 'end',
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
              const { url, ...options } = jukiApiManager.API_V1.ia.chatCompletions({
                body: {
                  content: value,
                  connectionId,
                },
              });
              const request = cleanRequest<ContentResponseType<{}>>(
                await authorizedRequest(url, options),
              );
              if (request?.success) {
                setChat(prevState => [ ...prevState, { content: value, user: ChatRole.USER } ]);
                setValue('');
                setLoader(Status.SUCCESS);
              } else {
                consoleWarn('run code request failed', { request });
                setLoader(Status.ERROR);
              }
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

function Toolbar({ enableDownload, enableTextPlain, setMode, mode, enableIA }: ToolbarProps) {
  
  const [ _, getInstance ] = useInstance();
  const [ openModalIA, setOpenModalIA ] = useState(false);
  
  return (
    <>
      <Modal isOpen={openModalIA} onClose={() => setOpenModalIA(false)} closeIcon>
        <IAModalContent />
      </Modal>
      <FloatToolbar
        actionButtons={[
          ...(enableTextPlain ? [ {
            icon: mode === Mode.TEXT_PLAIN ? <ArticleIcon /> : <CodeIcon />,
            buttons: [
              {
                icon: mode === Mode.TEXT_PLAIN ? <ArticleIcon /> : <CodeIcon />,
                label: mode === Mode.TEXT_PLAIN ? <T>WYSIWYG</T> : <T>view as text plain</T>,
                onClick: () => setMode(mode === Mode.TEXT_PLAIN ? Mode.WYSIWYG : Mode.TEXT_PLAIN),
              },
            ],
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
            icon: <EditNoteIcon />,
            buttons: [
              {
                icon: <EditNoteIcon />,
                label: <T>Juki Redactor Agent</T>,
                onClick: () => setOpenModalIA(!openModalIA),
              },
            ],
          } ] : []),
        ]}
        placement="rightTop"
      />
    </>
  );
}

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

export default function MdMathEditor({
                                       value,
                                       onChange,
                                       className,
                                       enableTextPlain = false,
                                       enableDownload = false,
                                       enableImageUpload = false,
                                       enableIA = false,
                                     }: MdMathEditorProps) {
  
  const [ loader, setLoader ] = useState(Status.NONE);
  const [ mode, setMode ] = useState(Mode.WYSIWYG);
  
  return (
    <MilkdownProvider>
      <div className={classNames('jk-md-math-editor wh-100 pn-re', className)}>
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
