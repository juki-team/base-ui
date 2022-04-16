import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { settings } from '../../config';
import { useInterval, usePageVisibility } from '../../hooks';
import { socket } from '../../services';
import { NotificationProvider } from '../Notifications';
import { JukiBaseUiProviderProps } from './types';

const BaseContext = createContext<{ isPageVisible: boolean }>({
  isPageVisible: true,
});

export const JukiBaseUiProvider = ({
  children,
  utilsServiceUrl,
  apiVersion,
  utilsUiUrl,
}: PropsWithChildren<JukiBaseUiProviderProps>) => {
  useEffect(() => {
    settings.setSetting(utilsServiceUrl, apiVersion, utilsUiUrl);
    socket.start().then(() => null);
    socket.joinSession().then(() => null);
  }, [apiVersion, utilsServiceUrl, utilsUiUrl]);
  const isPageVisible = usePageVisibility();
  useEffect(() => {
    if (isPageVisible) {
      socket.joinSession().then(() => null);
    }
  }, [isPageVisible]);
  useInterval(() => {
    socket.joinSession().then(() => null);
  }, isPageVisible ? 2 * 60 * 1000 : 0);
  
  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document?.documentElement.style.setProperty('--vh', `${vh}px`);
    // We listen to the resize event
    const listener = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document?.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window?.addEventListener('resize', listener);
    return () => {
      window?.removeEventListener('resize', listener);
    };
  }, []);
  
  return (
    <BaseContext.Provider value={{ isPageVisible }}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </BaseContext.Provider>
  );
};

export const useBase = () => {
  
  const { isPageVisible } = useContext(BaseContext);
  
  return {
    isPageVisible,
  };
};
