import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from '@juki-team/commons';
import Prism from 'prismjs';
import React, { useEffect } from 'react';
import { classNames } from '../../../helpers';
import { ContentCopyIcon, CopyToClipboard } from '../../atoms';
import { CodeViewerProps } from './types';

export const CodeViewer = (props: CodeViewerProps) => {
  
  const {
    code,
    language,
    lineNumbers,
    height,
    withCopyButton = false,
    withLanguageLabel = false,
  } = props;
  
  useEffect(() => {
    require('prismjs/components/prism-c');
    require('prismjs/components/prism-cpp');
    require('prismjs/components/prism-markdown');
    require('prismjs/components/prism-json');
    require('prismjs/components/prism-java');
    require('prismjs/components/prism-javascript');
    require('prismjs/components/prism-python');
    require('prismjs/plugins/line-numbers/prism-line-numbers');
    Prism.highlightAll();
  }, [ language, lineNumbers ]);
  
  return (
    <div
      className={classNames('jk-code-viewer jk-border-radius-inline br-g6', { 'line-numbers': !!lineNumbers })}
      data-plugin-header="show-language"
    >
      <div className="float-top-right pad-xt jk-row gap">
        {withLanguageLabel && !!PROGRAMMING_LANGUAGE[language]?.label && (
          <div className="tx-t jk-tag">{PROGRAMMING_LANGUAGE[language]?.label}</div>
        )}
        {withCopyButton &&
            <CopyToClipboard text={code}><ContentCopyIcon size="small" className="link" /></CopyToClipboard>}
      </div>
      <pre style={height ? { height: height } : undefined} className="jk-border-radius-inline">
        <code
          className={`language-${PROGRAMMING_LANGUAGE[language]?.codeMirrorKey || PROGRAMMING_LANGUAGE[ProgrammingLanguage.TEXT].codeMirrorKey}`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
};
