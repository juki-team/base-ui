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
import { EMPTY_COMPANY } from '../../constants';
import { getLocalToken, localStorageCrossDomains } from '../../helpers';
import { useFetcher, useJukiPage, useT } from '../../hooks';
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
  
  const [ user, _setUser ] = useState<UserPingType>(USER_GUEST);
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
  }, [ data ]);
  
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
  
  const socket = useMemo(() => new SocketIo(socketServiceUrl), [ socketServiceUrl ]);
  
  useEffect(() => {
    jukiSettings.setSetting(serviceApiUrl, utilsUiUrl, tokenName);
    socket.stop();
    socket.start();
    return () => {
      socket.stop();
    }
  }, [ socket, tokenName, serviceApiUrl, socketServiceUrl, utilsUiUrl, token ]);
  
  const { user, company, setUser, isLoading, isValidating, mutate } = useUser();
  
  useEffect(() => {
    if (isPageVisible) {
      socket.joinSession().then(() => null);
    }
  }, [ isPageVisible, socket, user.sessionId ]);
  
  const device: DeviceType = {
    type: deviceType,
    isMobile: false,
    isBrowser: false,
    label: isMobile ? `${mobileModel} ${mobileVendor}` : `${browserName} ${browserVersion}`,
    osLabel: `${osName} ${osVersion}`,
  };
  
  const valueString = JSON.stringify({ user, company, isLoading, isValidating, device });
  
  const value = useMemo(() => ({
    ...JSON.parse(valueString),
    socket,
    setUser,
    mutate,
  }), [ valueString, socket, mutate, setUser ]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
