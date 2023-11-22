import React, { PropsWithChildren, useCallback, useState } from 'react';
import { RouterContext } from './context';
import {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  Href,
  JukiRouterProviderProps,
  RouterContextInterface,
  SetSearchParamsType,
} from './types';

const cloneURLSearchParams = (urlSearchParams: URLSearchParams) => {
  return new URLSearchParams(urlSearchParams.toString());
};

const getHref = (href: Href) => {
  if (typeof href === 'string') {
    return href;
  }
  const search = href.searchParams?.toString() || '';
  return `${href.pathname}${search ? '?' + search : ''}`;
}

export const JukiRouterProvider = (props: PropsWithChildren<JukiRouterProviderProps>) => {
  
  const { children, routeParams, routerPush, routerReplace, ...router } = props;
  
  const [ _searchParams, _setSearchParams ] = useState<URLSearchParams>(new URLSearchParams(''));
  
  const updateSearchParams = useCallback((newSearchParams: URLSearchParams) => {
    const newSearchParamsSorted = cloneURLSearchParams(newSearchParams);
    const searchParamsSorted = cloneURLSearchParams(_searchParams);
    newSearchParams.sort();
    searchParamsSorted.sort();
    if (newSearchParamsSorted.toString() !== searchParamsSorted.toString()) {
      _setSearchParams(newSearchParams);
    }
  }, [ _searchParams ]);
  
  const appendSearchParams: AppendSearchParamsType = useCallback((...props) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    for (const { name, value } of props) {
      newSearchParams.append(name, value);
    }
    updateSearchParams(newSearchParams);
  }, [ _searchParams, updateSearchParams ]);
  
  const deleteSearchParams: DeleteSearchParamsType = useCallback((...props) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    for (const { name, value } of props) {
      const values = newSearchParams.getAll(name);
      newSearchParams.delete(name);
      if (value !== undefined) {
        for (const v of values) {
          if (v !== value) {
            newSearchParams.append(name, v);
          }
        }
      }
    }
    updateSearchParams(newSearchParams);
  }, [ _searchParams, updateSearchParams ]);
  
  const setSearchParams: SetSearchParamsType = useCallback((...props) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    for (const { name, value } of props) {
      newSearchParams.delete(name);
      let values = [];
      if (typeof value === 'string') {
        values.push(value);
      } else {
        values = value;
      }
      for (const value of values) {
        newSearchParams.append(name, value);
      }
    }
    updateSearchParams(newSearchParams);
  }, [ _searchParams, updateSearchParams ]);
  
  const [ loaderCounter, setLoaderCounter ] = useState(0);
  
  const push = useCallback(async (href: Href) => {
    setLoaderCounter(prevState => prevState + 1);
    const result = await routerPush(getHref(href));
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ routerPush ]);
  
  const replace = useCallback(async (href: Href) => {
    setLoaderCounter(prevState => prevState + 1);
    const result = await routerReplace(getHref(href));
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ routerReplace ]);
  
  return (
    <RouterContext.Provider
      value={
        {
          ...(
            Object.values(router).filter(Boolean).length ? router as RouterContextInterface : {
              searchParams: _searchParams,
              appendSearchParams,
              deleteSearchParams,
              setSearchParams,
            }
          ),
          routeParams: routeParams,
          routerPush: push,
          routerReplace: replace,
          routeIsLoading: !!loaderCounter,
        }
      }
    >
      {children}
    </RouterContext.Provider>
  );
};
