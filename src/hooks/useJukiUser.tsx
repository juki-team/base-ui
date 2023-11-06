import {
  ContentResponseType,
  DataViewMode,
  ErrorResponseType,
  Language,
  MenuViewMode,
  PingResponseDTO,
  ProfileSetting,
  Status,
  Theme,
  USER_GUEST,
  UserSettingsType,
} from '@juki-team/commons';
import React, { useCallback, useContext, useState } from 'react';
import { LoginFormType, T } from '../components';
import { settings } from '../config';
import { UserContext } from '../contexts/JukiUserProvider/context';
import { localStorageCrossDomains } from '../helpers';
import { authorizedRequest, AuthorizedRequestType, cleanRequest } from '../services';
import { SetStatusType, SignUpPayloadDTO, UpdatePasswordPayloadDTO, UpdateUserProfileDataPayloadDTO } from '../types';
import { useMatchMutate } from './swr';
import { useNotification } from './useNotification';

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
  
  const { user, isLoading, setUser, mutate, company, socket, device } = useContext(UserContext);
  const { notifyResponse, addErrorNotification } = useNotification();
  const { matchMutate } = useMatchMutate();
  
  const refreshAllRequest = useCallback(async () => {
    await matchMutate(new RegExp(`^${settings.SERVICE_API_URL}`, 'g'));
  }, [ matchMutate ]);
  
  const doRequest = useCallback(async <T, >(
    { url, options, setLoader, onSuccess, onError, onFinally }: ApiType<T> & {
      url: string,
      options?: AuthorizedRequestType
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
    { body, onSuccess, ...props }: ApiBodyType<LoginFormType & { deviceName: string, osName: string }, PingResponseDTO>,
  ) => {
    const { url, ...options } = settings.getAPI().auth.signIn({ body });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorageCrossDomains.setItem(settings.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [ doRequest, refreshAllRequest, setUser ]);
  
  const signUp = useCallback(async (
    { body, onSuccess, ...props }: ApiBodyType<SignUpPayloadDTO & {
      osName: string,
      deviceName: string
    }, PingResponseDTO>,
  ) => {
    const { url, ...options } = settings.getAPI().auth.signUp({ body });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorageCrossDomains.setItem(settings.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [ doRequest, refreshAllRequest, setUser ]);
  
  const createUser = useCallback(async (
    { body, ...props }: ApiBodyType<SignUpPayloadDTO & { companyKey: string }, PingResponseDTO>,
  ) => {
    const { url, ...options } = settings.getAPI().auth.signUp({ body });
    await doRequest<PingResponseDTO>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserProfileData = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, UpdateUserProfileDataPayloadDTO, string>,
  ) => {
    const { url, ...options } = settings.getAPI().user.updateProfileData({ params, body });
    await doRequest<string>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserProfileImage = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, FormData, string>,
  ) => {
    const { url, ...options } = settings.getAPI().user.updateProfileImage({ params, body });
    await doRequest<string>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updatePassword = useCallback(async ({ body, ...props }: ApiBodyType<UpdatePasswordPayloadDTO, string>) => {
    const { url, ...options } = settings.getAPI().auth.updatePassword({ body });
    await doRequest<string>({ url, options, ...props });
  }, [ doRequest ]);
  
  const resetUserPassword = useCallback(async (
    { params: { companyKey, nickname }, ...props }: ApiParamsType<{ companyKey: string, nickname: string }, string>,
  ) => {
    const { url, ...options } = settings.getAPI().auth.resetPassword({ params: { companyKey, nickname } });
    await doRequest<string>({ url, options, ...props });
  }, [ doRequest ]);
  
  const logout = useCallback(async ({ onError, onFinally, ...props }: ApiType<string>) => {
    
    const { url, ...options } = settings.getAPI().auth.signOut();
    
    const onFinallyWrap = async (response: ErrorResponseType | ContentResponseType<string>) => {
      localStorageCrossDomains.removeItem(settings.TOKEN_NAME);
      setUser(USER_GUEST);
      await refreshAllRequest();
      await onFinally?.(response);
    };
    
    const onErrorWrap = async (response: ErrorResponseType) => {
      addErrorNotification(<T className="tt-se">force Logout</T>);
      await onError?.(response);
    };
    
    await doRequest<string>({ url, options, onError: onErrorWrap, onFinally: onFinallyWrap, ...props });
  }, [ addErrorNotification, doRequest, refreshAllRequest, setUser ]);
  
  const deleteUserSession = useCallback(async ({ params, ...props }: ApiParamsType<{ sessionId: string }, string>) => {
    const { url, ...options } = settings.getAPI().user.deleteSession({ params });
    await doRequest<string>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserPreferences = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, UserSettingsType, string>,
  ) => {
    const { url, ...options } = settings.getAPI().user.updatePreferences({ params, body });
    await doRequest<string>({ url, options, ...props });
  }, [ doRequest ]);
  
  return {
    company,
    user,
    setUser,
    isLoading,
    mutatePing: mutate,
    refreshAllRequest,
    signIn,
    signUp,
    logout,
    updatePassword,
    socket,
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

export const useJukiUserToggleSetting = () => {
  
  const { updateUserPreferences, setUser, user: { isLogged, settings, nickname }, mutatePing } = useJukiUser();
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  const toggleSetting = async (settingsToUpdate: { key: ProfileSetting, value: string | boolean }[]) => {
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
      setUser(prevState => (
        { ...prevState, settings: newSettings }
      ));
    }
  };
  const loading = loader === Status.LOADING;
  
  return {
    ...settings,
    loading,
    toggleSetting,
  };
};
