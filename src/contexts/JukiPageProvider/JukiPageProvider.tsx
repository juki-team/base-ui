import React, { PropsWithChildren } from 'react';
import { PageContext } from './context';
import { useOnline } from './useOnline';
import { usePageFocus } from './usePageFocus';
import { usePageVisibility } from './usePageVisibility';

export const JukiPageProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const isOnline = useOnline();
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  
  return (
    <PageContext.Provider
      value={{
        isOnline,
        isPageVisible,
        isPageFocus,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
