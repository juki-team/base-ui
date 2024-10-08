import {
  CompanyPingType,
  ContentResponseType,
  DataViewMode,
  Language,
  MenuViewMode,
  PingResponseDTO,
  ProfileSetting,
  Theme,
  UserPingType,
} from '@juki-team/commons';
import React, { Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import {
  browserName,
  browserVersion,
  deviceType,
  isMobile,
  mobileModel,
  mobileVendor,
  osName,
  osVersion,
} from 'react-device-detect';
import { jukiSettings } from '../../config';
import { EMPTY_COMPANY, EMPTY_USER } from '../../constants';
import { getLocalToken, localStorageCrossDomains } from '../../helpers';
import { useFetcher } from '../../hooks/useFetcher';
import { useJukiPage } from '../../hooks/useJukiPage';
import { useT } from '../../hooks/useT';
import { UserContext } from './context';
import { SocketIo } from './SocketIo';
import { DeviceType, JukiUserProviderProps } from './types';

const useUser = () => {
  
  const {
    data,
    isLoading: isLoadingPing,
    isValidating,
    mutate,
  } = useFetcher<ContentResponseType<PingResponseDTO>>(
    jukiSettings.API.auth.ping().url,
    { refreshInterval: 1000 * 60 * 5 },
  );
  
  const [ user, _setUser ] = useState<UserPingType>(EMPTY_USER);
  const [ company, setCompany ] = useState<CompanyPingType>(EMPTY_COMPANY);
  const i18n = useT();
  
  const setUser: Dispatch<SetStateAction<UserPingType>> = useCallback((user) => {
    if (typeof user === 'function') {
      _setUser((prevState) => {
        const newUser = user(prevState);
        void i18n.changeLanguage?.(newUser.settings[ProfileSetting.LANGUAGE]);
        return newUser;
      });
    } else {
      _setUser(user);
      void i18n.changeLanguage?.(user.settings[ProfileSetting.LANGUAGE]);
    }
  }, [ _setUser, i18n ]);
  
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
      localStorageCrossDomains.setItem(jukiSettings.TOKEN_NAME, data?.content.user.sessionId);
    } else {
      setUser({
        ...EMPTY_USER,
        settings: {
          [ProfileSetting.THEME]: preferredTheme,
          [ProfileSetting.LANGUAGE]: preferredLanguage,
          [ProfileSetting.DATA_VIEW_MODE]: DataViewMode.ROWS,
          [ProfileSetting.MENU_VIEW_MODE]: MenuViewMode.VERTICAL,
          [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: true,
        },
      });
    }
  }, [ data, setUser ]);
  
  const isLoading = isLoadingPing || company.key === '';
  
  return {
    user,
    company,
    setUser,
    isLoading,
    isValidating: isLoading || isValidating,
    mutate,
  };
};

export const JukiUserProvider = (props: PropsWithChildren<JukiUserProviderProps>) => {
  
  const { children, serviceApiUrl, socketServiceUrl, utilsUiUrl, tokenName } = props;
  
  const { isPageVisible } = useJukiPage();
  
  const token = getLocalToken();
  jukiSettings.setSetting(serviceApiUrl, utilsUiUrl, tokenName);
  
  const socket = useMemo(() => {
    return new SocketIo(socketServiceUrl);
  }, [ socketServiceUrl ]);
  
  useEffect(() => {
    socket.start();
    return () => {
      socket.stop();
    };
  }, [ socket, socketServiceUrl, token ]);
  
  const { user, company, setUser, isLoading, mutate } = useUser();
  
  useEffect(() => {
    if (isPageVisible) {
      socket.start();
    }
  }, [ isPageVisible, socket ]);
  
  const device: DeviceType = useMemo(() => ({
    type: deviceType,
    isMobile: false,
    isBrowser: false,
    label: isMobile ? `${mobileModel} ${mobileVendor}` : `${browserName} ${browserVersion}`,
    osLabel: `${osName} ${osVersion}`,
  }), []);
  
  const value = useMemo(() => ({
    user,
    company,
    isLoading,
    device,
    socket,
    setUser,
    mutate,
  }), [ user, company, isLoading, device, socket, setUser, mutate ]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
