import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ProgrammingLanguage, SubmissionRunStatus } from '../../types';
import { CodeEditorKeyMap, CodeEditorPropertiesType, CodeEditorTheme } from '../CodeEditor';

export type SubmissionTestCaseType = {
  out: string,
  err: string,
  log: string,
  status: SubmissionRunStatus,
}

export interface CodeEditorTestCaseType extends SubmissionTestCaseType {
  key: string,
  in: string,
  sample: boolean,
  index: number,
}

export type CodeEditorTestCasesType = { [key: string]: CodeEditorTestCaseType };

export type CodeRunnerEditorPropertiesType = CodeEditorPropertiesType & { testCases?: CodeEditorTestCasesType };

export type CodeRunnerEditorOnChangeType = (props: CodeRunnerEditorPropertiesType) => void;

export type MiddleButtonsType = (props: Omit<CodeRunnerEditorProps, 'onChange' | 'className' | 'middleButtons'> & { widthContainer: number }) => ReactNode;

export type ExpandPositionType = {
  top: string | number,
  left: string | number,
  width: string | number,
  height: string | number,
};

export interface CodeRunnerEditorProps extends CodeEditorPropertiesType {
  sourceCode: string,
  language: ProgrammingLanguage,
  readOnly?: boolean,
  onChange?: CodeRunnerEditorOnChangeType,
  languages?: ProgrammingLanguage[],
  className?: string,
  middleButtons?: MiddleButtonsType,
  testCases?: CodeEditorTestCasesType,
  timeLimit?: number,
  memoryLimit?: number,
  expandPosition?: ExpandPositionType,
}

export interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void,
  onChange?: CodeRunnerEditorOnChangeType,
  keyMap: CodeEditorKeyMap,
  theme: CodeEditorTheme,
  tabSize: number,
  fontSize: number,
}

export interface TestCasesProps {
  testCases: CodeEditorTestCasesType,
  onChange?: CodeRunnerEditorOnChangeType,
  language: ProgrammingLanguage,
  timeLimit: number,
  memoryLimit: number,
  errorData: SubmissionTestCaseType,
  direction: 'row' | 'column',
}

export interface HeaderProps {
  sourceCode: string,
  languages: ProgrammingLanguage[],
  language: ProgrammingLanguage,
  onChange?: CodeRunnerEditorOnChangeType,
  testCases: CodeEditorTestCasesType,
  setShowSettings: Dispatch<SetStateAction<boolean>>,
  setRunId: Dispatch<SetStateAction<string>>,
  centerOptions: (props: { widthContainer: number }) => ReactNode,
  timeLimit: number,
  memoryLimit: number,
  setErrorData: Dispatch<SetStateAction<SubmissionTestCaseType>>,
  expanded: boolean | null,
  setExpanded: Dispatch<SetStateAction<boolean>>,
}

export interface LogInfoProps {
  testCase: SubmissionTestCaseType,
  timeLimit: number,
  memoryLimit: number,
}
