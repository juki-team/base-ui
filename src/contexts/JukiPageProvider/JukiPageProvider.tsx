import { PropsWithChildren } from 'react';
import { useOnline } from './useOnline';
import { usePageFocus } from './usePageFocus';
import { usePageVisibility } from './usePageVisibility';

export const JukiPageProvider = ({ children }: PropsWithChildren<{}>) => {
  
  useOnline();
  usePageVisibility();
  usePageFocus();
  
  return children;
};
