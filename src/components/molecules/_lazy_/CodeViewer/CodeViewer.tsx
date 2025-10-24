import { CODE_LANGUAGE } from '@juki-team/commons';
import { type HLJSApi } from 'highlight.js';
// import hljs from 'highlight.js';
// import c from 'highlight.js/lib/languages/c';
// import cpp from 'highlight.js/lib/languages/cpp';
// import diff from 'highlight.js/lib/languages/diff';
// import java from 'highlight.js/lib/languages/java';
// import javascript from 'highlight.js/lib/languages/javascript';
// import json from 'highlight.js/lib/languages/json';
// import markdown from 'highlight.js/lib/languages/markdown';
// import python from 'highlight.js/lib/languages/python';
import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { Client, CopyToClipboard } from '../../../atoms';
import { classNames } from '../../../helpers';
import type { CodeViewerProps } from './types';

// hljs.registerLanguage('c', c);
// hljs.registerLanguage('cpp', cpp);
// hljs.registerLanguage('markdown', markdown);
// hljs.registerLanguage('json', json);
// hljs.registerLanguage('java', java);
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('python', python);
// hljs.registerLanguage('diff', diff);

let hljsInstance: HLJSApi | null = null;

async function loadHighlightJs() {
  if (hljsInstance) return hljsInstance;
  
  const hljs = (await import('highlight.js')).default;
  
  const [ c, cpp, diff, java, javascript, json, markdown, python ] = await Promise.all([
    import('highlight.js/lib/languages/c'),
    import('highlight.js/lib/languages/cpp'),
    import('highlight.js/lib/languages/diff'),
    import('highlight.js/lib/languages/java'),
    import('highlight.js/lib/languages/javascript'),
    import('highlight.js/lib/languages/json'),
    import('highlight.js/lib/languages/markdown'),
    import('highlight.js/lib/languages/python'),
  ]);
  
  hljs.registerLanguage('c', c.default);
  hljs.registerLanguage('cpp', cpp.default);
  hljs.registerLanguage('markdown', markdown.default);
  hljs.registerLanguage('json', json.default);
  hljs.registerLanguage('java', java.default);
  hljs.registerLanguage('javascript', javascript.default);
  hljs.registerLanguage('python', python.default);
  hljs.registerLanguage('diff', diff.default);
  
  hljsInstance = hljs;
  return hljs;
}

function CodeViewerCmp(props: CodeViewerProps) {
  
  const {
    code,
    language,
    lineNumbers = true,
    height,
    style,
    maxHeight,
    className,
  } = props;
  
  const [ hljsReady ] = useState<HLJSApi | null>(null);
  
  useEffect(() => {
    // void loadHighlightJs().then(setHljsReady);
  }, []);
  
  const highlighted = useMemo(() => {
    // if (!hljsReady) return '';
    // try {
    //   return hljsReady.highlight(code, { language: CODE_LANGUAGE[language]?.highlightJsKey || 'plaintext' }).value;
    // } catch {
    //   return hljsReady.highlightAuto(code).value;
    // }
    return '';
  }, [ code, hljsReady, language ]);
  
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

export default function CodeViewer(props: CodeViewerProps) {
  return <Client><CodeViewerCmp{...props} /></Client>;
}
