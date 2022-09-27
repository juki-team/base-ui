// import CodeMirror from '@uiw/react-codemirror';
import { PROGRAMMING_LANGUAGE } from '@juki-team/commons';
import React, { CSSProperties } from 'react';
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
  fontSize = 14,
}: CodeEditorProps) => {
  return (
    <div style={{ '--code-mirror-font-size': `${fontSize}px`, width: '100%', height: '100%' } as CSSProperties}>
      <ReactCodeMirror
        value={sourceCode}
        options={{
          theme,
          keyMap,
          mode: PROGRAMMING_LANGUAGE[language]?.monacoKey,
          smartIndent: true,
          readOnly: readOnly || !onChange,
          viewportMargin: Infinity,
          tabSize,
          indentUnit: tabSize,
          indentWithTabs: false,
        }}
        onChange={((instance: { getValue: () => string }) => onChange?.({ sourceCode: instance.getValue() }))}
      />
    </div>
  );
};

export * from './types';
export * from './constants';
