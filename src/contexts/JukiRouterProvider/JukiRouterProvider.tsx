import { type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import type {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  Href,
  JukiRouterProviderProps,
  RouterContextInterface,
  RouterFn,
  SetSearchParamsType,
} from '../../components/types';
import { QueryParamKey } from '../../enums';
import { getHref } from '../../helpers';
import { cloneURLSearchParams } from '../../settings';
import { useRouterStore } from '../../stores/router/useRouterStore';

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
  
  const appendSearchParams: AppendSearchParamsType = useCallback((entries) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    for (const { name, value } of (Array.isArray(entries) ? entries : [ entries ])) {
      newSearchParams.append(name, value);
    }
    updateSearchParams(newSearchParams);
  }, [ _searchParams, updateSearchParams ]);
  
  const deleteSearchParams: DeleteSearchParamsType = useCallback((entries) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    for (const { name, value } of (Array.isArray(entries) ? entries : [ entries ])) {
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
  
  const setSearchParams: SetSearchParamsType = useCallback((entries) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    for (const { name, value } of (Array.isArray(entries) ? entries : [ entries ])) {
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
  
  const _push = useCallback(async (href: Href) => {
    setLoaderCounter(prevState => prevState + 1);
    const result = await pushRoute(getHref(href).path);
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ pushRoute ]);
  
  const replace = useCallback(async (href: Href) => {
    setLoaderCounter(prevState => prevState + 1);
    const result = await replaceRoute(getHref(href).path);
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ replaceRoute ]);
  
  const reload = useCallback(async () => {
    setLoaderCounter(prevState => prevState + 1);
    const result = await reloadRoute();
    setLoaderCounter(prevState => prevState - 1);
    return result;
  }, [ reloadRoute ]);
  
  const push: RouterFn<Href> = useCallback((url) => {
    let sp;
    let pathname;
    if (typeof url === 'string') {
      const [ p = '', s ] = url.split('?');
      pathname = p;
      sp = new URLSearchParams(s);
    } else {
      pathname = url.pathname ?? '';
      sp = cloneURLSearchParams(url.searchParams ?? new URLSearchParams());
    }
    // @ts-ignore
    const token = (router.searchParams ?? _searchParams).get(QueryParamKey.TOKEN);
    if (token) {
      sp.set(QueryParamKey.TOKEN, token);
    }
    // @ts-ignore
    const company = (router.searchParams ?? _searchParams).get(QueryParamKey.COMPANY);
    if (company) {
      sp.set(QueryParamKey.COMPANY, company);
    }
    void _push({ pathname, searchParams: sp });
    // @ts-ignore
  }, [ router.searchParams, _searchParams, _push ]);
  
  const replaceProps = useRouterStore(state => state.replaceProps);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      replaceProps({ origin: window.location.origin });
    }
  }, [ replaceProps ]);
  
  useEffect(() => {
    replaceProps(
      Object.values(router).filter(Boolean).length ? router as RouterContextInterface : {
        searchParams: _searchParams,
        appendSearchParams,
        deleteSearchParams,
        setSearchParams,
      });
  }, [ _searchParams, appendSearchParams, deleteSearchParams, replaceProps, router, setSearchParams ]);
  
  useEffect(() => {
    replaceProps({ routeParams });
  }, [ replaceProps, routeParams ]);
  
  useEffect(() => {
    replaceProps({ pathname });
  }, [ replaceProps, pathname ]);
  
  useEffect(() => {
    replaceProps({ pushRoute: push, replaceRoute: replace, reloadRoute: reload });
  }, [ push, reload, replace, replaceProps ]);
  
  useEffect(() => {
    replaceProps({ routeParams });
  }, [ replaceProps, routeParams ]);
  
  useEffect(() => {
    replaceProps({ isLoadingRoute: isLoadingRoute || !!loaderCounter });
  }, [ isLoadingRoute, loaderCounter, replaceProps, routeParams ]);
  
  return children;
};
