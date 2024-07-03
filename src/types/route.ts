export enum QueryParamKey {
  TOKEN = 'TOKEN',
  COMPANY = 'COMPANY',
  USER_PREVIEW = 'user_preview',
  WELCOME = 'welcome',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  // table queries
  PAGE_TABLE = 'p',
  PAGE_SIZE_TABLE = 'z',
  SORT_TABLE = 's',
  FILTER_TABLE = 'f',
  VIEW_MODE_TABLE = 'v',
}

export type RequestSortType = { [key: string]: 1 | -1 };

export type RequestFilterType = { [key: string]: string | string[] };
