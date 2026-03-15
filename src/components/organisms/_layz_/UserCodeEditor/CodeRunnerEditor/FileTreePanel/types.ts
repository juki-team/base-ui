import { type CodeEditorFiles } from '@juki-team/commons';
import { type Ref, type RefObject } from 'react';
import type { CodeRunnerEditorOnChangeType } from '../types';

export interface FileTreePanelProps<T> {
  fileTreePanelRef: Ref<HTMLDivElement>;
  files: CodeEditorFiles<T>;
  currentFileName: string;
  onChangeRef: RefObject<CodeRunnerEditorOnChangeType<T> | undefined>;
  readOnly?: boolean;
}
