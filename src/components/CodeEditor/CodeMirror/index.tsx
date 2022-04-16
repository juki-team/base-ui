import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { CodeMirrorType, EditorFromTextAreaType, IEditorInstance, IReactCodemirror } from './types';

const defaultOptions = {
  tabSize: 2,
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  // 显示行号
  lineNumbers: true,
  fullScreen: true,
};

function ReactCodeMirror(props: IReactCodemirror & React.RefAttributes<IEditorInstance | undefined> = {}, ref: any) {
  const { options = {}, value = '', width = '100%', height = '100%', lazyLoadMode = true } = props;
  const [editor, setEditor] = useState<EditorFromTextAreaType>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const latestProps = useRef(props);
  const codemirror = useRef<CodeMirrorType | null>(null);
  useEffect(() => {
    codemirror.current = require('codemirror');
    // require('./imports');
    require('codemirror/addon/comment/comment');
    require('codemirror/addon/dialog/dialog');
    require('codemirror/addon/display/autorefresh');
    require('codemirror/addon/edit/closebrackets');
    require('codemirror/addon/edit/closetag');
    require('codemirror/addon/edit/continuelist');
    require('codemirror/addon/edit/matchbrackets');
    require('codemirror/addon/edit/matchtags');
    // require(codemirror/addon/edit/trailingspace');
    require('codemirror/addon/hint/anyword-hint');
    require('codemirror/addon/hint/css-hint');
    require('codemirror/addon/hint/html-hint');
    require('codemirror/addon/hint/javascript-hint');
    require('codemirror/addon/hint/show-hint');
    require('codemirror/addon/hint/sql-hint');
    require('codemirror/addon/hint/xml-hint');
    require('codemirror/addon/search/searchcursor');
    require('codemirror/keymap/emacs');
    require('codemirror/keymap/sublime');
    require('codemirror/keymap/vim');
    require('codemirror/lib/codemirror');
  
    // Manually loading the language resources here
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/meta');
    require('codemirror/mode/clike/clike');
    require('codemirror/mode/python/python');
  }, []);
  
  useImperativeHandle(ref, () => ({ editor }), [editor]);
  latestProps.current = props;
  
  // 将props中所有的事件处理函数映射并保存
  function getEventHandleFromProps() {
    const propNames = Object.keys(props);
    const eventHandle = propNames.filter((keyName) => {
      return /^on+/.test(keyName);
    });
    
    const eventDict = {};
    eventHandle.forEach((ele) => {
      const name = ele.slice(2);
      if (name && name[0]) {
        // @ts-ignore
        eventDict[ele] = name.replace(name[0], name[0].toLowerCase());
      }
    });
    
    return eventDict;
  }
  
  // http://codemirror.net/doc/manual.html#config
  async function setOptions(instance: EditorFromTextAreaType, opt: any = {}) {
    if (typeof opt === 'object' && window) {
      // @ts-ignore
      const mode = codemirror.current.findModeByName(opt.mode || '');
      if (lazyLoadMode && mode && mode.mode) {
        await import(`codemirror/mode/${mode.mode}/${mode.mode}.js`);
      }
      if (mode) {
        opt.mode = mode.mime;
      }
      Object.keys(opt).forEach((name) => {
        if ((opt[name] || opt[name] === false) && JSON.stringify(opt[name])) {
          // @ts-ignore
          instance.setOption(name, opt[name]);
        }
      });
    }
  }
  
  useEffect(() => {
    if (!editor && window) {
      // 生成codemirror实例
      const instance = codemirror.current?.fromTextArea(textareaRef.current!, { ...defaultOptions, ...options });
      const eventDict = getEventHandleFromProps();
      Object.keys(eventDict).forEach((event) => {
        // @ts-ignore
        instance?.on(eventDict[event], (...params) => latestProps.current[event](...params));
      });
      instance?.setValue(value || '');
      
      if (width || height) {
        // 设置尺寸
        instance?.setSize(width, height);
      }
      setEditor(instance);
      setOptions(instance!, { ...defaultOptions, ...options });
    }
    return () => {
      if (editor && window) {
        editor.toTextArea();
        setEditor(undefined);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useMemo(() => {
    if (!editor || !window) return;
    const val = editor.getValue();
    if (value !== undefined && value !== val) {
      editor.setValue(value);
    }
  }, [editor, value]);
  
  useMemo(() => {
    if (!editor || !window) return;
    editor.setSize(width, height);
  }, [editor, width, height]);
  
  useMemo(() => {
    if (!editor || !window) return;
    setOptions(editor, { ...defaultOptions, ...options });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, options]);
  
  return (
    <textarea ref={textareaRef} />
  );
}

export default React.forwardRef(ReactCodeMirror);
