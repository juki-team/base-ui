import { useContext } from 'react';
import { RouterContext } from '../contexts/JukiRouterProvider/context';

export const useJukiRouter = () => {
  
  const {
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
  } = useContext(RouterContext);
  
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
