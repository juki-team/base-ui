import { ProgrammingLanguage } from '@juki-team/commons';
import { diff } from 'deep-object-diff';
import React, { useEffect, useRef } from 'react';
import { T } from '../components/atoms';
import { CodeEditor } from '../components/molecules';
import { useNotification } from './useNotification';

export const useEntityDiff = <T, >(initialEntity: T, enable: boolean) => {
  
  const { addWarningNotification } = useNotification();
  const lastEntity = useRef<T>(initialEntity);
  
  const initialEntityString = JSON.stringify(initialEntity);
  
  if (!enable) {
    lastEntity.current = initialEntity;
  }
  
  useEffect(() => {
    if (enable && initialEntityString !== JSON.stringify(lastEntity.current)) {
      const initialEntity = JSON.parse(initialEntityString);
      const text = JSON.stringify(diff(lastEntity.current as object, initialEntity), null, 2);
      const height = text.split('\n').length;
      addWarningNotification(
        <div className="jk-notification-message-body">
          <T className="tt-se">{'something changed, your changes may overwrite others\' changes.'}</T>
          <T className="tt-se">we suggest you reload the page.</T>
          <T className="tt-se">differences</T>:
          <div style={{ height: height * 24 + 'px', color: 'initial' }}>
            <CodeEditor
              sourceCode={text}
              language={ProgrammingLanguage.JSON}
              readOnly
            />
          </div>
        </div>,
      );
      lastEntity.current = initialEntity;
    }
  }, [ initialEntityString, enable, addWarningNotification ]);
}
