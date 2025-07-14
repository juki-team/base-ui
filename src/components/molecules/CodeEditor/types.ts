import { Theme } from '@juki-team/commons';

export type CodeEditorPropertiesType<T = string> = {
  isRunning?: boolean,
  source?: string,
  language?: T,
  theme?: Theme,
  // keyMap?: CodeEditorKeyMap,
  tabSize?: number,
  fontSize?: number,
  triggerFocus?: number,
};

export type CodeEditorOnChangeType<T> = (props: CodeEditorPropertiesType<T>) => void;

export interface CodeEditorProps<T> extends CodeEditorPropertiesType<T> {
  language: T,
  source: string,
  readOnly?: boolean,
  onChange?: CodeEditorOnChangeType<T>,
}
