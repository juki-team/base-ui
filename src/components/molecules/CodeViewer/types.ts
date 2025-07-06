import { CodeLanguage } from '@juki-team/commons';
import { CSSProperties } from 'react';

export interface CodeViewerProps {
  code: string,
  language: CodeLanguage,
  lineNumbers?: boolean,
  height?: string,
  // withCopyButton?: boolean,
  // withLanguageLabel?: boolean,
  style?: CSSProperties,
}

export type CodeViewerDeprecatedProps = CodeViewerProps;
