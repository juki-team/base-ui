import { ProgrammingLanguage } from '@juki-team/commons';
import { diff } from 'deep-object-diff';
import React, { useEffect, useRef } from 'react';
import { T } from '../components/atoms';
import { CodeEditor } from '../components/molecules';
import { useNotification } from './useNotification';

export const useEntityDiff = <T, >(initialEntity: T, enable: boolean) => {
  
  const { addWarningNotification } = useNotification();
  const lastContest = useRef<T>(initialEntity);
  
  const initialEntityString = JSON.stringify(initialEntity);
  
  useEffect(() => {
    if (enable && initialEntityString !== JSON.stringify(lastContest.current)) {
      const initialEntity = JSON.parse(initialEntityString);
      const text = JSON.stringify(diff(lastContest.current as object, initialEntity), null, 2);
      const height = text.split('\n').length;
      addWarningNotification(
        <div>
          <T className="tt-se">{'Something changed, your changes may overwrite others\' changes.'}</T>
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
      lastContest.current = initialEntity;
    }
  }, [ initialEntityString, enable, addWarningNotification ]);
}