import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../helpers';
import { useOutsideAlerter } from '../../hooks';
import { UploadImageButton } from '../ImageUploader';
import {
  AlertModal,
  Button,
  CloseIcon,
  EditIcon,
  PreviewIcon,
  SaveIcon,
  SplitPane,
  T,
  TextArea,
  Tooltip,
} from '../index';
import { MdMathViewer } from '../MdMathViewer';
import { InformationButton } from './InformationButton';
import { MdFloatToolbar } from './MdFloatToolbar';
import { MdMathEditorProps } from './types';

export const MdMathEditor = (props: MdMathEditorProps) => {
  const {
    source,
    onChange,
    informationButton = false,
    uploadImageButton = false,
    downloadButton = false,
    sharedButton = false,
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
    setModal(
      <AlertModal
        onClose={() => setModal(null)}
        decline={{
          onClick: () => {
            continueWithoutSavingRef.current = true;
            setModal(null);
          },
          label: <T>continue without saving</T>,
        }}
        accept={{ onClick: handleAccept, label: <T>save and continue</T> }}
        title={<T>attention</T>}
        content={<T>Has unsaved changes</T>}
      />,
    );
  };
  useOutsideAlerter(() => {
    if (editValue !== source && !modal && !isOpenInformationModalRef.current && !isOpenUploadImageModalRef.current && onChange && !continueWithoutSavingRef.current) {
      triggerUnsavedAlert();
    }
  }, layoutEditorRef);
  
  const { width = 0 } = useResizeDetector({ targetRef: layoutEditorRef });
  const withLabels = width > 600;
  
  return (
    <div ref={layoutEditorRef} className={classNames('jk-md-math-editor-layout jk-border-radius-inline', { editing })}>
      {modal}
      {editing ? (
        <>
          <div className="content-bar-options">
            <div className={classNames('jk-row left', { gap: !withLabels })}>
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
                <Tooltip
                  content={(
                    <div className="jk-row nowrap ws-np">
                      <T className="ws-np tt-se">editor</T> ⮜ | ⮞ <T>preview</T>
                    </div>
                  )}
                  placement="bottom"
                  visible={withLabels ? false : undefined}
                >
                  <Button type="text" size="small" onClick={() => setView(1)}>
                    <div className="jk-row">
                      {withLabels && (
                        <>
                          <T>editor</T>&nbsp;<EditIcon />&nbsp;
                          |&nbsp;<PreviewIcon />&nbsp;<T>preview</T>
                        </>
                      )}
                    </div>
                  </Button>
                </Tooltip>
              )}
              {view === 1 && (
                <Tooltip
                  content={<T className="ws-np jk-pad-sm">preview</T>}
                  placement="bottom"
                  visible={withLabels ? false : undefined}
                >
                  <Button type="text" size="small" icon={<PreviewIcon />} onClick={() => setView(3)}>
                    {withLabels && <T>preview</T>}
                  </Button>
                </Tooltip>
              )}
              {view === 3 && (
                <Tooltip
                  content={<T className="ws-np jk-pad-sm">editor</T>}
                  placement="bottom"
                  visible={withLabels ? false : undefined}
                >
                  <Button type="text" size="small" icon={<EditIcon />} onClick={() => setView(0)}>
                    {withLabels && <T>editor</T>}
                  </Button>
                </Tooltip>
              )}
            </div>
            <div className="right">
              {onChange && !online && (
                <Tooltip
                  placement="bottom"
                  content={<T className="jk-pad-sm">save</T>}
                  visible={withLabels ? false : undefined}
                >
                  <Button
                    icon={<SaveIcon />}
                    type="text"
                    size="small"
                    onClick={() => onChange(editValue)}
                    disabled={source === editValue}
                  >
                    {withLabels && <T>save</T>}
                  </Button>
                </Tooltip>
              )}
              <Button
                icon={<CloseIcon />}
                type="text"
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
            {editValue !== source && <div className="no-saved-label">{<T>not saved</T>}</div>}
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
            edit onEdit={() => setEditing(true)}
            download={downloadButton}
            share={sharedButton}
          />
          <div className="preview">
            <MdMathViewer source={editValue?.trim()} />
          </div>
        </div>
      )}
    </div>
  );
};

export * from './types';
