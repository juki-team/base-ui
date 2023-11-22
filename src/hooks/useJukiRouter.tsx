import { useContext } from 'react';
import { RouterContext } from '../contexts/JukiRouterProvider/context';

export const useJukiRouter = () => {
  
  const {
    searchParams,
    appendSearchParams,
    deleteSearchParams,
    setSearchParams,
    routeParams,
    routerPush,
    routerReplace,
    routeIsLoading,
    pathname,
  } = useContext(RouterContext);
  
  return {
    searchParams,
    appendSearchParams,
    deleteSearchParams,
    setSearchParams,
    routeParams,
    routerPush,
    routerReplace,
    routeIsLoading,
    pathname,
  };
};
