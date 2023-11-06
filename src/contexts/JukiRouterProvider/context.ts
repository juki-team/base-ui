import { createContext } from 'react';
import { UIRouterContextInterface } from './types';

export const RouterContext = createContext<UIRouterContextInterface>({
  searchParams: new URLSearchParams(''),
  appendSearchParams: () => null,
  deleteSearchParams: () => null,
  setSearchParams: () => null,
});
