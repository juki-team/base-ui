import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { useOnline, usePageFocus, usePageVisibility, useViewPortSize } from '../../hooks';
import { NotificationProvider } from '../../components/organisms/Notifications';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { AppendSearchParamsType, DeleteSearchParamsType, JukiUIProviderProps, SetSearchParamsType } from './types';

const cloneURLSearchParams = (urlSearchParams: URLSearchParams) => {
  return new URLSearchParams(urlSearchParams.toString());
};

export const JukiUIProvider = ({ children, components, router }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  const isOnline = useOnline();
  const viewPortSize = useViewPortSize();
  
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
  
  const { Image: ImageCmp = Image, Link: LinkCmp = Link } = components || { Image, Link };
  
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
  const ref = useRef(null);
  
  return (
    <UIContext.Provider
      value={{
        ref,
        isOnline,
        isPageVisible,
        isPageFocus,
        viewPortSize,
        components: { Image: ImageCmp, Link: LinkCmp },
        router: router || {
          searchParams: _searchParams,
          appendSearchParams,
          deleteSearchParams,
          setSearchParams,
        },
      }}
    >
      <NotificationProvider>
        <div className="jk-app" ref={ref}>
          {children}
        </div>
      </NotificationProvider>
    </UIContext.Provider>
  );
};
