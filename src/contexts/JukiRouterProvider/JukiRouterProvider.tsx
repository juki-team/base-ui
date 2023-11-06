import React, { PropsWithChildren, useCallback, useState } from 'react';
import { RouterContext } from './context';
import {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  JukiRouterProviderProps,
  RouterContextInterface,
  SetSearchParamsType,
} from './types';

const cloneURLSearchParams = (urlSearchParams: URLSearchParams) => {
  return new URLSearchParams(urlSearchParams.toString());
};

export const JukiRouterProvider = ({ children, ...router }: PropsWithChildren<JukiRouterProviderProps>) => {
  
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
  
  return (
    <RouterContext.Provider
      value={
        Object.keys(router).length ? router as RouterContextInterface : {
          searchParams: _searchParams,
          appendSearchParams,
          deleteSearchParams,
          setSearchParams,
        }
      }
    >
      {children}
    </RouterContext.Provider>
  );
};
