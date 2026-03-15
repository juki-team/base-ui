import { Status } from '@juki-team/commons';
import { editorViewCtx } from '@milkdown/core';
import { insert } from '@milkdown/kit/utils';
import { MilkdownProvider, useInstance } from '@milkdown/react';
import { getMarkdown } from '@milkdown/utils';
import {
  type Dispatch,
  forwardRef,
  memo,
  type SetStateAction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { T } from '../../../atoms';
import { ArticleIcon, CodeIcon, DownloadIcon, LineLoader } from '../../../atoms/server';
import { classNames, downloadBlobAsFile } from '../../../helpers';
import { useStableRef } from '../../../hooks/useStableRef';
import { FloatToolbar } from '../../../molecules';
import { ImageUploaderModal } from '../../modals';
import { MilkdownEditorContent, type MilkdownEditorContentHandle } from './MilkdownEditorContent/MilkdownEditorContent';
import { TextPlainEditorContent } from './TextPlainEditorContent/TextPlainEditorContent';
import type { MdMathEditorHandle, MdMathEditorProps } from './types';

enum Mode {
  WYSIWYG = 'WYSIWYG',
  TEXT_PLAIN = 'TEXT_PLAIN',
}

interface ToolbarProps {
  enableDownload: boolean;
  enableTextPlain: boolean;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
}

const Toolbar = memo(function Toolbar({ enableDownload, enableTextPlain, setMode, mode }: ToolbarProps) {
  const [, getInstance] = useInstance();

  const actionButtons = useMemo(
    () => [
      ...(enableTextPlain
        ? [
            {
              icon:
                mode === Mode.TEXT_PLAIN ? (
                  <ArticleIcon
                    onClick={() => setMode(Mode.WYSIWYG)}
                    data-tooltip-id="jk-tooltip"
                    data-tooltip-content="WYSIWYG"
                    data-tooltip-place="left"
                  />
                ) : (
                  <CodeIcon
                    onClick={() => setMode(Mode.TEXT_PLAIN)}
                    data-tooltip-id="jk-tooltip"
                    data-tooltip-content="view as text plain"
                    data-tooltip-place="left"
                  />
                ),
            },
          ]
        : []),
      ...(enableDownload
        ? [
            {
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
                  onClick: () =>
                    downloadBlobAsFile(
                      new Blob([getInstance()?.action(getMarkdown()) ?? ''], { type: 'text/plain' }),
                      'file.md',
                    ),
                },
              ],
            },
          ]
        : []),
    ],
    [enableDownload, enableTextPlain, getInstance, mode, setMode],
  );

  return <FloatToolbar actionButtons={actionButtons} offset={4} />;
});

function ImageUploader({ mode }: { mode: Mode }) {
  const [isLoading, getInstance] = useInstance();
  const [openImageModal, setOpenImageModal] = useState(false);

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
  const [isLoading, getInstance] = useInstance();

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
  }, [isLoading, getInstance]);

  return null;
};

const MdMathEditor = forwardRef<MdMathEditorHandle, MdMathEditorProps>(function MdMathEditor(props, ref) {
  const {
    value,
    onChange,
    className,
    enableTextPlain = false,
    enableDownload = false,
    enableImageUpload = false,
    onBlur,
  } = props;

  const [loader, setLoader] = useState(Status.NONE);
  const [mode, setMode] = useState(Mode.WYSIWYG);
  const editorRef = useRef<MilkdownEditorContentHandle>(null);

  useImperativeHandle(
    ref,
    () => ({
      getSelectionMarkdown: () => editorRef.current?.getSelectionMarkdown() ?? '',
      replaceSelectionWithMarkdown: (md: string) => editorRef.current?.replaceSelectionWithMarkdown(md),
      highlightSelectionNodes: (className: string) => editorRef.current?.highlightSelectionNodes(className),
      clearHighlight: () => editorRef.current?.clearHighlight(),
    }),
    [],
  );

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
  }, [wrapperRef, onBlurRef]);

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
        <Toolbar enableTextPlain={enableTextPlain} enableDownload={enableDownload} setMode={setMode} mode={mode} />
        <ImageUploader mode={mode} />
        {mode === Mode.WYSIWYG && (
          <MilkdownEditorContent
            ref={editorRef}
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
});

export default MdMathEditor;
