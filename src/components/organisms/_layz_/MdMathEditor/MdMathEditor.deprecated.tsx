import { NotificationType, Status } from '@juki-team/commons/enums';
import { type ClipboardEventHandler, type Dispatch, type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../constants';
import { Button } from '../../../atoms/Button/Button';
import { Modal } from '../../../atoms/Modal/Modal';
import { T } from '../../../atoms/T/T';
import { TextArea } from '../../../atoms/TextArea/TextArea';
import { classNames } from '../../../helpers/commons';
import { handleUploadImage } from '../../../helpers/fetch';
import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { SplitPane } from '../../../molecules/SplitPane/SplitPane';
import { CloseIcon } from '../../../atoms/server/icons/google/CloseIcon';
import { EditIcon } from '../../../atoms/server/icons/google/EditIcon';
import { InfoIIcon } from '../../../atoms/server/icons/google/InfoIIcon';
import { PreviewIcon } from '../../../atoms/server/icons/google/PreviewIcon';

import { ImageUploaderButton } from '../../ImageUploaderButton/ImageUploaderButton';
import { SAMPLE_MD_CONTENT } from '../../MdMathViewer/constants';
import { MdFloatToolbar } from '../../MdMathViewer/MdFloatToolbar/MdFloatToolbar';
import { MdMathViewer } from '../../MdMathViewer/MdMathViewer';
import { MemoMdMathViewer } from '../../MdMathViewer/MemoMdMathViewer.deprecated';
import type { MdMathEditorDeprecatedProps } from '../../MdMathViewer/types';

interface InformationButtonProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  isOpenRef?: RefObject<boolean>;
  withLabel: boolean;
}

const InformationButton = ({ open, setOpen, isOpenRef, withLabel }: InformationButtonProps) => {
  const [source, setSource] = useState(SAMPLE_MD_CONTENT);
  // biome-ignore lint/correctness/useExhaustiveDependencies: open is a trigger to reset the sample on every reopen
  useEffect(() => setSource(SAMPLE_MD_CONTENT), [open]);
  if (isOpenRef) {
    isOpenRef.current = open;
  }

  return (
    <>
      <Button
        data-tooltip-id="jk-tooltip"
        data-tooltip-content={withLabel ? '' : 'information'}
        data-tooltip-t-class-name="ws-np tt-se"
        size="small"
        type="ghost"
        icon={<InfoIIcon circle />}
        onClick={() => setOpen(true)}
      >
        {withLabel && <T className="tt-se">information</T>}
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <MdMathEditorDeprecated initialMd={source} onChange={setSource} />
      </Modal>
    </>
  );
};

enum View {
  ONLY_EDITOR = 'ONLY_EDITOR',
  EDITOR_VIEWER_HORIZONTAL = 'EDITOR_VIEWER_HORIZONTAL',
  EDITOR_VIEWER_VERTICAL = 'EDITOR_VIEWER_VERTICAL',
  ONLY_VIEWER = 'ONLY_VIEWER',
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
export const MdMathEditorDeprecated = (props: MdMathEditorDeprecatedProps) => {
  const {
    initialMd: source,
    onChange,
    informationButton = false,
    uploadImageButton = false,
    downloadButton = false,
    // sharedButton = false,
    initEditMode = false,
    // onPickImageUrl,
  } = props;

  const [view, setView] = useState<View>(View.EDITOR_VIEWER_HORIZONTAL);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mdSource, setMdSource] = useState(source);
  const [editing, setEditing] = useState(initEditMode);
  const [loader, setLoader] = useState<Status>(Status.NONE);
  const layoutEditorRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useJukiNotification();
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const changeSource = useCallback((newText: string, editing: boolean, view: View) => {
    const fun = () => {
      if (
        editing &&
        (view === View.ONLY_EDITOR || view === View.EDITOR_VIEWER_VERTICAL || view === View.EDITOR_VIEWER_HORIZONTAL)
      ) {
        if (textareaRef.current) {
          textareaRef.current.value = newText;
        } else {
          setTimeout(fun, 200);
        }
      }
    };
    fun();
    setMdSource(newText);
  }, []);

  useEffect(() => {
    changeSource(source, editing, view);
  }, [changeSource, editing, source, view]);

  const { width = 0 } = useResizeDetector({ targetRef: layoutEditorRef, ...RESIZE_DETECTOR_PROPS });
  const withLabels = width > 600;

