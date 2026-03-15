import { CodeEditorFiles, CodeEditorTestCases, SubmissionRunStatus, SubmissionTestCase } from '@juki-team/commons';
import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { UseResizeDetectorReturn } from 'react-resize-detector';
import { BasicModalProps } from '../../../../atoms/Modal/types';
import { CodeEditorPropertiesType } from '../../../../molecules/types';
import { MdMathEditorHandle } from '../../MdMathEditor/types';
import { MermaidTheme } from './MermaidViewer/types';

export type RunState = { id: string; running: boolean };

export type CodeRunnerEditorPropertiesType<T> = CodeEditorPropertiesType<T> & {
  onTestCasesChange?: (testCases: CodeEditorTestCases) => CodeEditorTestCases;
  codeRunStatus?: SubmissionRunStatus;
  fileName?: string;
  newFileName?: true;
  fileNameEdited?: [string, string];
  fileNameDeleted?: string;
};

export type CodeRunnerEditorOnChangeType<T> = (props: CodeRunnerEditorPropertiesType<T>) => void;

export type CodeEditorCenterButtonsPropertiesType<T> = {
  widthContainer: number;
  runner: Runner | undefined;
  withLabels: boolean;
  files: CodeEditorFiles<T>;
  currentFileName: string;
};

export type CodeEditorButtonsType<T> = (props: CodeEditorCenterButtonsPropertiesType<T>) => ReactNode;

export type CodeEditorExpandPositionType = {
  top: string | number;
  left: string | number;
  width: string | number;
  height: string | number;
};

export interface Runner {
  testCases: CodeEditorTestCases;
  timeLimit: number;
  memoryLimit: number;
  id: string;
  isRunning: boolean;
  enableAddSampleCases: boolean;
  enableAddCustomSampleCases: boolean;
}

export type RenderSecondPaneContext<T> = {
  language: T;
  files: CodeEditorFiles<T>;
  currentFileName: string;
  readOnly: boolean;
  ui: {
    direction: 'row' | 'column';
  };
  runner: Runner;
};

export interface CodeRunnerEditorProps<T> extends Omit<CodeEditorPropertiesType<T>, 'sourceCode' | 'language'> {
  triggerFocus?: number;
  files: CodeEditorFiles<T>;
  currentFileName: string;
  readOnly?: boolean;
  onChange?: CodeRunnerEditorOnChangeType<T>;
  className?: string;
  testCases?: CodeEditorTestCases;
  timeLimit?: number;
  memoryLimit?: number;
  expandPosition?: CodeEditorExpandPositionType;
  enableAddSampleCases?: boolean;
  enableAddCustomSampleCases?: boolean;
  onlyCodeEditor?: boolean;
  mdEditorRef?: RefObject<MdMathEditorHandle | null>;
  withoutRunCodeButton?: boolean;
  mermaidTheme?: MermaidTheme;
  mermaidConfigJson?: string;
  mermaidFileName?: string;
  //
  languages?: { value: T; label: ReactNode }[];
  leftButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode;
  centerButtons?: CodeEditorButtonsType<T>;
  rightButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode;
}

export interface SettingsModalProps<T> extends BasicModalProps {
  onChange?: CodeRunnerEditorOnChangeType<T>;
  tabSize: number;
  fontSize: number;
}

export interface TestCasesProps<T> {
  testCases?: CodeEditorTestCases;
  onChangeRef?: RefObject<CodeRunnerEditorOnChangeType<T> | undefined>;
  timeLimit: number;
  memoryLimit: number;
  direction: 'row' | 'column';
  enableAddSampleCases: boolean;
  enableAddCustomSampleCases: boolean;
}

export interface HeaderProps<T> {
  languages: { value: T; label: ReactNode }[];
  onChangeRef: RefObject<CodeRunnerEditorOnChangeType<T> | undefined>;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
  onRunStart: (id: string) => void;
  leftOptions: (props: { withLabels: boolean }) => ReactNode;
  centerOptions: (props: { widthContainer: number; withLabels: boolean }) => ReactNode;
  rightOptions: (props: { withLabels: boolean }) => ReactNode;
  expanded: boolean | null;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  readOnly: boolean;
  headerRef: UseResizeDetectorReturn<any>['ref'];
  headerWidthContainer: number;
  files: CodeEditorFiles<T>;
  currentFileName: string;
  runner: Runner;
  setRunState: Dispatch<SetStateAction<RunState>>;
  withoutRunCodeButton?: boolean;
}

export interface LogInfoProps {
  testCase: SubmissionTestCase;
  timeLimit: number;
  memoryLimit: number;
}
