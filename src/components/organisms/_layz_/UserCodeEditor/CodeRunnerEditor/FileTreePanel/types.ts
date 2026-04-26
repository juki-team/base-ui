import type { CodeEditorFiles } from '@juki-team/commons/types';
import type { Ref, RefObject } from 'react';
import type { CodeRunnerEditorOnChangeType } from '../types';

export interface FileTreePanelProps<T> {
  fileTreePanelRef?: Ref<HTMLDivElement>;
  files: CodeEditorFiles<T>;
  currentFileName: string;
  onChangeRef: RefObject<CodeRunnerEditorOnChangeType<T> | undefined>;
  readOnly?: boolean;
}
