import { Status } from '@juki-team/commons';
import React, {
  ClipboardEventHandler,
  Dispatch,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames, handleUploadImage } from '../../../helpers';
import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { NotificationType } from '../../../types';
import { Button, Modal, T, TextArea } from '../../atoms';
import { SplitPane } from '../../molecules';
import { CloseIcon, EditIcon, InfoIIcon, PreviewIcon } from '../../server';
import { UploadImageButton } from '../ImageUploader/UploadImageButton';
import { SAMPLE_MD_CONTENT } from './constants';
import { MdFloatToolbar } from './MdFloatToolbar/MdFloatToolbar';
import { MdMathViewer } from './MdMathViewer';
import { MdMathEditorDeprecatedProps } from './types';
import { MemoMdMathViewer } from './viewer/MemoMdMathViewer';

interface InformationButtonProps {
  open: boolean,
  setOpen: Dispatch<boolean>,
  isOpenRef?: MutableRefObject<boolean>,
  withLabel: boolean
}

const InformationButton = ({ open, setOpen, isOpenRef, withLabel }: InformationButtonProps) => {
  
  const [ source, setSource ] = useState(SAMPLE_MD_CONTENT);
  useEffect(() => setSource(SAMPLE_MD_CONTENT), [ open ]);
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
        className="bc-we"
        type="void"
        icon={<InfoIIcon circle />}
        onClick={() => setOpen(true)}
      >
        {withLabel && <T className="tt-se">information</T>}
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="modal-info-markdown"
      >
        <MdMathEditorDeprecated source={source} onChange={setSource} />
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

export const MdMathEditorDeprecated = (props: MdMathEditorDeprecatedProps) => {
  
  const {
    source,
    onChange,
    informationButton = false,
    uploadImageButton = false,
    downloadButton = false,
    // sharedButton = false,
    initEditMode = false,
    // onPickImageUrl,
  } = props;
  
  const [ view, setView ] = useState<View>(View.EDITOR_VIEWER_HORIZONTAL);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [ mdSource, setMdSource ] = useState(source);
  const [ editing, setEditing ] = useState(initEditMode);
  const [ loader, setLoader ] = useState(Status.NONE);
  const layoutEditorRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useJukiNotification();
  const [ openUploadModal, setOpenUploadModal ] = useState(false);
  const [ openInfoModal, setOpenInfoModal ] = useState(false);
  const changeSource = useCallback((newText: string, editing: boolean, view: View) => {
    const fun = () => {
      if (editing && (view === View.ONLY_EDITOR || view === View.EDITOR_VIEWER_VERTICAL || view === View.EDITOR_VIEWER_HORIZONTAL)) {
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
  }, [ changeSource, editing, source, view ]);
  
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
  
  const handlePaste: ClipboardEventHandler = async (event) => {
    const items = event.clipboardData?.items;
    if (items) {
      const imageFiles: File[] = [];
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file && file.type.startsWith('image/')) {
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
          const { status, message, content } = await handleUploadImage(imageFile, false);
          if (status === Status.SUCCESS) {
            addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
            extraText += (extraText ? '\n\n' : '') + `![image alt](${content!.imageUrl})`;
          } else {
            addNotification({ type: NotificationType.ERROR, message: <T>{message}</T> });
          }
        }
        setLoader(Status.NONE);
        insertTextAtCursor(extraText);
      }
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layoutEditorRef.current && !layoutEditorRef.current.contains(event.target as Node) && !openUploadModal && !openInfoModal) {
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
  }, [ openInfoModal, openUploadModal ]);
  
  return (
    <div
      ref={layoutEditorRef}
      className={classNames('jk-md-math-editor-layout jk-border-radius-inline', { editing })}
    >
      {editing ? (
        <>
          <div className="content-bar-options jk-row space-between jk-br-ie jk-pg-xsm sticky-top bc-we">
            <div className={classNames('jk-row gap left', { gap: !withLabels })}>
              {informationButton && (
                <InformationButton
                  open={openInfoModal}
                  setOpen={setOpenInfoModal}
                  withLabel={withLabels}
                />
              )}
              {uploadImageButton && (
                <UploadImageButton
                  open={openUploadModal}
                  setOpen={setOpenUploadModal}
                  withLabel={withLabels}
                  copyButtons
                />
              )}
              {view === View.ONLY_EDITOR && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'editor | preview'}
                  data-tooltip-t-class-name="ws-np"
                  type="void"
                  size="small"
                  className="bc-we"
                  onClick={() => setView(View.EDITOR_VIEWER_HORIZONTAL)}
                >
                  <div className="jk-row">
                    {withLabels && (
                      <>
                        <T>editor</T>&nbsp;<EditIcon />&nbsp;
                        |&nbsp;<PreviewIcon />&nbsp;<T>preview</T>
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
                  type="void"
                  size="small"
                  className="bc-we"
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
                  type="void"
                  size="small"
                  className="bc-we"
                  icon={<EditIcon />}
                  onClick={() => setView(View.ONLY_EDITOR)}
                >
                  {withLabels && <T>editor</T>}
                </Button>
              )}
            </div>
            <Button
              icon={<CloseIcon />}
              type="void"
              size="small"
              className="bc-we"
              onClick={() => setEditing(false)}
            />
          </div>
          <div
            className={classNames('content-editor-preview', { 'editor-top-preview-bottom': view === View.EDITOR_VIEWER_VERTICAL })}
          >
            <SplitPane onlyFirstPane={view === View.ONLY_EDITOR} onlySecondPane={view === View.ONLY_VIEWER}>
              <div className="editor" onPaste={uploadImageButton ? handlePaste : undefined}>
                <TextArea
                  ref={textareaRef}
                  onChange={value => {
                    onChange?.(value);
                    setMdSource(value);
                  }}
                />
              </div>
              <div className="preview"><MemoMdMathViewer className="jk-br-ie br-hl jk-pg-xsm" source={mdSource} /></div>
            </SplitPane>
          </div>
        </>
      ) : (
        <div className="content-preview">
          <MdFloatToolbar
            source={mdSource}
            edit
            onEdit={() => setEditing(true)}
            download={downloadButton}
          />
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
            <div className="jk-row bc-we jk-pg-sm jk-br-ie" style={{ alignItems: 'baseline' }}>
              <T className="tt-se">uploading images</T> &nbsp;
              <div className="dot-flashing" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
