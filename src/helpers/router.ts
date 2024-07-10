import { RequestFilterType, RequestSortType } from '../types';

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
      filterUrl += ',';
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
