import { PROGRAMMING_LANGUAGE } from '@juki-team/commons';
import Prism from 'prismjs';
import React, { useEffect } from 'react';
import { classNames } from '../../helpers';
import { ProgrammingLanguage } from '../../types';
import { CopyToClipboard } from '../CopyToClipboard';
import { CopyIcon } from '../graphics';
import { CodeViewerProps } from './types';

export const CodeViewer = ({ code, language, lineNumbers, height }: CodeViewerProps) => {
  
  useEffect(() => {
    require('prismjs/components/prism-c');
    require('prismjs/components/prism-cpp');
    require('prismjs/components/prism-markdown');
    require('prismjs/plugins/line-numbers/prism-line-numbers');
    Prism.highlightAll();
  }, []);
  
  return (
    <div
      className={classNames('jk-code-viewer jk-shadow jk-border-radius-inline', { 'line-numbers': !!lineNumbers })}
      data-plugin-header="show-language"
    >
      <div className="float-top-right pad-xt jk-row gap display-on-hover-6">
        {PROGRAMMING_LANGUAGE[language]?.label && <div className="text-xs jk-tag">{PROGRAMMING_LANGUAGE[language]?.label}</div>}
        <CopyToClipboard text={code}><CopyIcon size="small" className="link" /></CopyToClipboard>
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

export * from './types';