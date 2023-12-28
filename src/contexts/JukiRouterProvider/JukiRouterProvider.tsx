import React, { PropsWithChildren, useCallback, useState } from 'react';
import { cloneURLSearchParams } from '../../helpers';
import { RouterContext } from './context';
import {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  Href,
  JukiRouterProviderProps,
  RouterContextInterface,
  SetSearchParamsType,
} from './types';

const getHref = (href: Href) => {
  if (typeof href === 'string') {
    return href;
  }
  const search = href.searchParams?.toString() || '';
  return `${href.pathname}${search ? '?' + search : ''}`;
}

export const JukiRouterProvider = (props: PropsWithChildren<JukiRouterProviderProps>) => {
  
  const { children, routeParams, pushRoute, replaceRoute, reloadRoute, pathname, isLoadingRoute, ...router } = props;
  
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
    const result = await pushRoute(getHref(href));
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ pushRoute ]);
  
  const replace = useCallback(async (href: Href) => {
    setLoaderCounter(prevState => prevState + 1);
    const result = await replaceRoute(getHref(href));
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ replaceRoute ]);
  
  const reload = useCallback(async () => {
    setLoaderCounter(prevState => prevState + 1);
    const result = await reloadRoute();
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ reloadRoute ]);
  
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
          routeParams,
          pushRoute: push,
          replaceRoute: replace,
          reloadRoute: reload,
          isLoadingRoute: isLoadingRoute || !!loaderCounter,
          pathname,
        }
      }
    >
      {children}
    </RouterContext.Provider>
  );
};
