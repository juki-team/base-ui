import { CodeEditorTestCasesType, SubmissionRunStatus } from '@juki-team/commons';
import { ReactNode } from 'react';
import {
  CodeEditorCenterButtonsPropertiesType,
  CodeEditorCenterButtonsType,
  CodeEditorExpandPositionType,
} from '../CodeRunnerEditor/types';

export interface UserCodeEditorProps<T> {
  className?: string,
  expandPosition?: CodeEditorExpandPositionType,
  initialTestCases?: CodeEditorTestCasesType,
  initialLanguage?: T,
  storeKey: string,
  languages: { value: T, label: string }[],
  leftButtons?: CodeEditorCenterButtonsType<T>,
  centerButtons?: CodeEditorCenterButtonsType<T>,
  rightButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode,
  onSourceChange?: (source: string) => void,
  onLanguageChange?: (language: T) => void,
  onTestCasesChange?: (testCases: CodeEditorTestCasesType) => void,
  onIsRunningChange?: (isRunning: boolean) => void,
  initialSource?: { [key: string]: string },
  enableAddSampleCases?: boolean,
  enableAddCustomSampleCases?: boolean,
  readOnly?: boolean,
  withoutRunCodeButton?: boolean,
  onCodeRunStatusChange?: (runStatus: SubmissionRunStatus, props: {
    sourceCode: string,
    language: T,
    testCases: CodeEditorTestCasesType
  }) => void,
  onlyCodeEditor?: boolean,
}
