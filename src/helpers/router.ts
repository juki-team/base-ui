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
  
  let pathname;
  let searchParams;
  if (typeof href === 'string') {
    const [ p, s ] = href.split('?');
    pathname = p || '';
    searchParams = new URLSearchParams(s || '');
  } else {
    pathname = href?.pathname || '';
    searchParams = href?.searchParams || new URLSearchParams();
  }
  
  const search = searchParams.toString();
  
  return {
    pathname,
    searchParams,
    path: `${pathname}${search ? '?' + search : ''}`,
  };
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
  const submission = sp.get(QueryParamKey.SUBMISSION);
  if (submission) {
    newSp.set(QueryParamKey.SUBMISSION, submission);
  }
  const signIn = sp.get(QueryParamKey.SIGN_IN);
  if (signIn) {
    newSp.set(QueryParamKey.SIGN_IN, signIn);
  }
  const signUp = sp.get(QueryParamKey.SIGN_UP);
  if (signUp) {
    newSp.set(QueryParamKey.SIGN_UP, signUp);
  }
  return newSp.toString();
};
