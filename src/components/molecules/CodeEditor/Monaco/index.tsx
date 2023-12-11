import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from '@juki-team/commons';
import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms';

const MonacoCodeEditor = lazy(() => import('@monaco-editor/react'));

interface MonacoProps {
  language: ProgrammingLanguage,
  sourceCode: string,
  onSourceChange?: (newValue: string) => void,
}

export const Monaco = ({ language, sourceCode, onSourceChange }: MonacoProps) => {
  
  const dark = false;
  return (
    <Suspense fallback={<SpinIcon />}>
      <MonacoCodeEditor
        width="100%"
        height="100%"
        language={PROGRAMMING_LANGUAGE[language]?.monacoKey}
        theme={dark ? 'vs-dark' : 'vs-light'}
        value={sourceCode}
        onChange={(value = '') => onSourceChange?.(value)}
        options={{
          fontSize: 14,
          readOnly: !onSourceChange,
          scrollBeyondLastLine: false,
        }}
      />
    </Suspense>
  );
};
