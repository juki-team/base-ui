import React, { createContext, PropsWithChildren } from 'react';
import { useOnline, usePageFocus, usePageVisibility, useViewPortSize } from '../../hooks';
import { NotificationProvider } from '../Notifications';

export type ViewPortSizeType = 'hg' | 'lg' | 'md' | 'sm';

export const UIContext = createContext<{ isOnline: boolean, isPageVisible: boolean, isPageFocus: boolean, viewPortSize: ViewPortSizeType }>({
  isOnline: true,
  isPageVisible: true,
  isPageFocus: true,
  viewPortSize: 'sm',
});

export const JukiUIProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  const isOnline = useOnline();
  const viewPortSize = useViewPortSize();
  
  return (
    <UIContext.Provider value={{ isOnline, isPageVisible, isPageFocus, viewPortSize }}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </UIContext.Provider>
  );
};
