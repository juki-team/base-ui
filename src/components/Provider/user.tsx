import {
  CompanyPingType,
  ContentResponseType,
  DataViewMode,
  Language,
  MenuViewMode,
  PingResponseDTO,
  ProfileSetting,
  Theme,
  USER_GUEST,
  UserPingType,
} from '@juki-team/commons';
import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { localStorageCrossDomains } from '../../helpers';
import { KeyedMutator } from 'swr';
import { settings } from '../../config';
import { useJukiUI } from '../../hooks';
import { useFetcher } from '../../hooks/useFetcher';
import { socket } from '../../services';
import { JukiUserProviderProps } from './types';

export const UserContext = createContext<{
  user: UserPingType,
  company: CompanyPingType,
  setUser: Dispatch<SetStateAction<UserPingType>>,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
}>({
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
  } = useFetcher<ContentResponseType<PingResponseDTO>>(settings.getAPI().auth.ping().url, { refreshInterval: 1000 * 60 * 5 });
  
  const [user, setUser] = useState<UserPingType>(USER_GUEST);
  const [company, setCompany] = useState<CompanyPingType>({ emailContact: '', imageUrl: '', name: '' });
  
  useEffect(() => {
    let preferredLanguage: Language = localStorage.getItem(ProfileSetting.LANGUAGE) as Language;
    if (preferredLanguage !== Language.EN && preferredLanguage !== Language.ES) {
      preferredLanguage = Language.EN;
    }
    let preferredTheme: Theme = localStorage.getItem(ProfileSetting.THEME) as Theme;
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
            [ProfileSetting.THEME]: preferredTheme,
            [ProfileSetting.LANGUAGE]: preferredLanguage,
            [ProfileSetting.DATA_VIEW_MODE]: DataViewMode.ROWS,
            [ProfileSetting.MENU_VIEW_MODE]: MenuViewMode.VERTICAL,
            [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: true,
          },
        });
      }
      localStorageCrossDomains.setItem(settings.TOKEN_NAME, data?.content.user.sessionId);
    } else {
      setUser({
        ...USER_GUEST,
        settings: {
          [ProfileSetting.THEME]: preferredTheme,
          [ProfileSetting.LANGUAGE]: preferredLanguage,
          [ProfileSetting.DATA_VIEW_MODE]: DataViewMode.ROWS,
          [ProfileSetting.MENU_VIEW_MODE]: MenuViewMode.VERTICAL,
          [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: true,
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

export const JukiUserProvider = ({
  children,
  utilsServiceUrl,
  utilsServiceApiVersion,
  utilsSocketServiceUrl,
  utilsUiUrl,
  tokenName,
}: PropsWithChildren<JukiUserProviderProps>) => {
  const { isPageVisible } = useJukiUI();
  
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
  
  return (
    <UserContext.Provider value={{ user, company, setUser, isLoading, mutate }}>
      {children}
    </UserContext.Provider>
  );
};
