import { ProgrammingLanguage } from '../../types';

export interface CodeViewerProps {
  code: string,
  language: ProgrammingLanguage,
  lineNumbers?: boolean,
  height?: string,
  withCopyButton?: boolean,
  withLanguageLabel?: boolean,
}
