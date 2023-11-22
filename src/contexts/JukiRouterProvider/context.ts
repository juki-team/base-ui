import { createContext } from 'react';
import { RouterContextInterface } from './types';

export const RouterContext = createContext<RouterContextInterface>({
  searchParams: new URLSearchParams(''),
  appendSearchParams: () => null,
  deleteSearchParams: () => null,
  setSearchParams: () => null,
  routeParams: {},
  routerPush: () => null,
  routerReplace: () => null,
  routeIsLoading: false,
});
