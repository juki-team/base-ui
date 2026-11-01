import { type Ref, type RefObject } from 'react';
import type { CodeRunnerEditorOnChangeType } from '../types';

// Only the metadata the tree needs. Keeping `source` out lets the parent pass a memoized object
// that doesn't change on every keystroke, so the (memoized) panel doesn't re-render while typing.
export interface FileTreeEntry {
  name: string;
  folderPath: string;
  index: number;
  description?: string;
}

export type FileTreeFiles = Record<string, FileTreeEntry>;

export interface FileTreePanelProps<T> {
  fileTreePanelRef?: Ref<HTMLDivElement>;
  files: FileTreeFiles;
  currentFileName: string;
  onChangeRef: RefObject<CodeRunnerEditorOnChangeType<T> | undefined>;
  readOnly?: boolean;
}
