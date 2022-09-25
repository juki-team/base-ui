import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../helpers';
import { useOutsideAlerter } from '../../hooks';
import { AlertModal, Button, CloseIcon, EditIcon, EyeIcon, LayoutIcon, Popover, SaveIcon, SplitPane, T, TextArea } from '../index';
import { MdMathViewer } from '../MdMathViewer';
import { InformationButton } from './InformationButton';
import { MdFloatToolbar } from './MdFloatToolbar';
import { MdMathEditorProps } from './types';
import { UploadImageButton } from './UploadImageButton';

export const MdMathEditor = ({
  source,
  onChange,
  informationButton = false,
  uploadImageButton = false,
  downloadButton = false,
  sharedButton = false,
  initEditMode = false,
}: MdMathEditorProps) => {
  // 0 editor-expanded, 1 editor-right-view-left, 2 editor-top-view-bottom, 3 view-expanded
  const [view, setView] = useState(1);
  const [editValue, setEditValue] = useState(source || '');
  const [textareaValue, setTextareaValue] = useState(source);
  const [editing, setEditing] = useState(initEditMode);
  const continueWithoutSavingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [modal, setModal] = useState<ReactNode>(null);
  const layoutEditorRef = useRef(null);
  const isOpenInformationModalRef = useRef(false);
  const isOpenUploadImageModalRef = useRef(false);
  useEffect(() => {
    setEditValue(source);
    setTextareaValue(source);
  }, [source]);
  const triggerUnsavedAlert = (accept?: () => void) => {
    const handleAccept = () => {
      onChange?.(editValue);
      accept?.();
      setModal(null);
    };
    setModal(
      <AlertModal
        onCancel={() => setModal(null)}
        decline={{
          onClick: () => {
            continueWithoutSavingRef.current = true;
            setModal(null);
          },
          label: <T>continue without saving</T>,
        }}
        accept={{ onClick: handleAccept, label: <T>save and continue</T> }}
        title={<h4><T>attention</T></h4>}
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
  
  return (
    <div ref={layoutEditorRef} className={classNames('jk-md-math-editor-layout', { editing, 'jk-border-radius-inline': editing })}>
      {modal}
      {editing ? (
        <>
          <div className="content-bar-options">
            <div className="jk-row gap left">
              {informationButton && <InformationButton isOpenRef={isOpenInformationModalRef} withLabel={width > 864} />}
              {uploadImageButton && <UploadImageButton isOpenRef={isOpenUploadImageModalRef} withLabel={width > 864} />}
              {view === 0 && (
                <Popover
                  content={<T className="ws-np jk-pad-sm">editor ⮜ | ⮞ preview</T>}
                  triggerOn="hover"
                  placement="bottom"
                >
                  <Button type="text" icon={<LayoutIcon />} onClick={() => setView(1)}>
                    {width > 864 && <T>editor ⮜ | ⮞ preview</T>}
                  </Button>
                </Popover>
              )}
              {view === 1 && (
                <Popover
                  content={<T className="ws-np jk-pad-sm">preview</T>}
                  triggerOn="hover"
                  placement="bottom"
                >
                  <Button type="text" icon={<EyeIcon />} onClick={() => setView(3)}>
                    {width > 864 && <T>preview</T>}
                  </Button>
                </Popover>
              )}
              {view === 3 && (
                <Popover
                  content={<T className="ws-np jk-pad-sm">editor</T>}
                  triggerOn="hover"
                  placement="bottom"
                >
                  <Button type="text" icon={<EditIcon />} onClick={() => setView(0)}>
                    {width > 864 && <T>editor</T>}
                  </Button>
                </Popover>
              )}
            </div>
            <div className="right">
              {onChange && (
                <Popover content={<T className="jk-pad-sm">save</T>}>
                  <Button icon={<SaveIcon />} type="text" onClick={() => onChange(editValue)} disabled={source === editValue}>
                    <T>Save</T>
                  </Button>
                </Popover>
              )}
              <Button
                icon={<CloseIcon />}
                type="text"
                onClick={() => {
                  if (editValue !== source) {
                    triggerUnsavedAlert(() => {
                      setEditing(false);
                    });
                  } else {
                    setEditing(false);
                  }
                }} />
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
                      setTextareaValue(value);
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                      }
                      timeoutRef.current = setTimeout(() => setEditValue(value), 400);
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
