import { ProgrammingLanguage } from '@juki-team/commons';
import { diff } from 'deep-object-diff';
import React, { cloneElement, ReactElement, ReactNode, useRef, useState } from 'react';
import { AlertModal, CodeEditor, T } from '../../index';

export interface CheckUnsavedChangesProps<T> {
  children: ReactElement,
  onClickContinue: () => void,
  value: T
}

export const CheckUnsavedChanges = <T extends object, >({ children, onClickContinue, value }: CheckUnsavedChangesProps<T>) => {
  
  const originalValueRef = useRef(value);
  const [modal, setModal] = useState<ReactNode>(null);
  const handleOnClick = () => {
    if (JSON.stringify(originalValueRef.current) === JSON.stringify(value)) {
      onClickContinue();
    } else {
      const text = JSON.stringify(diff(originalValueRef.current, value), null, 2);
      const height = text.split('\n').length;
      setModal(
        <AlertModal
          title={<h2><T>attention</T></h2>}
          accept={{ onClick: () => setModal(null), label: <T>close</T> }}
          content={
            <div>
              <T className="tt-se">there are unsaved changes</T>:
              <div
                className="alert-modal-json-viewer jk-border-radius-inline"
                style={{ height: height * 24 + 'px' }}
              >
                <CodeEditor
                  sourceCode={text}
                  language={ProgrammingLanguage.JSON}
                  readOnly
                />
              </div>
            </div>
          }
          decline={{ onClick: onClickContinue, label: <T>continue without saving</T> }}
          onClose={() => setModal(null)}
        />,
      );
    }
  };
  
  return (
    <>
      {modal}
      {cloneElement(children, { onClick: handleOnClick })}
    </>
  );
};
