import {
  ContentResponseType,
  DataViewMode,
  Language,
  MenuViewMode,
  PingResponseDTO,
  ProfileSetting,
  Theme,
} from '@juki-team/commons';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { T } from '../../components/atoms/T/T';
import { JukiLoadingLayout } from '../../components/molecules/layouts/JukiLoadingLayout';
import { EMPTY_USER } from '../../constants';
import { localStorageCrossDomains } from '../../helpers';
import { useFetcher, useI18nStore, useMutate, useUserStore } from '../../hooks';
import { jukiApiSocketManager } from '../../settings';
import { JukiUserProviderProps } from './types';

export const JukiUserProvider = (props: PropsWithChildren<JukiUserProviderProps>) => {
  
  const { children } = props;
  
  const setUser = useUserStore(state => state.setUser);
  const setCompany = useUserStore(state => state.setCompany);
  const setDevice = useUserStore(state => state.setDevice);
  const setMutate = useUserStore(state => state.setMutate);
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userSessionId = useUserStore(state => state.user.sessionId);
  const isLoading = useUserStore(state => state.isLoading);
  const userPreferredTheme = useUserStore(state => state.user.settings?.[ProfileSetting.THEME]);
  const userPreferredLanguage = useUserStore(state => state.user.settings?.[ProfileSetting.LANGUAGE]);
  const i18nChangeLanguage = useI18nStore(state => state.changeLanguage);
  const {
    data,
    // isLoading: isLoadingPing,
    // isValidating: isValidatingPing,
    mutate,
  } = useFetcher<ContentResponseType<PingResponseDTO>>(
    jukiApiSocketManager.API_V1.auth.ping().url,
    { refreshInterval: 1000 * 60 * 5 },
  );
  
  const matchMutate = useMutate();
  
  const refreshAllRequest = useCallback(async () => {
    await matchMutate(new RegExp(`${jukiApiSocketManager.SERVICE_API_V1_URL}`, 'g'));
  }, [ matchMutate ]);
  
  useEffect(() => {
    void refreshAllRequest();
  }, [ userNickname, companyKey, userSessionId, refreshAllRequest ]);
  
  useEffect(() => {
    i18nChangeLanguage(userPreferredLanguage);
  }, [ i18nChangeLanguage, userPreferredLanguage ]);
  
  useEffect(() => {
    if (!data) {
      return;
    }
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
        setUser(data.content.user);
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
      
      localStorageCrossDomains.setItem(jukiApiSocketManager.TOKEN_NAME, data?.content.user.sessionId);
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
  }, [ data, setCompany, setUser ]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-device-detect').then((mod) => {
        setDevice({
          type: mod.deviceType,
          isMobile: mod.isMobile,
          isBrowser: mod.isBrowser,
          label: mod.isMobile ? `${mod.mobileModel} ${mod.mobileVendor}` : `${mod.browserName} ${mod.browserVersion}`,
          osLabel: `${mod.osName} ${mod.osVersion}`,
        });
      });
    }
    setMutate(mutate);
  }, [ mutate, setDevice, setMutate ]);
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.querySelector('body')?.classList.remove('jk-theme-dark');
      document.querySelector('body')?.classList.remove('jk-theme-light');
      if (userPreferredTheme === Theme.DARK) {
        document.querySelector('body')?.classList.add('jk-theme-dark');
      } else {
        document.querySelector('body')?.classList.add('jk-theme-light');
      }
    }
  }, [ userPreferredTheme ]);
  
  if (isLoading) {
    return (
      <JukiLoadingLayout>
        <T>loading user</T>
      </JukiLoadingLayout>
    );
  }
  
  return children;
};
