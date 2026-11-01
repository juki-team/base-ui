import { Theme } from '@juki-team/commons';
import type { EditorStateCache } from './codemirror/types';

export type { CachedEditorDocument, EditorStateCache } from './codemirror/types';

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
  /** identifies the document: each key keeps its own undo history, selection and scroll */
  documentKey?: string,
  /** stable Map owned by the caller so document states survive editor remounts */
  stateCache?: EditorStateCache,
}
