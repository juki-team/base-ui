// Copy of https://github.com/uiwjs/react-codemirror
import type { EditorState } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { ReactCodeMirrorProps } from './types';
import { useCodeMirror } from './useCodeMirror';

// export * from '@codemirror/view';
// export * from '@codemirror/state';
//
// export * from '@uiw/codemirror-extensions-basic-setup';
// export * from './useCodeMirror';
// export * from './getDefaultExtensions';
// export * from './utils';

export interface ReactCodeMirrorRef {
  editor?: HTMLDivElement | null;
  state?: EditorState;
  view?: EditorView;
}

const ReactCodeMirror = forwardRef<ReactCodeMirrorRef, ReactCodeMirrorProps>((props, ref) => {
  const {
    className,
    value = '',
    selection,
    extensions = [],
    onChange,
    onStatistics,
    onCreateEditor,
    onUpdate,
    autoFocus,
    theme = 'light',
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    basicSetup,
    placeholder,
    indentWithTab,
    editable,
    readOnly,
    root,
    initialState,
    ...other
  } = props;
  const editor = useRef<HTMLDivElement | null>(null);
  const { state, view, container, setContainer } = useCodeMirror({
    root,
    value,
    autoFocus,
    theme,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    basicSetup,
    placeholder,
    indentWithTab,
    editable,
    readOnly,
    selection,
    onChange,
    onStatistics,
    onCreateEditor,
    onUpdate,
    extensions,
    initialState,
  });
  
  useImperativeHandle(ref, () => ({ editor: editor.current, state: state, view: view }), [
    editor,
    container,
    state,
    view,
  ]);
  
  const setEditorRef = useCallback(
    (el: HTMLDivElement) => {
      editor.current = el;
      setContainer(el);
    },
    [ setContainer ],
  );
  
  // check type of value
  if (typeof value !== 'string') {
    throw new Error(`value must be typeof string but got ${typeof value}`);
  }
  
  const defaultClassNames = typeof theme === 'string' ? `cm-theme-${theme}` : 'cm-theme';
  return (
    <div ref={setEditorRef} className={`${defaultClassNames}${className ? ` ${className}` : ''}`} {...other}></div>
  );
});

ReactCodeMirror.displayName = 'CodeMirror';

export default ReactCodeMirror;
