import { SEPARATOR_TOKEN } from '@juki-team/commons/constants';
import type { Href, RequestFilterType, RequestSortType } from '../types';

export const toFilterUrl = (filter: RequestFilterType) => {
  let filterUrl = '';
  for (const [key, value] of Object.entries(filter)) {
    if (value) {
      if (filterUrl) {
        filterUrl += '&';
      }
      filterUrl += `${key}=${encodeURIComponent(value.toString())}`;
    }
  }
  return filterUrl;
};

export const toSortUrl = (sort: RequestSortType) => {
  let filterUrl = '';
  for (const [key, value] of Object.entries(sort)) {
    if (filterUrl && (value === -1 || value === 1)) {
      filterUrl += SEPARATOR_TOKEN;
    }
    if (value === -1) {
      filterUrl += encodeURIComponent(`-${key}`);
    }
    if (value === 1) {
      filterUrl += encodeURIComponent(`+${key}`);
    }
  }
  return filterUrl ? `sort=${filterUrl}` : '';
};

export const getHref = (href: Href) => {
  let pathname;
  let searchParams;
  if (typeof href === 'string') {
    const [p, s] = href.split('?');
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
    path: `${pathname}${search ? `?${search}` : ''}`,
  };
};
