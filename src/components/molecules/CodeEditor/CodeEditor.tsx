import { autocompletion } from '@codemirror/autocomplete';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { search } from '@codemirror/search';
// import { oneDark } from '@codemirror/theme-one-dark';
import { ProgrammingLanguage, Theme } from '@juki-team/commons';
// import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import CodeMirror from '@uiw/react-codemirror';
import React, { memo } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { CodeEditorProps } from './types';

const CodeEditorCmp = <T, >(props: CodeEditorProps<T>) => {
  
  const {
    sourceCode,
    language,
    theme,
    readOnly = false,
    onChange,
    tabSize = 4,
    fontSize = 14,
  } = props;
  
  const extensions = [
    // basicSetup(),
    autocompletion(),
    search(),
    // oneDark,
  ];
  
  switch (language) {
    case ProgrammingLanguage.ICPC_CPP:
    case ProgrammingLanguage.CPP:
    case ProgrammingLanguage.CPP11:
    case ProgrammingLanguage.CPP14:
    case ProgrammingLanguage.CPP17:
    case ProgrammingLanguage.ICPC_C:
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
    case ProgrammingLanguage.ICPC_PYTHON:
    case ProgrammingLanguage.PYTHON:
    case ProgrammingLanguage.PYTHON3:
      extensions.push(python());
      break;
    case ProgrammingLanguage.HTML:
      extensions.push(html({ autoCloseTags: true, matchClosingTags: true }));
      break;
    case ProgrammingLanguage.TEXT:
    default:
      break;
  }
  
  const { height = 0, ref } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  
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
      {/*<CodeMirrorEditor*/}
      {/*  readOnly={readOnly}*/}
      {/*  value={sourceCode}*/}
      {/*  height={height + 'px'}*/}
      {/*  extensions={extensions}*/}
      {/*  onChange={(value) => onChange?.({ sourceCode: value })}*/}
      {/*  theme={theme === Theme.DARK ? 'dark' : 'light'}*/}
      {/*  basicSetup={{ tabSize }} */}
      {/*/>*/}
    </div>
  );
};

export const CodeEditor = memo(CodeEditorCmp) as typeof CodeEditorCmp;
