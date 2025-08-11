import { CODE_LANGUAGE } from '@juki-team/commons';
import hljs from 'highlight.js';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import React, { CSSProperties, useEffect, useRef } from 'react';
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
      // el.innerHTML = code; // issues with '<' '>'
      // el.textContent = code;
      hljs.highlightElement(el);
    }
  }, [ language, code ]);
  
  const withLanguageLabel = true;
  const withCopyButton = true;
  const lines = code.split('\n');
  if (code[code.length - 1] === '\n') {
    lines.pop();
  }
  
  return (
    <div
      className={classNames('jk-code-viewer jk-br-ie br-g6', { 'line-numbers': lineNumbers })}
      style={style}
    >
      <div className="jk-code-viewer-content jk-row nowrap top jk-br-ie">
        {lineNumbers && (
          <div className="jk-code-viewer-line-numbers">
            {lines.map((_, i) => <div style={{ '--line-index': i } as CSSProperties}>{i + 1}</div>)}
          </div>
        )}
        <pre
          style={height ? { height } : undefined}
          className="jk-border-radius-inline"
        >
          <code
            ref={codeRef}
            key={language}
            className={`language-${CODE_LANGUAGE[language]?.codeMirrorKey || 'plaintext'}`}
            style={{ minHeight: lines.length * 24 }}
          >
            {code}
          </code>
        </pre>
      </div>
      <div className="float-top-right pad-xt jk-row gap">
        {withLanguageLabel && !!CODE_LANGUAGE[language]?.label && (
          <div className="tx-t jk-tag bc-pl cr-we jk-pg-xsm">{CODE_LANGUAGE[language]?.label}</div>
        )}
        {withCopyButton && (
          <CopyToClipboard text={code} size="small" />
        )}
      </div>
    </div>
  );
};
