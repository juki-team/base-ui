import Prism from 'prismjs';
import React, { useEffect } from 'react';
import { PROGRAMMING_LANGUAGE } from '../../config/constants';
import { classNames } from '../../helpers';
import { ProgrammingLanguage } from '../../types';
import { CodeViewerProps } from './types';

export const CodeViewer = ({ code, language, lineNumbers, height }: CodeViewerProps) => {
  
  useEffect(() => {
    // require('./imports');
    require('prismjs/components/prism-c');
    require('prismjs/components/prism-cpp');
    require('prismjs/components/prism-markdown');
    require('prismjs/plugins/line-numbers/prism-line-numbers');
    require('prismjs/plugins/show-language/prism-show-language');
    Prism.highlightAll();
  }, []);
  
  return (
    <div className={classNames('jk-code-viewer', { 'line-numbers': !!lineNumbers })} data-plugin-header="show-language">
      <pre style={height ? { height: height } : undefined} className="jk-border-radius-inline">
        <code
          className={`language-${PROGRAMMING_LANGUAGE[language]?.codeMirrorKey || PROGRAMMING_LANGUAGE[ProgrammingLanguage.TEXT].codeMirrorKey}`}
          data-language="SVG v1.1"
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

export * from './types';