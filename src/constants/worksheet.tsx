import {
  CodeEditorSheetType,
  GraphSheetType,
  JkmdSheetType,
  Judge,
  ListSheetType,
  ProblemScoringMode,
  QuizOptionsSheetType,
  QuizProblemSheetType,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  SourceCodeType,
  WorksheetType,
} from '@juki-team/commons';
import React, { ReactNode } from 'react';
import { v4 } from 'uuid';
import { ArticleIcon, BubbleChartIcon, CodeIcon, EventListIcon, ExtensionIcon } from '../components/atoms/server';
import { BasicIconProps } from '../components/atoms/server/icons/types';

export const WORKSHEET_CODE_EDITOR_MIN_HEIGHT = 320;

export const EMPTY_JK_MD_SHEET = (): JkmdSheetType => ({
  id: v4(),
  type: WorksheetType.JK_MD,
  title: '',
  points: 0,
  content: '',
});

export const EMPTY_CODE_EDITOR_SHEET = (): CodeEditorSheetType => ({
  id: v4(),
  type: WorksheetType.CODE_EDITOR,
  title: '',
  points: 0,
  sourceCode: {} as SourceCodeType,
  testCases: {},
  languages: RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  height: 0,
});

export const EMPTY_GRAPH_SHEET = (): GraphSheetType => ({
  id: v4(),
  type: WorksheetType.GRAPH,
  title: '',
  points: 0,
  dots: [ DEFAULT_GRAPH ],
});

export const EMPTY_QUIZ_PROBLEM_SHEET = (): QuizProblemSheetType => ({
  id: v4(),
  type: WorksheetType.QUIZ_PROBLEM,
  title: '',
  points: 0,
  problemJudge: Judge.JUKI_JUDGE,
  problemKey: '',
  height: 0,
  languages: RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
});

export const EMPTY_QUIZ_OPTIONS_SHEET = (): QuizOptionsSheetType => ({
  id: v4(),
  type: WorksheetType.QUIZ_OPTIONS,
  title: '',
  points: 0,
  description: '',
  options: [],
  multiple: false,
  scoringMode: ProblemScoringMode.TOTAL,
});

export const EMPTY_LIST_SHEET = (): ListSheetType => ({
  id: v4(),
  type: WorksheetType.LIST,
  title: '',
  points: 0,
  header: '# header of list',
  content: [ { id: v4(), type: WorksheetType.JK_MD, title: '', points: 0, content: 'First content of list' } ],
  children: [],
});

export const LOGO_WORKSHEET_TYPE: (size?: BasicIconProps['size']) => {
  [key in WorksheetType]: {
    icon: ReactNode,
    label: string
  }
} = (size) => ({
  [WorksheetType.JK_MD]: { icon: <ArticleIcon size={size} />, label: 'jk md' },
  [WorksheetType.QUIZ_PROBLEM]: { icon: <ExtensionIcon size={size} />, label: 'quiz problem' },
  [WorksheetType.QUIZ_TEXT]: { icon: <ExtensionIcon size={size} />, label: 'quiz text' },
  [WorksheetType.QUIZ_OPTIONS]: { icon: <EventListIcon size={size} rotate={180} />, label: 'quiz options' },
  [WorksheetType.NEW_PAGE]: { icon: <ExtensionIcon size={size} />, label: 'new page' },
  [WorksheetType.CODE_EDITOR]: { icon: <CodeIcon size={size} />, label: 'code editor' },
  [WorksheetType.GRAPH]: { icon: <BubbleChartIcon size={size} />, label: 'graph' },
  [WorksheetType.LIST]: { icon: <ExtensionIcon size={size} />, label: 'list' },
});

export const DEFAULT_GRAPH = `digraph graph_name {
  bgcolor="transparent"
  a -> b;
  b -> c;
  a -> d;
  d -> c;
  a -> c;
}`;
