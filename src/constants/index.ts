import {
  CodeLanguage,
  CompanyPingType,
  DataViewMode,
  DAY_NAMES,
  EMPTY_USER_PERMISSIONS,
  Language,
  MenuViewMode,
  ObjectIdType,
  ProfileSetting,
  Theme,
} from '@juki-team/commons';
import { useResizeDetectorProps } from 'react-resize-detector';
import { UserDataType } from '../contexts/JukiUserProvider';
import { CodeEditorKeyMap, CodeEditorTheme, QueryParamKey } from '../types';

export const DAYS_2 = DAY_NAMES.map(name => name.substring(0, 2));

export const SCROLL_WIDTH = 8;

export const EMPTY_ARRAY = [];

export const ALPHANUMERIC_REGEX = /^[a-z0-9]+$/i;

export const ALPHANUMERIC_DASH_UNDERSCORE_REGEX = /^[a-z0-9\-_]+$/i;

export const LEAST_ONE_UPPERCASE_LOWERCASE_NUMBER_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?"()-_]{8,}$/;

export const EMPTY_COMPANY: CompanyPingType = {
  name: '',
  imageUrl: '',
  contactEmail: 'contact@juki.app',
  contactCellPhoneNumber: '+519 79153358',
  contactTelegram: 'https://t.me/OscarGauss',
  key: '',
  codeEditorRunEnabled: true,
};

export const RESIZE_DETECTOR_PROPS: useResizeDetectorProps<any> = { refreshRate: 200, refreshMode: 'debounce' };

export const DEFAULT_TIME_ZONE = 'America/La_Paz';

export const EMPTY_USER: UserDataType = {
  nickname: '',
  imageUrl: 'https://images.juki.pub/c/juki-image-profile.svg',
  settings: {
    [ProfileSetting.LANGUAGE]: Language.ES,
    [ProfileSetting.THEME]: Theme.LIGHT,
    [ProfileSetting.DATA_VIEW_MODE]: DataViewMode.ROWS,
    [ProfileSetting.MENU_VIEW_MODE]: MenuViewMode.VERTICAL,
    [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: true,
    [ProfileSetting.TIME_ZONE]: DEFAULT_TIME_ZONE,
    [ProfileSetting.FONT_SIZE]: 16,
  },
  permissions: { ...EMPTY_USER_PERMISSIONS },
  isLogged: false,
  sessionId: '' as ObjectIdType,
};

export const PAGE_SIZE_OPTIONS = [ 25, 50, 100 ];

export const DEFAULT_DATA_VIEWER_PROPS = {
  getPageQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.PAGE_TABLE,
  getPageSizeQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.PAGE_SIZE_TABLE,
  getSortQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.SORT_TABLE,
  getFilterQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.FILTER_TABLE,
  getViewModeQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.VIEW_MODE_TABLE,
  getShowFilterDrawerQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.SHOW_FILTER_DRAWER,
  getVisiblesQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.VISIBLES,
};

export const CODE_EDITOR_THEMES = Object.values(CodeEditorTheme);
export const CODE_EDITOR_KEY_MAPS = Object.values(CodeEditorKeyMap);
export const CODE_EDIT0R_TAB_SIZES = [ 1, 2, 3, 4, 8 ];
export const CODE_EDIT0R_FONT_SIZES = [ 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 30, 32, 34, 36, 38, 40, 42 ];

export const CODE_EDITOR_PROGRAMMING_LANGUAGES = Object.values(CodeLanguage);

export * from './worksheet';
