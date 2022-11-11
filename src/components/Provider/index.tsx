import { ContentResponseType, Language, Theme, USER_GUEST, UserPingResponseDTO, UserState } from '@juki-team/commons';
import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import { settings } from '../../config';
import { usePageFocus, usePageVisibility } from '../../hooks';
import { useFetcher } from '../../hooks/useFetcher';
import { socket } from '../../services';
import { NotificationProvider } from '../Notifications';
import { JukiBaseUiProviderProps } from './types';

const BaseContext = createContext<{ isPageVisible: boolean, isPageFocus: boolean, viewPortSize: string, user: UserState, setUser: Dispatch<SetStateAction<UserState>>, userIsLoading: boolean }>({
  isPageVisible: true,
  isPageFocus: true,
  viewPortSize: '',
  user: USER_GUEST,
  setUser: () => null,
  userIsLoading: true,
});

const useUser = () => {
  
  const {
    data,
    isLoading,
  } = useFetcher<ContentResponseType<UserPingResponseDTO>>(...settings.JUKI_API.PING());
  const [user, setUser] = useState<UserState>(USER_GUEST);
  const [userIsLoading, setUserIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoading) {
      setUserIsLoading(false);
    }
  }, [isLoading]);
  
  useEffect(() => {
    let preferredLanguage: Language = localStorage.getItem('preferredLanguage') as Language;
    if (preferredLanguage !== Language.EN && preferredLanguage !== Language.ES) {
      preferredLanguage = Language.EN;
    }
    let preferredTheme: Theme = localStorage.getItem('preferredTheme') as Theme;
    if (preferredTheme !== Theme.DARK && preferredTheme !== Theme.LIGHT) {
      preferredTheme = Theme.LIGHT;
    }
    if (data?.success) {
      const isLogged = !!data?.content.nickname;
      if (isLogged) {
        setUser({ ...data?.content, isLogged });
      } else {
        setUser({ ...data?.content, isLogged, settings: { preferredTheme, preferredLanguage } });
        localStorage.setItem(settings.TOKEN_NAME, data?.content.sessionId);
      }
    } else {
      setUser({ ...USER_GUEST, settings: { preferredTheme, preferredLanguage } });
    }
  }, [data]);
  
  return {
    user,
    setUser,
    userIsLoading,
  };
};

export const JukiBaseUiProvider = ({
  children,
  utilsServiceUrl,
  utilsServiceApiVersion,
  utilsSocketServiceUrl,
  utilsUiUrl,
  tokenName,
}: PropsWithChildren<JukiBaseUiProviderProps>) => {
  
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  const [viewPortSize, setViewPortSize] = useState('');
  
  useEffect(() => {
    settings.setSetting(utilsServiceUrl, utilsServiceApiVersion, utilsSocketServiceUrl, utilsUiUrl, tokenName);
    socket.stop();
    socket.start();
  }, [tokenName, utilsServiceApiVersion, utilsServiceUrl, utilsSocketServiceUrl, utilsUiUrl]);
  
  const { user, setUser, userIsLoading } = useUser();
  
  useEffect(() => {
    if (isPageVisible) {
      socket.joinSession().then(() => null);
    }
  }, [isPageVisible]);
  
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
    <BaseContext.Provider value={{ isPageVisible, isPageFocus, viewPortSize, user, setUser, userIsLoading }}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </BaseContext.Provider>
  );
};

export const useJukiBase = () => {
  
  const { isPageVisible, isPageFocus, viewPortSize, user, setUser, userIsLoading } = useContext(BaseContext);
  
  return {
    isPageVisible,
    isPageFocus,
    viewPortSize,
    user,
    setUser,
    userIsLoading,
  };
};
