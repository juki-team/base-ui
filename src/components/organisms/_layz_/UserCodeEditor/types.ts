import { CodeEditorFile, CodeEditorFiles, CodeEditorTestCases, SubmissionRunStatus } from '@juki-team/commons';
import { MdMathEditorHandle } from '../MdMathEditor/types';
import { CodeEditorExpandPositionType, CodeRunnerEditorProps } from './CodeRunnerEditor/types';

export interface UserCodeEditorHandle {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFile: (fileName: string, file: CodeEditorFile<any>) => void;
  // Markdown file actions:
  markdownGetSelection: MdMathEditorHandle['getSelectionMarkdown'];
  markdownReplaceSelectionWithMarkdown: MdMathEditorHandle['replaceSelectionWithMarkdown'];
  markdownHighlightSelectionNodes: MdMathEditorHandle['highlightSelectionNodes'];
  markdownClearHighlight: MdMathEditorHandle['clearHighlight'];
}

export interface UserCodeEditorProps<T> extends Pick<
  CodeRunnerEditorProps<T>,
  'languages' | 'leftButtons' | 'centerButtons' | 'rightButtons'
> {
  className?: string;
  expandPosition?: CodeEditorExpandPositionType;
  initialTestCases?: CodeEditorTestCases;
  initialFileName?: string;
  storeKey: string;
  onFilesChange?: (files: CodeEditorFiles<T>) => void;
  onCurrentFileNameChange?: (currentFileName: string) => void;
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
