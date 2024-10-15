import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../constants';
import { classNames } from '../../../../helpers';
import { useOutsideAlerter, useSound } from '../../../../hooks';
import {
  Button,
  CloseIcon,
  EditIcon,
  ExclamationIcon,
  Modal,
  PreviewIcon,
  SaveIcon,
  T,
  TextArea,
} from '../../../atoms';
import { SplitPane, TwoActionModal } from '../../../molecules';
import { UploadImageButton } from '../../ImageUploader';
import { SAMPLE_MD_CONTENT } from '../constants';
import { MdFloatToolbar } from '../MdFloatToolbar';
import { MdMathViewer } from '../MdMathViewer';
import { MdMathEditorProps } from './types';

export interface InformationButtonProps {
  isOpenRef: MutableRefObject<boolean>,
  withLabel: boolean
}

export const InformationButton = ({ isOpenRef, withLabel }: InformationButtonProps) => {
  
  const [ open, setOpen ] = useState(false);
  const [ source, setSource ] = useState(SAMPLE_MD_CONTENT);
  useEffect(() => setSource(SAMPLE_MD_CONTENT), [ open ]);
  isOpenRef.current = open;
  
  return (
    <>
      <Button
        data-tooltip-id="jk-tooltip"
        data-tooltip-content={withLabel ? '' : 'information'}
        data-tooltip-t-class-name="ws-np tt-se"
        icon={<ExclamationIcon circle rotate={180} />} type="light" size="tiny" onClick={() => setOpen(true)}
      >
        {withLabel && <T>information</T>}
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="modal-info-markdown"
        closeWhenClickOutside
        closeWhenKeyEscape
      >
        <MdMathEditor source={source} onChange={setSource} />
      </Modal>
    </>
  );
};

export const MdMathEditor = (props: MdMathEditorProps) => {
  
  const {
    source,
    onChange,
    informationButton = false,
    uploadImageButton = false,
    downloadButton = false,
    // sharedButton = false,
    initEditMode = false,
    onPickImageUrl,
    online = false,
  } = props;
  
  // 0 editor-expanded, 1 editor-right-view-left, 2 editor-top-view-bottom, 3 view-expanded
  const [ view, setView ] = useState(1);
  const [ editValue, setEditValue ] = useState(source || '');
  const [ textareaValue, setTextareaValue ] = useState(source);
  const [ editing, setEditing ] = useState(initEditMode);
  const continueWithoutSavingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [ modal, setModal ] = useState<ReactNode>(null);
  const layoutEditorRef = useRef(null);
  const isOpenInformationModalRef = useRef(false);
  const isOpenUploadImageModalRef = useRef(false);
  const sound = useSound();
  useEffect(() => {
    setEditValue(source);
    setTextareaValue(source);
  }, [ source ]);
  const triggerUnsavedAlert = (accept?: () => void) => {
    const handleAccept = () => {
      onChange?.(editValue);
      accept?.();
      setModal(null);
    };
    sound.playWarning();
    setModal(
      <TwoActionModal
        isOpen
        onClose={() => setModal(null)}
        secondary={{
          onClick: () => {
            continueWithoutSavingRef.current = true;
            setModal(null);
          },
          label: <T>continue without saving</T>,
        }}
        primary={{ onClick: handleAccept, label: <T>save and continue</T> }}
        title={<T>attention</T>}
      >
        <T className="tt-se">has unsaved changes</T>
      </TwoActionModal>,
    );
  };
  useOutsideAlerter(() => {
    if (!online && editValue !== source && !modal && !isOpenInformationModalRef.current && !isOpenUploadImageModalRef.current && onChange && !continueWithoutSavingRef.current) {
      triggerUnsavedAlert();
    }
  }, layoutEditorRef);
  
  const { width = 0 } = useResizeDetector({ targetRef: layoutEditorRef, ...RESIZE_DETECTOR_PROPS });
  const withLabels = width > 600;
  
  return (
    <div ref={layoutEditorRef} className={classNames('jk-md-math-editor-layout jk-border-radius-inline', { editing })}>
      {modal}
      {editing ? (
        <>
          <div className="content-bar-options">
            <div
              className={classNames('jk-row gap left', { gap: !withLabels })}
              style={{ padding: '0 var(--gap)' }}
            >
              {informationButton && <InformationButton isOpenRef={isOpenInformationModalRef} withLabel={withLabels} />}
              {uploadImageButton && (
                <UploadImageButton
                  isOpenRef={isOpenUploadImageModalRef}
                  withLabel={withLabels}
                  onPickImageUrl={onPickImageUrl}
                  copyButtons
                />
              )}
              {view === 0 && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'editor | preview'}
                  data-tooltip-t-class-name="ws-np"
                  type="light"
                  size="tiny"
                  onClick={() => setView(1)}
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
              {view === 1 && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'preview'}
                  data-tooltip-t-class-name="ws-np"
                  type="light"
                  size="tiny"
                  icon={<PreviewIcon />}
                  onClick={() => setView(3)}
                >
                  {withLabels && <T>preview</T>}
                </Button>
              )}
              {view === 3 && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'editor'}
                  data-tooltip-t-class-name="ws-np"
                  type="light"
                  size="tiny"
                  icon={<EditIcon />}
                  onClick={() => setView(0)}
                >
                  {withLabels && <T>editor</T>}
                </Button>
              )}
            </div>
            <div className="jk-row gap right" style={{ padding: '0 var(--gap)' }}>
              {onChange && !online && (
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={withLabels ? '' : 'save'}
                  data-tooltip-t-class-name="ws-np"
                  icon={<SaveIcon />}
                  type="light"
                  size="tiny"
                  onClick={() => onChange(editValue)}
                  disabled={source === editValue}
                >
                  {withLabels && <T>save</T>}
                </Button>
              )}
              <Button
                icon={<CloseIcon />}
                type="light"
                size="small"
                onClick={() => {
                  if (editValue !== source) {
                    triggerUnsavedAlert(() => {
                      setEditing(false);
                    });
                  } else {
                    setEditing(false);
                  }
                }}
              />
            </div>
          </div>
          <div
            className={classNames(
              'content-editor-preview',
              {
                'editor-top-preview-bottom': view === 2,
              },
            )}
          >
            {editValue !== source && !online && <div className="no-saved-label">{<T>not saved</T>}</div>}
            <SplitPane onlyFirstPane={view === 0} onlySecondPane={view === 3}>
              <div className="editor" onClick={() => continueWithoutSavingRef.current = false}>
                <TextArea
                  value={textareaValue}
                  onChange={value => {
                    if (onChange) {
                      if (online) {
                        onChange(value);
                      } else {
                        setTextareaValue(value);
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                        }
                        timeoutRef.current = setTimeout(() => setEditValue(value), 400);
                      }
                    }
                  }}
                />
              </div>
              <div className="preview"><MdMathViewer source={editValue?.trim()} /></div>
            </SplitPane>
          </div>
        </>
      ) : (
        <div className="content-preview">
          <MdFloatToolbar
            source={editValue?.trim()}
            edit
            onEdit={() => setEditing(true)}
            download={downloadButton}
            // share={sharedButton}
          />
          <div className="preview">
            <MdMathViewer source={editValue?.trim()} />
          </div>
        </div>
      )}
    </div>
  );
};
