import { jukiSettings } from '../config';
import { QueryParamKey } from '../types';

export const getLocalToken = () => {
  let queryToken = '';
  if (typeof window !== 'undefined') {
    queryToken = (new URLSearchParams(window.location.search)).get(QueryParamKey.TOKEN) ?? '';
  }
  return queryToken ?? (localStorage.getItem(jukiSettings.TOKEN_NAME) || '');
}

export const isQueryToken = () => {
  let queryToken = '';
  if (typeof window !== 'undefined') {
    queryToken = (new URLSearchParams(window.location.search)).get(QueryParamKey.TOKEN) ?? '';
  }
  return queryToken === getLocalToken();
}
