import { validate } from 'uuid';
import { jukiSettings } from '../config';
import { QueryParamKey } from '../types';

export const getLocalToken = () => {
  return getQueryToken() || localStorage.getItem(jukiSettings.TOKEN_NAME) || '';
}

export const getQueryToken = () => {
  let queryToken = '';
  if (typeof window !== 'undefined') {
    queryToken = (new URLSearchParams(window.location.search)).get(QueryParamKey.TOKEN) ?? '';
  }
  return validate(queryToken) ? queryToken : null;
}

export const isQueryToken = () => {
  return typeof getQueryToken() === 'string';
}
