import { jukiSettings } from '../config';
import { QueryParamKey } from '../types';

export const getLocalToken = () => {
  return getQueryToken() || localStorage.getItem(jukiSettings.TOKEN_NAME) || '';
}

// const UUID_WITHOUT_DASHES = /^[0-9A-F]{32}$/i;
// const UUID_WITH_DASHES = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

const validate = (representation: string) => {
  return representation.length === 24 && checkForHexRegExp.test(representation)
  // return UUID_WITHOUT_DASHES.test(representation) || UUID_WITH_DASHES.test(representation)
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
