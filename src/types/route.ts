export enum QueryParamKey {
  TOKEN = 'TOKEN',
  COMPANY = 'COMPANY',
  USER_PREVIEW = 'user_preview',
  WELCOME = 'welcome',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  SUBMISSION = 'submission',
  PAGE_FOCUS = 'focus',
  // Worksheet / Class
  SESSION = 'session',
  ASSIGNMENT = 'assignment',
  // table queries
  PAGE_TABLE = 'p',
  PAGE_SIZE_TABLE = 'z',
  SORT_TABLE = 's',
  FILTER_TABLE = 'f',
  VIEW_MODE_TABLE = 'v',
  SHOW_FILTER_DRAWER = 'd',
  VISIBLES = 'b',
  // users table
  LOGGED_USERS_TABLE = 'lut',
  PROFILE_SUBMISSIONS_TABLE = 'pst',
}

export type RequestSortType = { [key: string]: 1 | -1 };

export type RequestFilterType = { [key: string]: string };

export enum ProblemTab {
  STATEMENT = 'statement',
  EDITOR = 'editor',
  MY_SUBMISSIONS = 'my-submissions',
  SUBMISSIONS = 'submissions',
  TESTS = 'tests',
  // RANKING = 'ranking',
  STATISTICS = 'statistics',
  SETUP = 'setup',
  EDITORIAL = 'editorial',
  ACCESS = 'access',
  DELETE = 'delete',
}

export enum ContestTab {
  OVERVIEW = 'overview',
  PROBLEMS = 'problems',
  SCOREBOARD = 'scoreboard',
  DYNAMIC_SCOREBOARD = 'dynamic-scoreboard',
  MY_SUBMISSIONS = 'my-submissions',
  CLARIFICATIONS = 'clarifications',
  SUBMISSIONS = 'submissions',
  SETUP = 'setup',
  // JUDGE = 'judge',
  MEMBERS = 'members',
  DELETE = 'delete',
}

export enum ProfileTab {
  OVERVIEW = 'overview',
  SETTINGS = 'settings',
  SUBMISSIONS = 'submissions',
  MY_SESSIONS = 'my-sessions',
}

export enum WorksheetTab {
  CONTENT = 'content',
  SETUP = 'setup',
  DELETE = 'delete',
}