  const insertTextAtCursor = (insertText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textareaRef.current?.value ?? '';
    const newText = text.substring(0, start) + insertText + text.substring(end);

    changeSource(newText, editing, view);
    onChange?.(newText);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
    }, 0);
  };

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
  const handlePaste: ClipboardEventHandler = async (event) => {
    const items = event.clipboardData?.items;
    if (items) {
      const imageFiles: File[] = [];
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file?.type.startsWith('image/')) {
            imageFiles.push(file);
          }
        }
      }
      if (imageFiles.length > 0) {
        event.stopPropagation();
        event.preventDefault();
        let extraText = '';
        setLoader(Status.LOADING);
        for (const imageFile of imageFiles) {
          const result = await handleUploadImage(imageFile, false);
          if (result.status === Status.SUCCESS) {
            addNotification({ type: NotificationType.SUCCESS, message: <T>{result.message}</T> });
            extraText += `${extraText ? '\n\n' : ''}![image alt](${result.content.imageUrl})`;
          } else {
            addNotification({ type: NotificationType.ERROR, message: <T>{result.message}</T> });
          }
        }
        setLoader(Status.NONE);
        insertTextAtCursor(extraText);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        layoutEditorRef.current &&
        !layoutEditorRef.current.contains(event.target as Node) &&
        !openUploadModal &&
        !openInfoModal
      ) {
        setTimeout(() => {
          setEditing(false);
        }, 0);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [openInfoModal, openUploadModal]);

  return (
    <div ref={layoutEditorRef} className={classNames('jk-md-math-editor-layout jk-br-ie', { editing })}>
      {editing ? (
        <>
          <div className="content-bar-options jk-row space-between jk-br-ie jk-pg-xsm sticky-top bc-sf-md">
            <div className={classNames('jk-row gap left', { gap: !withLabels })}>
              {informationButton && (
                <InformationButton open={openInfoModal} setOpen={setOpenInfoModal} withLabel={withLabels} />
              )}
              {uploadImageButton && (
                <ImageUploaderButton open={openUploadModal} setOpen={setOpenUploadModal} withLabel={withLabels} copyButtons />
              )}
              {view === View.ONLY_EDITOR && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'editor | preview'}
                  data-tooltip-t-class-name="ws-np"
                  type="ghost"
                  size="small"
                  onClick={() => setView(View.EDITOR_VIEWER_HORIZONTAL)}
                >
                  <div className="jk-row">
                    {withLabels && (
                      <>
                        <T>editor</T>&nbsp;
                        <EditIcon />
                        &nbsp; |&nbsp;
                        <PreviewIcon />
                        &nbsp;<T>preview</T>
                      </>
                    )}
                  </div>
                </Button>
              )}
              {view === View.EDITOR_VIEWER_HORIZONTAL && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'preview'}
                  data-tooltip-t-class-name="ws-np"
                  type="ghost"
                  size="small"
                  icon={<PreviewIcon />}
                  onClick={() => setView(View.ONLY_VIEWER)}
                >
                  {withLabels && <T>preview</T>}
                </Button>
              )}
              {view === View.ONLY_VIEWER && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'editor'}
                  data-tooltip-t-class-name="ws-np"
                  type="ghost"
                  size="small"
                  icon={<EditIcon />}
                  onClick={() => setView(View.ONLY_EDITOR)}
                >
                  {withLabels && <T>editor</T>}
                </Button>
              )}
            </div>
            <Button icon={<CloseIcon />} type="ghost" size="small" onClick={() => setEditing(false)} />
          </div>
          <div
            className={classNames('content-editor-preview', {
              'editor-top-preview-bottom': view === View.EDITOR_VIEWER_VERTICAL,
            })}
          >
            <SplitPane onlyFirstPane={view === View.ONLY_EDITOR} onlySecondPane={view === View.ONLY_VIEWER}>
              <div className="editor" onPaste={uploadImageButton ? handlePaste : undefined}>
                <TextArea
                  ref={textareaRef}
                  onChange={(value) => {
                    onChange?.(value);
                    setMdSource(value);
                  }}
                />
              </div>
              <div className="preview">
                <MemoMdMathViewer className="jk-br-ie br-hl jk-pg-xsm" source={mdSource} />
              </div>
            </SplitPane>
          </div>
        </>
      ) : (
        <div className="content-preview">
          <MdFloatToolbar source={mdSource} edit onEdit={() => setEditing(true)} download={downloadButton} />
          {/* biome-ignore lint/a11y/noStaticElementInteractions: double-click on preview enters edit mode; mouse-only quick-edit affordance */}
          <div
            className="preview"
            onDoubleClick={() => {
              setEditing(true);
              setView(View.EDITOR_VIEWER_HORIZONTAL);
            }}
          >
            <MdMathViewer className="jk-br-ie br-hl jk-pg-xsm" source={mdSource} />
          </div>
        </div>
      )}
      {loader === Status.LOADING && (
        <div className="jk-loader-layer pn-ae">
          <div className="jk-loader-layer pn-ae jk-overlay-backdrop" style={{ opacity: 0.8 }}></div>
          <div className="jk-row" style={{ zIndex: 1 }}>
            <div className="jk-row jk-pg-sm jk-br-ie" style={{ alignItems: 'baseline' }}>
              <T className="tt-se">uploading images</T> &nbsp;
              <div className="dot-flashing" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
