import { CODE_LANGUAGE } from '@juki-team/commons';
import hljs from 'highlight.js';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import diff from 'highlight.js/lib/languages/diff';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import { type CSSProperties, useMemo } from 'react';
import { CopyToClipboard } from '../../../atoms';
import { classNames } from '../../../helpers';
import type { CodeViewerProps } from './types';

hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('diff', diff);

export default function CodeViewer(props: CodeViewerProps) {
  
  const {
    code,
    language,
    lineNumbers = true,
    height,
    style,
    maxHeight,
    className,
  } = props;
  
  const highlighted = useMemo(() => {
    return hljs.highlight(code, { language: CODE_LANGUAGE[language]?.highlightJsKey || 'plaintext' }).value;
  }, [ code, language ]);
  
  const withLanguageLabel = true;
  const withCopyButton = true;
  const lines = code.split('\n');
  if (code[code.length - 1] === '\n') {
    lines.pop();
  }
  
  return (
    <div
      className={classNames('jk-code-viewer jk-br-ie br-g6', className, { 'line-numbers': lineNumbers })}
      style={style}
    >
      <div className="jk-code-viewer-content jk-row nowrap top jk-br-ie" style={{ maxHeight }}>
        {lineNumbers && (
          <div className="jk-code-viewer-line-numbers">
            {lines.map((_, i) => <div key={i} style={{ '--line-index': i } as CSSProperties}>{i + 1}</div>)}
          </div>
        )}
        <pre
          style={height ? { height } : undefined}
          className="jk-br-ie"
        >
          <code
            className={`ta-lt language-${CODE_LANGUAGE[language]?.highlightJsKey || 'plaintext'}`}
            style={{ minHeight: `calc(${lines.length} * (var(--text-medium-size) * 1.5))` }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
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
}
