import {
  DataViewMode,
  DAY_NAMES,
  EMPTY_USER_PERMISSIONS,
  Language,
  MenuViewMode,
  ProfileSetting,
  Theme,
  UserPingType,
} from '@juki-team/commons';
import { useResizeDetectorProps } from 'react-resize-detector';
import { QueryParamKey } from '../types';

export const DAYS_2 = DAY_NAMES.map(name => name.substring(0, 2));

export const SCROLL_WIDTH = 8;

export const ALPHANUMERIC_REGEX = /^[a-z0-9]+$/i;

export const ALPHANUMERIC_DASH_UNDERSCORE_REGEX = /^[a-z0-9\-_]+$/i;

export const LEAST_ONE_UPPERCASE_LOWERCASE_NUMBER_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?"()-_]{8,}$/;

export const EMPTY_COMPANY = {
  name: '',
  imageUrl: '',
  contactEmail: 'contact@juki.app',
  contactCellPhoneNumber: '+519 79153358',
  contactTelegram: 'https://t.me/OscarGauss',
  key: '',
};


export const RESIZE_DETECTOR_PROPS: useResizeDetectorProps<any> = { refreshRate: 200, refreshMode: 'debounce' };

export const EMPTY_USER: UserPingType = {
  nickname: '',
  imageUrl: 'https://images.juki.pub/c/juki-image-profile.svg',
  settings: {
    [ProfileSetting.LANGUAGE]: Language.ES,
    [ProfileSetting.THEME]: Theme.LIGHT,
    [ProfileSetting.DATA_VIEW_MODE]: DataViewMode.ROWS,
    [ProfileSetting.MENU_VIEW_MODE]: MenuViewMode.VERTICAL,
    [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: true,
  },
  permissions: { ...EMPTY_USER_PERMISSIONS },
  isLogged: false,
  sessionId: '',
};

export const PAGE_SIZE_OPTIONS = [ 25, 50, 100 ];

export const DEFAULT_DATA_VIEWER_PROPS = {
  getPageQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.PAGE_TABLE,
  getPageSizeQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.PAGE_SIZE_TABLE,
  getSortQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.SORT_TABLE,
  getFilterQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.FILTER_TABLE,
  getViewModeQueryParam: (name: string) => (name ? name + '.' : name) + QueryParamKey.VIEW_MODE_TABLE,
};
