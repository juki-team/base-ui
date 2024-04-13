import { DAY_NAMES } from '@juki-team/commons';

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

export * from './sounds';
