import { createContext } from 'react';
import { PageRouterContextInterface } from './types';

export const PageContext = createContext<PageRouterContextInterface>({
  isOnline: true,
  isPageVisible: true,
  isPageFocus: true,
});
