import { ProgrammingLanguage } from '@juki-team/commons';
import { CSSProperties } from 'react';

export interface CodeViewerProps {
  code: string,
  language: ProgrammingLanguage,
  lineNumbers?: boolean,
  height?: string,
  withCopyButton?: boolean,
  withLanguageLabel?: boolean,
  style?: CSSProperties,
}
