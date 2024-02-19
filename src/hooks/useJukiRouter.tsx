import { useCallback, useContext } from 'react';
import { Href, RouterFn } from '../contexts';
import { RouterContext } from '../contexts/JukiRouterProvider/context';
import { cloneURLSearchParams } from '../helpers';
import { QueryParamKey } from '../types';

export const useJukiRouter = () => {
  
  const {
    searchParams,
    appendSearchParams,
    deleteSearchParams,
    setSearchParams,
    routeParams,
    pushRoute: _pushRoute,
    replaceRoute,
    reloadRoute,
    isLoadingRoute,
    pathname,
  } = useContext(RouterContext);
  
  const pushRoute: RouterFn<Href> = useCallback((url) => {
    const token = searchParams.get(QueryParamKey.TOKEN);
    const company = searchParams.get(QueryParamKey.COMPANY);
    let sp;
    let pathname;
    if (typeof url === 'string') {
      const [ p, s ] = url.split('?');
      pathname = p;
      sp = new URLSearchParams(s);
    } else {
      pathname = url.pathname;
      sp = cloneURLSearchParams(url.searchParams ?? new URLSearchParams());
    }
    if (token) {
      sp.set(QueryParamKey.TOKEN, token);
    }
    if (company) {
      sp.set(QueryParamKey.COMPANY, company);
    }
    _pushRoute({ pathname, searchParams: sp })
    
  }, [ searchParams, _pushRoute ])
  
  return {
    searchParams,
    appendSearchParams,
    deleteSearchParams,
    setSearchParams,
    routeParams,
    pushRoute,
    replaceRoute,
    reloadRoute,
    isLoadingRoute,
    pathname,
  };
};
