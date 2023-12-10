export enum QueryParamKey {
  USER_PREVIEW = 'user_preview',
  WELCOME = 'welcome',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
}

export type RequestSortType = { [key: string]: 1 | -1 };

export type RequestFilterType = { [key: string]: string | string[] };
