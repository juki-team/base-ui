import {
  ContentResponseType,
  DataViewMode,
  ErrorResponseType,
  HTTPMethod,
  Language,
  MenuViewMode,
  PingResponseDTO,
  ProfileSetting,
  Status,
  Theme,
  UserSettingsType,
} from '@juki-team/commons';
import React, { useCallback, useContext, useState } from 'react';
import { T } from '../components/atoms/T';
import { EMPTY_USER } from '../constants';
import { UserContext } from '../contexts/JukiUserProvider/context';
import { authorizedRequest, cleanRequest, localStorageCrossDomains } from '../helpers';
import { jukiApiSocketManager, jukiGlobalStore } from '../settings';
import {
  AuthorizedRequestType,
  SetStatusType,
  SignInPayloadDTO,
  SignUpPayloadDTO,
  UpdatePasswordPayloadDTO,
  UpdateUserProfileDataPayloadDTO,
} from '../types';
import { useJukiNotification } from './useJukiNotification';
import { useMutate } from './useMutate';

type ApiType<T> = {
  setLoader?: SetStatusType,
  onSuccess?: (response: ContentResponseType<T>) => void,
  onError?: (response: ErrorResponseType) => void
  onFinally?: (response: ContentResponseType<T> | ErrorResponseType) => void
}

type ApiParamsType<T, U> = ApiType<U> & {
  params: T,
};

type ApiBodyType<T, U> = ApiType<U> & {
  body: T,
};

type ApiParamsBodyType<T, U, V> = ApiType<V> & {
  params: T,
  body: U,
};

export const useJukiUser = () => {
  
  const { user, isLoading, setUser, mutate, company, device } = useContext(UserContext);
  const { notifyResponse, addErrorNotification } = useJukiNotification();
  const matchMutate = useMutate();
  
  const refreshAllRequest = useCallback(async () => {
    await matchMutate(new RegExp(`${jukiApiSocketManager.SERVICE_API_V1_URL}`, 'g'));
  }, [ matchMutate ]);
  
  const doRequest = useCallback(async <T, M extends HTTPMethod = HTTPMethod.GET>(
    { url, options, setLoader, onSuccess, onError, onFinally }: ApiType<T> & {
      url: string,
      options?: AuthorizedRequestType<M>
    },
  ) => {
    setLoader?.(Status.LOADING);
    const response = cleanRequest<ContentResponseType<T>>(await authorizedRequest(url, options));
    if (notifyResponse(response, setLoader)) {
      await onSuccess?.(response);
    } else {
      await onError?.(response);
    }
    onFinally?.(response);
  }, [ notifyResponse ]);
  
  const signIn = useCallback(async (
    { params, body, onSuccess, ...props }: ApiParamsBodyType<{
      companyKey: string
    } | undefined, SignInPayloadDTO, PingResponseDTO>,
  ) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.auth.signIn({ body, params });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorageCrossDomains.setItem(jukiApiSocketManager.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO, HTTPMethod.POST>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [ doRequest, refreshAllRequest, setUser ]);
  
  const signUp = useCallback(async (
    { body, onSuccess, ...props }: ApiBodyType<SignUpPayloadDTO & {
      osName: string,
      deviceName: string
    }, PingResponseDTO>,
  ) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.auth.signUp({ body });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorageCrossDomains.setItem(jukiApiSocketManager.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO, HTTPMethod.POST>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [ doRequest, refreshAllRequest, setUser ]);
  
  const createUser = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{
      companyKey: string
    } | undefined, SignUpPayloadDTO, PingResponseDTO>,
  ) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.auth.createUser({ params, body });
    await doRequest<PingResponseDTO, HTTPMethod.POST>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserProfileData = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, UpdateUserProfileDataPayloadDTO, string>,
  ) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.user.updateProfileData({ params, body });
    await doRequest<string, HTTPMethod.PUT>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserProfileImage = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, FormData, string>,
  ) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.user.updateProfileImage({ params, body });
    await doRequest<string, HTTPMethod.PUT>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updatePassword = useCallback(async ({ body, ...props }: ApiBodyType<UpdatePasswordPayloadDTO, string>) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.auth.updatePassword({
      params: {
        nickname: user.nickname,
        companyKey: company.key,
      }, body,
    });
    await doRequest<string, HTTPMethod.POST>({ url, options, ...props });
  }, [ company.key, doRequest, user.nickname ]);
  
  const resetUserPassword = useCallback(async (
    { params: { companyKey, nickname }, ...props }: ApiParamsType<{ companyKey: string, nickname: string }, string>,
  ) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.auth.resetPassword({ params: { companyKey, nickname } });
    await doRequest<string, HTTPMethod.POST>({ url, options, ...props });
  }, [ doRequest ]);
  
  const logout = useCallback(async ({ onError, onFinally, ...props }: ApiType<string>) => {
    
    const { url, ...options } = jukiApiSocketManager.API_V1.auth.signOut();
    
    const onFinallyWrap = async (response: ErrorResponseType | ContentResponseType<string>) => {
      localStorageCrossDomains.removeItem(jukiApiSocketManager.TOKEN_NAME);
      setUser(EMPTY_USER);
      await refreshAllRequest();
      await onFinally?.(response);
    };
    
    const onErrorWrap = async (response: ErrorResponseType) => {
      addErrorNotification(<T className="tt-se">force Logout</T>);
      await onError?.(response);
    };
    
    await doRequest<string, HTTPMethod.POST>({
      url,
      options,
      onError: onErrorWrap,
      onFinally: onFinallyWrap, ...props,
    });
  }, [ addErrorNotification, doRequest, refreshAllRequest, setUser ]);
  
  const deleteUserSession = useCallback(async ({ params, ...props }: ApiParamsType<{ sessionId: string }, string>) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.user.deleteSession({ params });
    await doRequest<string, HTTPMethod.DELETE>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserPreferences = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, UserSettingsType, string>,
  ) => {
    const { url, ...options } = jukiApiSocketManager.API_V1.user.updatePreferences({ params, body });
    await doRequest<string, HTTPMethod.PUT>({ url, options, ...props });
  }, [ doRequest ]);
  
  return {
    company,
    user,
    setUser,
    isLoading,
    // isValidating,
    mutatePing: mutate,
    refreshAllRequest,
    signIn,
    signUp,
    logout,
    updatePassword,
    device,
    // users
    createUser,
    updateUserProfileData,
    updateUserProfileImage,
    resetUserPassword,
    deleteUserSession,
    updateUserPreferences,
  };
};

