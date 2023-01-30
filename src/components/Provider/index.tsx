import {
  CompanyPingType,
  ContentResponseType,
  DataViewMode,
  Language,
  MenuViewMode,
  PingResponseDTO,
  Theme,
  USER_GUEST,
  UserPingType,
} from '@juki-team/commons';
import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';
import { settings } from '../../config';
import { usePageFocus, usePageVisibility } from '../../hooks';
import { useFetcher } from '../../hooks/useFetcher';
import { socket } from '../../services';
import { NotificationProvider } from '../Notifications';
import { JukiBaseUiProviderProps } from './types';

const BaseContext = createContext<{
  isPageVisible: boolean,
  isPageFocus: boolean,
  viewPortSize: 'hg' | 'lg' | 'md' | 'sm',
  user: UserPingType,
  company: CompanyPingType,
  setUser: Dispatch<SetStateAction<UserPingType>>,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
}>({
  isPageVisible: true,
  isPageFocus: true,
  viewPortSize: 'sm',
  user: USER_GUEST,
  company: { name: '', imageUrl: '', emailContact: '' },
  setUser: () => null,
  isLoading: true,
  mutate: null as unknown as KeyedMutator<any>,
});

const useUser = () => {
  
  const {
    data,
    isLoading,
    mutate,
  } = useFetcher<ContentResponseType<PingResponseDTO>>(...settings.JUKI_API.PING());
  const [user, setUser] = useState<UserPingType>(USER_GUEST);
  const [company, setCompany] = useState<CompanyPingType>({ emailContact: '', imageUrl: '', name: '' });
  
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
      setCompany(data.content.company);
      if (data.content.user.isLogged) {
        setUser(data?.content.user);
      } else {
        setUser({
          ...data?.content.user,
          settings: {
            preferredTheme,
            preferredLanguage,
            preferredMenuView: MenuViewMode.VERTICAL,
            preferredDataView: DataViewMode.LIST,
          },
        });
      }
      localStorage.setItem(settings.TOKEN_NAME, data?.content.user.sessionId);
    } else {
      setUser({
        ...USER_GUEST,
        settings: {
          preferredTheme,
          preferredLanguage,
          preferredMenuView: MenuViewMode.VERTICAL,
          preferredDataView: DataViewMode.LIST,
        },
      });
    }
  }, [data]);
  
  return {
    user,
    company,
    setUser,
    isLoading,
    mutate,
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
  const [viewPortSize, setViewPortSize] = useState<'hg' | 'lg' | 'md' | 'sm'>('sm');
  
  useEffect(() => {
    settings.setSetting(utilsServiceUrl, utilsServiceApiVersion, utilsSocketServiceUrl, utilsUiUrl, tokenName);
    socket.stop();
    socket.start();
  }, [tokenName, utilsServiceApiVersion, utilsServiceUrl, utilsSocketServiceUrl, utilsUiUrl]);
  
  const { user, company, setUser, isLoading, mutate } = useUser();
  
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
    <BaseContext.Provider value={{ isPageVisible, isPageFocus, viewPortSize, user, company, setUser, isLoading, mutate }}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </BaseContext.Provider>
  );
};

export const useJukiBase = () => {
  
  const { isPageVisible, isPageFocus, viewPortSize, user, setUser, isLoading, mutate, company } = useContext(BaseContext);
  
  return {
    isPageVisible,
    isPageFocus,
    viewPortSize,
    user,
    company,
    setUser,
    isLoading,
    mutatePing: mutate,
  };
};
