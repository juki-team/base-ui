import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { ProgrammingLanguage, Theme } from '@juki-team/commons';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { CodeEditorProps } from './types';

export const CodeEditor = ({
  sourceCode,
  language,
  theme,
  readOnly = false,
  onChange,
  tabSize = 4,
  fontSize = 14,
}: CodeEditorProps) => {
  const extensions = [];
  switch (language) {
    case ProgrammingLanguage.CPP:
    case ProgrammingLanguage.CPP11:
    case ProgrammingLanguage.CPP14:
    case ProgrammingLanguage.CPP17:
    case ProgrammingLanguage.C:
    case ProgrammingLanguage.ARDUINO:
      extensions.push(cpp());
      break;
    case ProgrammingLanguage.JAVA:
      extensions.push(java());
      break;
    case ProgrammingLanguage.JAVASCRIPT:
      extensions.push(javascript());
      break;
    case ProgrammingLanguage.JSON:
      extensions.push(json());
      break;
    case ProgrammingLanguage.MARKDOWN:
      extensions.push(markdown());
      break;
    case ProgrammingLanguage.PYTHON:
    case ProgrammingLanguage.PYTHON3:
      extensions.push(python());
      break;
    case ProgrammingLanguage.TEXT:
    default:
      break;
  }
  const { height = 0, ref } = useResizeDetector();
  return (
    <div style={{ fontSize: `${fontSize}px`, width: '100%', height: '100%' }} ref={ref}>
      <CodeMirror
        readOnly={readOnly}
        value={sourceCode}
        height={height + 'px'}
        extensions={extensions}
        onChange={(value) => onChange?.({ sourceCode: value })}
        theme={theme === Theme.DARK ? 'dark' : 'light'}
        basicSetup={{ tabSize }}
      />
    </div>
  );
};

export * from './types';
export * from './constants';
