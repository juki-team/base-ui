import {
  type ContentResponseType,
  DataViewMode,
  Language,
  MenuViewMode,
  ONE_MINUTE,
  type PingResponseDTO,
  ProfileSetting,
  Theme,
} from '@juki-team/commons';
import { useCallback, useEffect } from 'react';
import { isBrowser, localStorageCrossDomains } from '../../components/helpers';
import { useFetcher } from '../../components/hooks/useFetcher';
import { useInjectFontSize } from '../../components/hooks/useInjectFontSize';
import { useInjectTheme } from '../../components/hooks/useInjectTheme';
import { useMutate } from '../../components/hooks/useMutate';
import { JUKI_SERVICE_V1_URL, JUKI_SERVICE_V2_URL, JUKI_TOKEN_NAME } from '../../constants/settings';
import { jukiApiManager } from '../../settings';
import { useI18nStore } from '../../stores/i18n/useI18nStore';
import { useUserStore } from '../../stores/user/useUserStore';

export const JukiUserProvider = () => {
  
  const setUser = useUserStore(state => state.setUser);
  const setCompany = useUserStore(state => state.setCompany);
  const setDevice = useUserStore(state => state.setDevice);
  const setMutate = useUserStore(state => state.setMutate);
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userSessionId = useUserStore(state => state.user.sessionId);
  const userPreferredLanguage = useUserStore(state => state.user.settings?.[ProfileSetting.LANGUAGE]);
  const i18nChangeLanguage = useI18nStore(state => state.changeLanguage);
  const {
    data,
    // isLoading: isLoadingPing,
    // isValidating: isValidatingPing,
    mutate,
  } = useFetcher<ContentResponseType<PingResponseDTO>>(
    jukiApiManager.API_V2.auth.ping().url,
    { refreshInterval: ONE_MINUTE * 5 },
  );
  
  const matchMutate = useMutate();
  
  const refreshAllRequest = useCallback(async () => {
    await matchMutate(new RegExp(`${JUKI_SERVICE_V1_URL}`, 'g'));
    await matchMutate(new RegExp(`${JUKI_SERVICE_V2_URL}`, 'g'));
    
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
    
    if (data?.success) {
      setCompany(data.content.company);
      if (data.content.user.isLogged) {
        setUser(data.content.user);
      } else {
        let preferredLanguage: Language = localStorage.getItem(ProfileSetting.LANGUAGE) as Language;
        if (preferredLanguage !== Language.EN && preferredLanguage !== Language.ES) {
          preferredLanguage = Language.ES;
        }
        let preferredTheme: Theme = localStorage.getItem(ProfileSetting.THEME) as Theme;
        if (preferredTheme !== Theme.DARK && preferredTheme !== Theme.LIGHT) {
          preferredTheme = Theme.LIGHT;
        }
        setUser({
          ...data?.content.user,
          settings: {
            ...data.content.user.settings,
            [ProfileSetting.THEME]: preferredTheme,
            [ProfileSetting.LANGUAGE]: preferredLanguage,
            [ProfileSetting.DATA_VIEW_MODE]: DataViewMode.ROWS,
            [ProfileSetting.MENU_VIEW_MODE]: MenuViewMode.VERTICAL,
            [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: true,
            [ProfileSetting.TIME_ZONE]: 'America/La_Paz',
            [ProfileSetting.FONT_SIZE]: 16,
          },
        });
      }
      
      localStorageCrossDomains.setItem(JUKI_TOKEN_NAME, data?.content.user.sessionId);
    }
  }, [ data, setCompany, setUser ]);
  
  useEffect(() => {
    if (isBrowser()) {
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
  
  useInjectTheme();
  useInjectFontSize();
  
  return null;
};
