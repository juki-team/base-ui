import React, { PropsWithChildren, useMemo } from 'react';
import { PageContext } from './context';
import { useOnline } from './useOnline';
import { usePageFocus } from './usePageFocus';
import { usePageVisibility } from './usePageVisibility';

export const JukiPageProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const isOnline = useOnline();
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  
  const value = useMemo(() => ({
    isOnline,
    isPageVisible,
    isPageFocus,
  }), [ isOnline, isPageVisible, isPageFocus ]);
  
  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};
