import { PropsWithChildren } from 'react';
import { useMouseInsidePage } from './useMouseInsidePage';
import { useOnline } from './useOnline';
import { usePageFocus } from './usePageFocus';
import { usePageVisibility } from './usePageVisibility';

export const JukiPageProvider = ({ children }: PropsWithChildren<{}>) => {
  
  useOnline();
  usePageVisibility();
  usePageFocus();
  useMouseInsidePage();
  
  return children;
};
