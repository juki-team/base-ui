import { CodeEditorTestCasesType, ProgrammingLanguage, SubmissionTestCaseType } from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { CodeEditorPropertiesType } from '../CodeEditor';

export type CodeRunnerEditorPropertiesType = CodeEditorPropertiesType & { testCases?: CodeEditorTestCasesType };

export type CodeRunnerEditorOnChangeType = (props: CodeRunnerEditorPropertiesType) => void;

export type CodeEditorMiddleButtonsType = (props: Omit<CodeRunnerEditorProps, 'onChange' | 'className' | 'middleButtons'> & { widthContainer: number }) => ReactNode;

export type CodeEditorExpandPositionType = {
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
  middleButtons?: CodeEditorMiddleButtonsType,
  testCases?: CodeEditorTestCasesType,
  timeLimit?: number,
  memoryLimit?: number,
  expandPosition?: CodeEditorExpandPositionType,
}

export interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void,
  onChange?: CodeRunnerEditorOnChangeType,
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