export const useJukiUserSettings = () => {
  
  const i18n = jukiGlobalStore.getI18n();
  const { updateUserPreferences, setUser, user: { isLogged, settings, nickname }, mutatePing } = useJukiUser();
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  const setSettings = useCallback(async (settingsToUpdate: { key: ProfileSetting, value: string | boolean }[]) => {
    const newSettings: UserSettingsType = { ...settings };
    for (const { key, value } of settingsToUpdate) {
      if (key === ProfileSetting.LANGUAGE) {
        newSettings[ProfileSetting.LANGUAGE] = value as Language;
      }
      if (key === ProfileSetting.THEME) {
        newSettings[ProfileSetting.THEME] = value as Theme;
      }
      if (key === ProfileSetting.DATA_VIEW_MODE) {
        newSettings[ProfileSetting.DATA_VIEW_MODE] = value as DataViewMode;
      }
      if (key === ProfileSetting.MENU_VIEW_MODE) {
        newSettings[ProfileSetting.MENU_VIEW_MODE] = value as MenuViewMode;
      }
      if (key === ProfileSetting.NEWSLETTER_SUBSCRIPTION) {
        newSettings[ProfileSetting.NEWSLETTER_SUBSCRIPTION] = value as boolean;
      }
    }
    
    if (isLogged) {
      await updateUserPreferences({
        params: { nickname },
        body: { ...newSettings },
        setLoader,
        onSuccess: async () => {
          setLoader?.(Status.LOADING);
          await mutatePing();
          setLoader?.(Status.SUCCESS);
        },
      });
    } else {
      for (const { key, value } of settingsToUpdate) {
        localStorageCrossDomains.setItem(key, value + '');
      }
      setUser(prevState => ({ ...prevState, settings: newSettings }));
    }
    void i18n.changeLanguage?.(newSettings[ProfileSetting.LANGUAGE]);
  }, [ i18n, isLogged, mutatePing, nickname, setUser, settings, updateUserPreferences ]);
  
  const loading = loader === Status.LOADING;
  
  return {
    ...settings,
    loading,
    setSettings,
  };
};
