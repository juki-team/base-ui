import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { settings } from '../../config';
import { useInterval, usePageVisibility } from '../../hooks';
import { socket } from '../../services';
import { NotificationProvider } from '../Notifications';
import { JukiBaseUiProviderProps } from './types';

const BaseContext = createContext<{ isPageVisible: boolean, viewPortSize: string }>({
  isPageVisible: true,
  viewPortSize: '',
});

export const JukiBaseUiProvider = ({
  children,
  utilsServiceUrl,
  apiVersion,
  utilsUiUrl,
  tokenName,
}: PropsWithChildren<JukiBaseUiProviderProps>) => {
  useEffect(() => {
    settings.setSetting(utilsServiceUrl, apiVersion, utilsUiUrl, tokenName);
    socket.start().then(() => null);
    socket.joinSession().then(() => null);
  }, [apiVersion, tokenName, utilsServiceUrl, utilsUiUrl]);
  const isPageVisible = usePageVisibility();
  const [viewPortSize, setViewPortSize] = useState('');
  useEffect(() => {
    if (isPageVisible) {
      socket.joinSession().then(() => null);
    }
  }, [isPageVisible]);
  useInterval(() => {
    socket.joinSession().then(() => null);
  }, isPageVisible ? 2 * 60 * 1000 : 0);
  
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
    <BaseContext.Provider value={{ isPageVisible, viewPortSize }}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </BaseContext.Provider>
  );
};

export const useJukiBase = () => {
  
  const { isPageVisible, viewPortSize } = useContext(BaseContext);
  
  return {
    isPageVisible,
    viewPortSize,
  };
};
