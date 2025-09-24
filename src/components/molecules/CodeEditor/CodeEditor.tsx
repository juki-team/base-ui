import { autocompletion } from '@codemirror/autocomplete';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { search } from '@codemirror/search';
import type { EditorView } from '@codemirror/view';
// import { oneDark } from '@codemirror/theme-one-dark';
import { CodeLanguage, Theme } from '@juki-team/commons';
import { memo, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
// import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import ReactCodeMirror from './codemirror/ReactCodeMirror';
import { CodeEditorProps } from './types';

const CodeEditorCmp = <T, >(props: CodeEditorProps<T>) => {
  
  const {
    source,
    language,
    theme,
    readOnly = false,
    onChange,
    tabSize = 4,
    fontSize = 14,
    triggerFocus = 0,
  } = props;
  
  const editorRef = useRef<EditorView | null>(null);
  
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [ triggerFocus ]);
  
  const extensions = [
    // basicSetup(),
    autocompletion(),
    search(),
    // oneDark,
  ];
  
  switch (language) {
    case CodeLanguage.ICPC_CPP:
    case CodeLanguage.CPP:
    case CodeLanguage.CPP11:
    case CodeLanguage.CPP14:
    case CodeLanguage.CPP17:
    case CodeLanguage.ICPC_C:
    case CodeLanguage.C:
    case CodeLanguage.ARDUINO:
      extensions.push(cpp());
      break;
    case CodeLanguage.JAVA:
      extensions.push(java());
      break;
    case CodeLanguage.JAVASCRIPT:
      extensions.push(javascript());
      break;
    case CodeLanguage.JSON:
      extensions.push(json());
      break;
    case CodeLanguage.MARKDOWN:
      extensions.push(markdown());
      break;
    case CodeLanguage.ICPC_PYTHON:
    case CodeLanguage.PYTHON2:
    case CodeLanguage.PYTHON3:
      extensions.push(python());
      break;
    case CodeLanguage.HTML:
      extensions.push(html({ autoCloseTags: true, matchClosingTags: true }));
      break;
    case CodeLanguage.TEXT:
    default:
      break;
  }
  
  const { height = 0, ref } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  
  return (
    <div style={{ fontSize: `${fontSize}px`, width: '100%', height: '100%' }} ref={ref}>
      <ReactCodeMirror
        readOnly={readOnly}
        value={source}
        height={height + 'px'}
        extensions={extensions}
        onChange={(value) => onChange?.({ source: value })}
        theme={theme === Theme.DARK ? 'dark' : 'light'}
        basicSetup={{ tabSize }}
        onCreateEditor={(view) => {
          editorRef.current = view;
        }}
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
