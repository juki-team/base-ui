import type { CodeLanguage } from '@juki-team/commons';
import type { CSSProperties } from 'react';

export interface CodeViewerProps {
  code: string;
  language: CodeLanguage;
  lineNumbers?: boolean;
  height?: string;
  // withCopyButton?: boolean,
  // withLanguageLabel?: boolean,
  style?: CSSProperties;
  maxHeight?: string | number;
  className?: string;
  fontSize?: string | number;
}
