import { CodeEditorTestCasesType, SubmissionTestCaseType } from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { CodeEditorPropertiesType } from '../../index';

export type CodeRunnerEditorPropertiesType<T> = CodeEditorPropertiesType<T> & {
  testCases?: CodeEditorTestCasesType
};

export type CodeRunnerEditorOnChangeType<T> = (props: CodeRunnerEditorPropertiesType<T>) => void;

export type CodeEditorMiddleButtonsType<T> = (props: Omit<CodeRunnerEditorProps<T>, 'onChange' | 'className' | 'middleButtons'> & {
  widthContainer: number
}) => ReactNode;

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
  middleButtons?: CodeEditorMiddleButtonsType<T>,
  testCases?: CodeEditorTestCasesType,
  timeLimit?: number,
  memoryLimit?: number,
  expandPosition?: CodeEditorExpandPositionType,
  noCustomTestCases?: boolean,
}

export interface SettingsModalProps<T> {
  isOpen: boolean
  onClose: () => void,
  onChange?: CodeRunnerEditorOnChangeType<T>,
  tabSize: number,
  fontSize: number,
}

export interface TestCasesProps<T> {
  testCases: CodeEditorTestCasesType,
  onChange?: CodeRunnerEditorOnChangeType<T>,
  timeLimit: number,
  memoryLimit: number,
  direction: 'row' | 'column',
  noCustomTestCases?: boolean,
}

export interface HeaderProps<T> {
  sourceCode: string,
  languages: { value: T, label: string }[],//ProgrammingLanguage[],
  language: T,//ProgrammingLanguage,
  onChange?: CodeRunnerEditorOnChangeType<T>,
  testCases: CodeEditorTestCasesType,
  setShowSettings: Dispatch<SetStateAction<boolean>>,
  setRunId: Dispatch<SetStateAction<string>>,
  centerOptions: (props: { widthContainer: number }) => ReactNode,
  timeLimit: number,
  memoryLimit: number,
  expanded: boolean | null,
  setExpanded: Dispatch<SetStateAction<boolean>>,
}

export interface LogInfoProps {
  testCase: SubmissionTestCaseType,
  timeLimit: number,
  memoryLimit: number,
}
