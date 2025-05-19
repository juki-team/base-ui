import { ProgrammingLanguage } from '@juki-team/commons';
import { diff } from 'deep-object-diff';
import React, { cloneElement, ReactElement, ReactNode, useRef, useState } from 'react';
import { useSoundStore } from '../../../stores/sound/useSoundStore';
import { T } from '../../atoms';
import { CodeEditor, TwoActionModal } from '../../molecules';
import { CheckUnsavedChangesProps } from './types';

export const CheckUnsavedChanges = <T extends object, >(props: CheckUnsavedChangesProps<T>) => {
  
  const { children, onClickContinue, value } = props;
  
  const originalValueRef = useRef(value);
  const [ modal, setModal ] = useState<ReactNode>(null);
  const playWarning = useSoundStore(state => state.playWarning);
  
  const handleOnClick = () => {
    const diffObj = diff(originalValueRef.current, value);
    if (JSON.stringify(originalValueRef.current) === JSON.stringify(value) || Object.keys(diffObj).length === 0) {
      onClickContinue();
    } else {
      const text = JSON.stringify(diffObj, null, 2);
      const height = text.split('\n').length;
      playWarning();
      setModal(
        <TwoActionModal
          isOpen
          title={<T className="tt-se">attention</T>}
          primary={{ onClick: () => setModal(null), label: <T className="tt-se">close</T> }}
          secondary={{ onClick: onClickContinue, label: <T className="tt-se">continue without saving</T> }}
          onClose={() => setModal(null)}
        >
          <div>
            <T className="tt-se">there are unsaved changes</T>:
            <div
              className="alert-modal-json-viewer jk-border-radius-inline"
              style={{ height: `min(${height * (14 * 1.4) /*font-size * line-height*/ + 8 /*pdding*/}px, calc(var(--100VH) - 300px))` }}
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
      {cloneElement(children, { onClick: handleOnClick } as ReactElement<{}>['props'])}
    </>
  );
};
