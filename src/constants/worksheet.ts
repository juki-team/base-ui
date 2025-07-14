import {
  CodeEditorSheetType,
  GraphSheetType,
  JkmdSheetType,
  ListSheetType,
  QuizOptionsSheetType,
  QuizProblemSheetType,
  QuizScoringMode,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  SourceCodeType,
  WorksheetType,
} from '@juki-team/commons';
import { v4 } from 'uuid';

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
  scoringMode: QuizScoringMode.TOTAL,
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

export const DEFAULT_GRAPH = `digraph graph_name {
  bgcolor="transparent"
  a -> b;
  b -> c;
  a -> d;
  d -> c;
  a -> c;
}`;
