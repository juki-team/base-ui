// import CodeMirror from '@uiw/react-codemirror';
import React from 'react';
import { PROGRAMMING_LANGUAGE } from '../../config/constants';
import ReactCodeMirror from './CodeMirror';
import { CodeEditorKeyMap, CodeEditorProps, CodeEditorTheme } from './types';

export const CodeEditor = ({
  sourceCode,
  language,
  theme = CodeEditorTheme.IDEA,
  keyMap = CodeEditorKeyMap.SUBLIME,
  readOnly = false,
  onChange,
  tabSize = 4,
}: CodeEditorProps) => {
  return (
    <ReactCodeMirror
      value={sourceCode}
      options={{
        theme,
        keyMap,
        mode: PROGRAMMING_LANGUAGE[language].monacoKey,
        smartIndent: true,
        readOnly: readOnly || !onChange,
        viewportMargin: Infinity,
        tabSize,
        indentUnit: tabSize,
        indentWithTabs: false,
      }}
      onChange={((instance: { getValue: () => string }) => onChange?.({ sourceCode: instance.getValue() }))}
    />
  );
};

export * from './types';
export * from './constants';
