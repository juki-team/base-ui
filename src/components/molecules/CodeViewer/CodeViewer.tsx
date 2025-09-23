import { CODE_LANGUAGE, ProfileSetting } from '@juki-team/commons';
import hljs from 'highlight.js';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import diff from 'highlight.js/lib/languages/diff';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { classNames } from '../../../helpers';
import { useUserStore } from '../../../stores/user/useUserStore';
import { CopyToClipboard } from '../../atoms';
import { CodeViewerProps } from './types'; // o el tema que prefieras

hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('diff', diff);

export const CodeViewer = (props: CodeViewerProps) => {
  
  const {
    code,
    language,
    lineNumbers = true,
    height,
    style,
    maxHeight,
    className,
    fontSize,
  } = props;
  
  const codeRef = useRef<HTMLElement>(null);
  const userPreferredFontSize = useUserStore(state => state.user.settings?.[ProfileSetting.FONT_SIZE]);
  
  const userFontSize = fontSize || userPreferredFontSize;
  
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
  
  const fontSizeCSS = typeof userFontSize === 'string' ? userFontSize : (userFontSize + 'px');
  return (
    <div
      className={classNames('jk-code-viewer jk-br-ie br-g6', className, { 'line-numbers': lineNumbers })}
      style={{
        ...style,
        '--font-size': fontSizeCSS,
      } as CSSProperties}
    >
      <div className="jk-code-viewer-content jk-row nowrap top jk-br-ie" style={{ maxHeight }}>
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
            className={`ta-lt language-${CODE_LANGUAGE[language]?.highlightJsKey || 'plaintext'}`}
            style={{ minHeight: `calc(${lines.length} * (${fontSizeCSS} * 1.5))` }}
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
