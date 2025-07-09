import { CODE_LANGUAGE, CodeLanguage } from '@juki-team/commons';
// import Prism from 'prismjs';
import React, { useEffect } from 'react';
import { classNames } from '../../../helpers';
import { CopyToClipboard } from '../../atoms/CopyToClipboard/CopyToClipboard';
import { CodeViewerDeprecatedProps } from './types';
// import 'prismjs/components/prism-c';
// import 'prismjs/components/prism-cpp';
// import 'prismjs/components/prism-markdown';
// import 'prismjs/components/prism-json';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-python';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';

export const CodeViewerDeprecated = (props: CodeViewerDeprecatedProps) => {
  
  const {
    code,
    language,
    lineNumbers,
    height,
    // withCopyButton = true,
    // withLanguageLabel = true,
    style,
  } = props;
  
  useEffect(() => {
    // Prism.highlightAll();
  }, [ language, lineNumbers, code ]);
  
  const withLanguageLabel = true;
  const withCopyButton = true;
  
  return (
    <div
      className={classNames('jk-code-viewer jk-border-radius-inline br-g6', { 'line-numbers': !!lineNumbers })}
      data-plugin-header="show-language"
      style={style}
    >
      <pre style={height ? { height: height } : undefined} className="jk-border-radius-inline">
        <code
          className={`language-${CODE_LANGUAGE[language]?.codeMirrorKey || language || CODE_LANGUAGE[CodeLanguage.TEXT].codeMirrorKey}`}
        >
          {code}
        </code>
      </pre>
      <div className="float-top-right pad-xt jk-row gap" style={{ zIndex: 'unset' }}>
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
