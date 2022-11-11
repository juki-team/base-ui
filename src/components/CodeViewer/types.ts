import { ProgrammingLanguage } from '@juki-team/commons';

export interface CodeViewerProps {
  code: string,
  language: ProgrammingLanguage,
  lineNumbers?: boolean,
  height?: string,
  withCopyButton?: boolean,
  withLanguageLabel?: boolean,
}
