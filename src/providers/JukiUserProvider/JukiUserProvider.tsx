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
import { CSSProperties, type PropsWithChildren, useCallback, useEffect } from 'react';
import { T } from '../../components/atoms/T/T';
import { isBrowser, localStorageCrossDomains } from '../../components/helpers';
import { useFetcher } from '../../components/hooks/useFetcher';
import { useInjectFontSize } from '../../components/hooks/useInjectFontSize';
import { useInjectTheme } from '../../components/hooks/useInjectTheme';
import { useMutate } from '../../components/hooks/useMutate';
import { EMPTY_USER } from '../../constants';
import { JUKI_SERVICE_V1_URL, JUKI_SERVICE_V2_URL, JUKI_TOKEN_NAME } from '../../constants/settings';
import { jukiApiManager } from '../../settings';
import { useI18nStore } from '../../stores/i18n/useI18nStore';
import { useUserStore } from '../../stores/user/useUserStore';

export const JukiUserProvider = ({ children }: PropsWithChildren) => {
  
  const setUser = useUserStore(state => state.setUser);
  const setCompany = useUserStore(state => state.setCompany);
  const setDevice = useUserStore(state => state.setDevice);
  const setMutate = useUserStore(state => state.setMutate);
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userSessionId = useUserStore(state => state.user.sessionId);
  const isLoading = useUserStore(state => state.isLoading);
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
    let preferredLanguage: Language = localStorage.getItem(ProfileSetting.LANGUAGE) as Language;
    if (preferredLanguage !== Language.EN && preferredLanguage !== Language.ES) {
      preferredLanguage = Language.ES;
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
            [ProfileSetting.TIME_ZONE]: 'America/La_Paz',
            [ProfileSetting.FONT_SIZE]: 16,
          },
        });
      }
      
      localStorageCrossDomains.setItem(JUKI_TOKEN_NAME, data?.content.user.sessionId);
    } else {
      setUser({
        ...EMPTY_USER,
        settings: {
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
  
  if (isLoading && !userSessionId) {
    return (
      <div className="expand-absolute pe-ne jk-col bc-pd">
        <h1 className="jk-row cr-pt" style={{ alignItems: 'baseline' }}>
          <T className="tt-se">loading user</T>&nbsp;
          <div
            className="dot-flashing"
            style={{
              '--dot-flashing-color': 'var(--t-color-primary-text)',
              '--dot-flashing-color-light': 'var(--t-color-primary-light)',
              '--dot-flashing-size': '10px',
            } as CSSProperties}
          />
        </h1>
      </div>
    );
  }
  
  return children;
};
