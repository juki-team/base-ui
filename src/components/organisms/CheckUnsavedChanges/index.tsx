import { ProgrammingLanguage } from '@juki-team/commons';
import { diff } from 'deep-object-diff';
import React, { cloneElement, ReactElement, ReactNode, useRef, useState } from 'react';
import { T } from '../../atoms';
import { CodeEditor, TwoActionModal } from '../../molecules';

export interface CheckUnsavedChangesProps<T> {
  children: ReactElement,
  onClickContinue: () => void,
  value: T,
}

export const CheckUnsavedChanges = <T extends object, >(props: CheckUnsavedChangesProps<T>) => {
  
  const { children, onClickContinue, value } = props;
  
  const originalValueRef = useRef(value);
  const [ modal, setModal ] = useState<ReactNode>(null);
  const handleOnClick = () => {
    if (JSON.stringify(originalValueRef.current) === JSON.stringify(value)) {
      onClickContinue();
    } else {
      const text = JSON.stringify(diff(originalValueRef.current, value), null, 2);
      const height = text.split('\n').length;
      setModal(
        <TwoActionModal
          isOpen
          title={<h2><T>attention</T></h2>}
          primary={{ onClick: () => setModal(null), label: <T>close</T> }}
          secondary={{ onClick: onClickContinue, label: <T>continue without saving</T> }}
          onClose={() => setModal(null)}
        >
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
        </TwoActionModal>,
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
