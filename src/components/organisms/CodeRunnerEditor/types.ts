import { CodeEditorTestCasesType, SubmissionRunStatus, SubmissionTestCaseType } from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { UseResizeDetectorReturn } from 'react-resize-detector';
import { BasicModalProps } from '../../atoms/Modal/types';
import { CodeEditorPropertiesType } from '../../index';

export type CodeRunnerEditorPropertiesType<T> = CodeEditorPropertiesType<T> & {
  onTestCasesChange?: (testCases: CodeEditorTestCasesType) => CodeEditorTestCasesType,
  codeRunStatus?: SubmissionRunStatus,
};

export type CodeRunnerEditorOnChangeType<T> = (props: CodeRunnerEditorPropertiesType<T>) => void;

export type CodeEditorCenterButtonsPropertiesType<T> =
  Omit<CodeRunnerEditorProps<T>, 'onChange' | 'className' | 'centerButtons' | 'rightButtons'>
  & {
  widthContainer: number
  isRunning: boolean,
  testCases: CodeEditorTestCasesType,
  withLabels: boolean,
  twoRows: boolean,
}

export type CodeEditorCenterButtonsType<T> = (props: CodeEditorCenterButtonsPropertiesType<T>) => ReactNode;

export type CodeEditorExpandPositionType = {
  top: string | number,
  left: string | number,
  width: string | number,
  height: string | number,
};

export interface CodeRunnerEditorProps<T> extends CodeEditorPropertiesType<T> {
  sourceCode: string,
  language: T,
  readOnly?: boolean,
  onChange?: CodeRunnerEditorOnChangeType<T>,
  languages?: { value: T, label: string }[],
  className?: string,
  testCases?: CodeEditorTestCasesType,
  centerButtons?: CodeEditorCenterButtonsType<T>,
  rightButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode,
  timeLimit?: number,
  memoryLimit?: number,
  expandPosition?: CodeEditorExpandPositionType,
  enableAddSampleCases?: boolean,
  enableAddCustomSampleCases?: boolean,
  withoutRunCodeButton?: boolean,
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
  sourceCode: string,
  languages: { value: T, label: string }[],//ProgrammingLanguage[],
  language: T,//ProgrammingLanguage,
  onChange?: CodeRunnerEditorOnChangeType<T>,
  testCases: CodeEditorTestCasesType,
  setShowSettings: Dispatch<SetStateAction<boolean>>,
  runId: string,
  setRunId: Dispatch<SetStateAction<string>>,
  centerOptions: (props: { widthContainer: number, withLabels: boolean, twoRows: boolean }) => ReactNode,
  rightOptions: (props: { withLabels: boolean, twoRows: boolean }) => ReactNode,
  timeLimit: number,
  memoryLimit: number,
  expanded: boolean | null,
  setExpanded: Dispatch<SetStateAction<boolean>>,
  isRunning: boolean,
  withoutRunCodeButton: boolean,
  readOnly: boolean,
  headerRef: UseResizeDetectorReturn<any>['ref'],
  headerWidthContainer: number,
  twoRows: boolean,
}

export interface LogInfoProps {
  testCase: SubmissionTestCaseType,
  timeLimit: number,
  memoryLimit: number,
}
