import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { usePageFocus, usePageVisibility } from '../../hooks';
import { NotificationProvider } from '../Notifications';

export type ViewPortSizeType = 'hg' | 'lg' | 'md' | 'sm';

export const UIContext = createContext<{ isPageVisible: boolean, isPageFocus: boolean, viewPortSize: ViewPortSizeType }>({
  isPageVisible: true,
  isPageFocus: true,
  viewPortSize: 'sm',
});

export const JukiUIProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  const [viewPortSize, setViewPortSize] = useState<'hg' | 'lg' | 'md' | 'sm'>('sm');
  
  useEffect(() => {
    const listener = () => {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document?.documentElement.style.setProperty('--vh', `${vh}px`);
      const vw = window.innerWidth;
      if (vw >= 1920) {
        setViewPortSize('hg');
      } else if (vw >= 1280) {
        setViewPortSize('lg');
      } else if (vw >= 640) {
        setViewPortSize('md');
      } else {
        setViewPortSize('sm');
      }
    };
    listener();
    window?.addEventListener('resize', listener);
    return () => {
      window?.removeEventListener('resize', listener);
    };
  }, []);
  
  return (
    <UIContext.Provider value={{ isPageVisible, isPageFocus, viewPortSize }}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </UIContext.Provider>
  );
};
