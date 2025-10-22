import {
  CodeEditorFiles,
  CodeEditorTestCasesType,
  SubmissionRunStatus,
  SubmissionTestCaseType,
} from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { UseResizeDetectorReturn } from 'react-resize-detector';
import { BasicModalProps } from '../../../../atoms/Modal/types';
import { CodeEditorPropertiesType } from '../../../../molecules/types';

export type CodeRunnerEditorPropertiesType<T> = CodeEditorPropertiesType<T> & {
  onTestCasesChange?: (testCases: CodeEditorTestCasesType) => CodeEditorTestCasesType,
  codeRunStatus?: SubmissionRunStatus,
  fileName?: string,
  newFileName?: true,
  fileNameEdited?: [ string, string ],
  fileNameDeleted?: string,
};

export type CodeRunnerEditorOnChangeType<T> = (props: CodeRunnerEditorPropertiesType<T>) => void;

export type CodeEditorCenterButtonsPropertiesType<T> = {
  widthContainer: number
  isRunning: boolean,
  testCases: CodeEditorTestCasesType,
  withLabels: boolean,
  twoRows: boolean,
  files: CodeEditorFiles<T>,
  currentFileName: string,
}

export type CodeEditorButtonsType<T> = (props: CodeEditorCenterButtonsPropertiesType<T>) => ReactNode;

export type CodeEditorExpandPositionType = {
  top: string | number,
  left: string | number,
  width: string | number,
  height: string | number,
};

export interface CodeRunnerEditorProps<T> extends Omit<CodeEditorPropertiesType<T>, 'sourceCode' | 'language'> {
  triggerFocus?: number,
  files: CodeEditorFiles<T>,
  currentFileName: string,
  // sourceCode: string,
  // language: T,
  readOnly?: boolean,
  onChange?: CodeRunnerEditorOnChangeType<T>,
  languages?: { value: T, label: ReactNode }[],
  className?: string,
  testCases?: CodeEditorTestCasesType,
  leftButtons?: CodeEditorButtonsType<T>,
  centerButtons?: CodeEditorButtonsType<T>,
  rightButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode,
  timeLimit?: number,
  memoryLimit?: number,
  expandPosition?: CodeEditorExpandPositionType,
  enableAddSampleCases?: boolean,
  enableAddCustomSampleCases?: boolean,
  withoutRunCodeButton?: boolean,
  withoutDownloadCopyButton?: boolean,
  onlyCodeEditor?: boolean,
}

export interface SettingsModalProps<T> extends BasicModalProps {
  onChange?: CodeRunnerEditorOnChangeType<T>,
  tabSize: number,
  fontSize: number,
}

export interface TestCasesProps<T> {
  testCases?: CodeEditorTestCasesType,
  onChange?: CodeRunnerEditorOnChangeType<T>,
  timeLimit: number,
  memoryLimit: number,
  direction: 'row' | 'column',
  enableAddSampleCases: boolean,
  enableAddCustomSampleCases: boolean,
  isRunning: boolean,
}

export interface HeaderProps<T> {
  languages: { value: T, label: ReactNode }[],
  onChange?: CodeRunnerEditorOnChangeType<T>,
  testCases: CodeEditorTestCasesType,
  setShowSettings: Dispatch<SetStateAction<boolean>>,
  runId: string,
  setRunId: Dispatch<SetStateAction<string>>,
  leftOptions: (props: { widthContainer: number, withLabels: boolean, twoRows: boolean }) => ReactNode,
  centerOptions: (props: { widthContainer: number, withLabels: boolean, twoRows: boolean }) => ReactNode,
  rightOptions: (props: { withLabels: boolean, twoRows: boolean }) => ReactNode,
  timeLimit: number,
  memoryLimit: number,
  expanded: boolean | null,
  setExpanded: Dispatch<SetStateAction<boolean>>,
  isRunning: boolean,
  withoutRunCodeButton: boolean,
  withoutDownloadCopyButton: boolean,
  readOnly: boolean,
  headerRef: UseResizeDetectorReturn<any>['ref'],
  headerWidthContainer: number,
  twoRows: boolean,
  files: CodeEditorFiles<T>,
  currentFileName: string,
}

export interface LogInfoProps {
  testCase: SubmissionTestCaseType,
  timeLimit: number,
  memoryLimit: number,
}
