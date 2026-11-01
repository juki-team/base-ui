import { CodeEditorTestCases, SubmissionRunStatus } from '@juki-team/commons';
import type { CodeEditorFile, CodeEditorFiles } from './code-editor-file';
import { MdMathEditorHandle } from '../MdMathEditor/types';
import { CodeEditorExpandPositionType, CodeRunnerEditorProps } from './CodeRunnerEditor/types';

export interface UserCodeEditorHandle<T> {
  setFile: (file: CodeEditorFile<T>) => void;
  /** latest files, read on demand (e.g. on save) instead of mirroring them through onFilesChange */
  getFiles: () => CodeEditorFiles<T>;
  getTestCases: () => CodeEditorTestCases;
  getCurrentFileName: () => string;
  /** emit any pending (debounced) onFilesChange / onTestCasesChange right now */
  flushChanges: () => void;
  // Markdown file actions:
  markdownGetSelection: MdMathEditorHandle['getSelectionMarkdown'];
  markdownReplaceSelectionWithMarkdown: MdMathEditorHandle['replaceSelectionWithMarkdown'];
  markdownHighlightSelectionNodes: MdMathEditorHandle['highlightSelectionNodes'];
  markdownClearHighlight: MdMathEditorHandle['clearHighlight'];
}

export interface UserCodeEditorProps<T> extends Pick<
  CodeRunnerEditorProps<T>,
  | 'languages'
  | 'leftButtons'
  | 'centerButtons'
  | 'rightButtons'
  | 'withoutRunCodeButton'
  | 'mermaidTheme'
  | 'mermaidConfigJson'
  | 'mermaidFileName'
> {
  className?: string;
  expandPosition?: CodeEditorExpandPositionType;
  initialTestCases?: CodeEditorTestCases;
  initialFileName?: string;
  storeKey: string;
  /**
   * Debounced while typing (flushed on blur, run and unmount). If you only need the files when the user
   * acts (save/submit), prefer reading them with the ref handle's `getFiles()`: no re-render per keystroke.
   */
  onFilesChange?: (files: CodeEditorFiles<T>) => void;
  onCurrentFileNameChange?: (currentFileName: string) => void;
  /** Debounced like onFilesChange. */
  onTestCasesChange?: (testCases: CodeEditorTestCases) => void;
  onIsRunningChange?: (isRunning: boolean) => void;
  initialFiles?: CodeEditorFiles<T>;
  enableAddSampleCases?: boolean;
  enableAddCustomSampleCases?: boolean;
  readOnly?: boolean;
  onCodeRunStatusChange?: (
    runStatus: SubmissionRunStatus,
    props: {
      files: CodeEditorFiles<T>;
      currentFileName: string;
      testCases: CodeEditorTestCases;
    },
  ) => void;
  onlyCodeEditor?: boolean;
}
