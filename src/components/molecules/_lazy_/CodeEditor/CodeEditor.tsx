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
import type { Extension } from '@codemirror/state';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../constants';
import ReactCodeMirror from './codemirror/ReactCodeMirror';
import { CodeEditorProps } from './types';

function getLanguageExtension(language: unknown): Extension | null {
  switch (language) {
    case CodeLanguage.ICPC_CPP:
    case CodeLanguage.CPP:
    case CodeLanguage.CPP11:
    case CodeLanguage.CPP14:
    case CodeLanguage.CPP17:
    case CodeLanguage.ICPC_C:
    case CodeLanguage.C:
    case CodeLanguage.C_11:
    case CodeLanguage.CPP_11:
    case CodeLanguage.CPP_20:
    case CodeLanguage.ARDUINO:
      return cpp();
    case CodeLanguage.JAVA:
    case CodeLanguage.JAVA_21:
      return java();
    case CodeLanguage.JAVASCRIPT:
    case CodeLanguage.JAVASCRIPT_NODE_JS_22:
      return javascript();
    case CodeLanguage.JSON:
      return json();
    case CodeLanguage.MARKDOWN:
      return markdown();
    case CodeLanguage.ICPC_PYTHON:
    case CodeLanguage.PYTHON2:
    case CodeLanguage.PYTHON3:
    case CodeLanguage.PYTHON_2:
    case CodeLanguage.PYTHON_PYPY_2:
    case CodeLanguage.PYTHON_3:
    case CodeLanguage.PYTHON_PYPY_3:
      return python();
    case CodeLanguage.HTML:
      return html({ autoCloseTags: true, matchClosingTags: true });
    case CodeLanguage.TEXT:
    default:
      return null;
  }
}

function CodeEditorCmp<T>(props: CodeEditorProps<T>) {
  const {
    source,
    language,
    theme,
    readOnly = false,
    onChange,
    tabSize = 4,
    fontSize = 14,
    triggerFocus = 0,
    documentKey,
    stateCache,
  } = props;

  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [triggerFocus]);

  // Every value passed to ReactCodeMirror must be referentially stable between keystrokes: a new
  // extensions array / basicSetup object / onChange function triggers a full StateEffect.reconfigure
  // (re-parsing the whole document and closing the autocomplete popup) on every render.
  const extensions = useMemo(() => {
    const languageExtension = getLanguageExtension(language);
    return languageExtension ? [autocompletion(), search(), languageExtension] : [autocompletion(), search()];
  }, [language]);

  const basicSetup = useMemo(() => ({ tabSize }), [tabSize]);

  const handleChange = useCallback((value: string) => onChange?.({ source: value }), [onChange]);

  const handleCreateEditor = useCallback((view: EditorView) => {
    editorRef.current = view;
  }, []);

  const { height = 0, ref } = useResizeDetector(RESIZE_DETECTOR_PROPS);

  return (
    <div style={{ fontSize: `${fontSize}px`, width: '100%', height: '100%' }} ref={ref}>
      <ReactCodeMirror
        readOnly={readOnly}
        value={source}
        documentKey={documentKey}
        stateCache={stateCache}
        height={height + 'px'}
        extensions={extensions}
        onChange={handleChange}
        theme={theme === Theme.DARK ? 'dark' : 'light'}
        basicSetup={basicSetup}
        onCreateEditor={handleCreateEditor}
      />
    </div>
  );
}

const CodeEditor = memo(CodeEditorCmp) as typeof CodeEditorCmp;

export default CodeEditor;
