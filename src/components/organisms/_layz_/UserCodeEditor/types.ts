import { CodeEditorFiles, CodeEditorTestCasesType, SubmissionRunStatus } from '@juki-team/commons';
import { ReactNode } from 'react';
import {
  CodeEditorButtonsType,
  CodeEditorCenterButtonsPropertiesType,
  CodeEditorExpandPositionType,
} from './CodeRunnerEditor/types';

export interface UserCodeEditorProps<T> {
  className?: string,
  expandPosition?: CodeEditorExpandPositionType,
  initialTestCases?: CodeEditorTestCasesType,
  initialFileName?: string,
  storeKey: string,
  languages: { value: T, label: string }[],
  leftButtons?: CodeEditorButtonsType<T>,
  centerButtons?: CodeEditorButtonsType<T>,
  rightButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode,
  // onSourceChange?: (source: string) => void,
  // onLanguageChange?: (language: T) => void,
  onFilesChange?: (files: CodeEditorFiles<T>) => void,
  onTestCasesChange?: (testCases: CodeEditorTestCasesType) => void,
  onIsRunningChange?: (isRunning: boolean) => void,
  initialFiles?: CodeEditorFiles<T>,
  enableAddSampleCases?: boolean,
  enableAddCustomSampleCases?: boolean,
  readOnly?: boolean,
  withoutRunCodeButton?: boolean,
  withoutDownloadCopyButton?: boolean,
  onCodeRunStatusChange?: (runStatus: SubmissionRunStatus, props: {
    files: CodeEditorFiles<T>,
    currentFileName: string,
    testCases: CodeEditorTestCasesType
  }) => void,
  onlyCodeEditor?: boolean,
}
