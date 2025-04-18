import { SEPARATOR_TOKEN } from '@juki-team/commons';
import { Href, QueryParamKey, RequestFilterType, RequestSortType } from '../types';

export const cloneURLSearchParams = (urlSearchParams: URLSearchParams) => {
  return new URLSearchParams(urlSearchParams.toString());
};

export const toFilterUrl = (filter: RequestFilterType) => {
  let filterUrl = '';
  Object.entries(filter).forEach(([ key, value ]) => {
    if (value) {
      if (filterUrl) {
        filterUrl += '&';
      }
      filterUrl += `${key}=${encodeURIComponent(value.toString())}`;
    }
  });
  return filterUrl;
};

export const toSortUrl = (sort: RequestSortType) => {
  let filterUrl = '';
  Object.entries(sort).forEach(([ key, value ]) => {
    if (filterUrl && (value === -1 || value === 1)) {
      filterUrl += SEPARATOR_TOKEN;
    }
    if (value === -1) {
      filterUrl += encodeURIComponent(`-${key}`);
    }
    if (value === 1) {
      filterUrl += encodeURIComponent(`+${key}`);
    }
  });
  return filterUrl ? 'sort=' + filterUrl : '';
};

export const getHref = (href: Href) => {
  if (typeof href === 'string') {
    return href;
  }
  const search = href.searchParams?.toString() || '';
  return `${href.pathname}${search ? '?' + search : ''}`;
};

export const persistGlobalURLSearchParams = (searchParams: URLSearchParams) => {
  const newSp = cloneURLSearchParams(searchParams);
  let sp = new URLSearchParams();
  if (typeof window !== 'undefined') {
    sp = new URLSearchParams(window.location.search);
  }
  const token = sp.get(QueryParamKey.TOKEN);
  if (token) {
    newSp.set(QueryParamKey.TOKEN, token);
  }
  const company = sp.get(QueryParamKey.COMPANY);
  if (company) {
    newSp.set(QueryParamKey.COMPANY, company);
  }
  return newSp.toString();
};
