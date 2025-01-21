import {
  CompanyPingType,
  ContentResponseType,
  DataViewMode,
  getWebSocketResponseEventKey,
  isPongWebSocketResponseEventDTO,
  Language,
  MenuViewMode,
  ObjectIdType,
  PingResponseDTO,
  ProfileSetting,
  Theme,
  WebSocketActionEvent,
  WebSocketResponseEvent,
  WebSocketResponseEventDTO,
} from '@juki-team/commons';
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { EMPTY_COMPANY, EMPTY_USER } from '../../constants';
import { localStorageCrossDomains } from '../../helpers';
import { useJukiPage } from '../../hooks';
import { useFetcher } from '../../hooks/useFetcher';
import { jukiApiSocketManager, jukiGlobalStore } from '../../settings';
import { UserContext } from './context';
import { DeviceType, JukiUserProviderProps, UserDataType } from './types';

const useUser = () => {
  
  const {
    data,
    isLoading: isLoadingPing,
    isValidating,
    mutate,
  } = useFetcher<ContentResponseType<PingResponseDTO>>(
    jukiApiSocketManager.API_V1.auth.ping().url,
    { refreshInterval: 1000 * 60 * 5 },
  );
  
  const [ user, _setUser ] = useState<UserDataType>(EMPTY_USER);
  const [ company, setCompany ] = useState<CompanyPingType>(EMPTY_COMPANY);
  const i18n = jukiGlobalStore.getI18n();
  
  const setUser: Dispatch<SetStateAction<UserDataType>> = useCallback((user) => {
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
        setUser({ ...data?.content.user, connectionId: '' });
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
          connectionId: '',
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
  
  const { children } = props;
  
  const token = jukiApiSocketManager.getToken();
  const lastTokenRef = useRef('');
  
  const { user, company, setUser, isLoading, mutate } = useUser();
  const { isPageVisible } = useJukiPage();
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(null);
  const userConnectionIdRef = useRef(user?.connectionId);
  userConnectionIdRef.current = user?.connectionId;
  
  useEffect(() => {
    
    const eventKey = getWebSocketResponseEventKey(WebSocketResponseEvent.PONG, user.sessionId, '*');
    
    const callback = (data: WebSocketResponseEventDTO) => {
      if (isPongWebSocketResponseEventDTO(data)) {
        if (userConnectionIdRef.current !== data.connectionId) {
          setUser(prevState => ({ ...prevState, connectionId: data.connectionId }));
        }
      }
    };
    
    jukiApiSocketManager.SOCKET.subscribe(eventKey, callback);
    
    return () => {
      jukiApiSocketManager.SOCKET.unsubscribe(eventKey, callback);
    };
  }, [ setUser, user.sessionId ]);
  
  useEffect(() => {
    if (isPageVisible && token !== lastTokenRef.current) {
      lastTokenRef.current = token;
      void jukiApiSocketManager.SOCKET.start();
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        jukiApiSocketManager.SOCKET.send({
          event: WebSocketActionEvent.PING,
          sessionId: token as ObjectIdType,
        }, '');
      }, 60000);
    }
  }, [ isPageVisible, setUser, token ]);
  
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
    setUser,
    mutate,
  }), [ user, company, isLoading, device, setUser, mutate ]);
  
  const userTheme = user.settings?.[ProfileSetting.THEME];
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.querySelector('body')?.classList.remove('jk-theme-dark');
      document.querySelector('body')?.classList.remove('jk-theme-light');
      if (userTheme === Theme.DARK) {
        document.querySelector('body')?.classList.add('jk-theme-dark');
      } else {
        document.querySelector('body')?.classList.add('jk-theme-light');
      }
    }
  }, [ userTheme ]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
