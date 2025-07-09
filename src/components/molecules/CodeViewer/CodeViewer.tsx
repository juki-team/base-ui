import { CODE_LANGUAGE } from '@juki-team/commons';
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import React, { useEffect, useRef } from 'react';
import { classNames } from '../../../helpers';
import { CopyToClipboard } from '../../atoms';
import { CodeViewerProps } from './types'; // o el tema que prefieras

hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

export const CodeViewer = (props: CodeViewerProps) => {
  
  const {
    code,
    language,
    lineNumbers = true,
    height,
    style,
  } = props;
  
  const codeRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (codeRef.current) {
      const el = codeRef.current;
      el.removeAttribute('data-highlighted');
      el.classList.remove(...Array.from(el.classList).filter(c => c.startsWith('hljs')));
      el.innerHTML = code;
      hljs.highlightElement(el);
    }
  }, [ language, code ]);
  
  const withLanguageLabel = true;
  const withCopyButton = true;
  
  return (
    <div
      className={classNames('jk-code-viewer jk-border-radius-inline br-g6', { 'line-numbers': lineNumbers })}
      style={style}
    >
      {lineNumbers && (
        <div className="jk-code-viewer-line-numbers">
          {code.split('\n').map((line, i) => (<div>{i + 1}</div>))}
        </div>
      )}
      <pre
        style={height ? { height } : undefined}
        className="jk-border-radius-inline"
      >
        <code
          ref={codeRef}
          className={`language-${CODE_LANGUAGE[language]?.codeMirrorKey || 'plaintext'}`}
        >
          {code}
        </code>
      </pre>
      <div className="float-top-right pad-xt jk-row gap">
        {withLanguageLabel && !!CODE_LANGUAGE[language]?.label && (
          <div className="tx-t jk-tag bc-pl jk-pg-xsm">{CODE_LANGUAGE[language]?.label}</div>
        )}
        {withCopyButton && (
          <CopyToClipboard text={code} size="small" />
        )}
      </div>
    </div>
  );
};
