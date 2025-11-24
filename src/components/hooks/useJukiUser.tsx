import {
  cleanRequest,
  type ContentResponseType,
  DataViewMode,
  type ErrorResponseType,
  HTTPMethod,
  Language,
  MenuViewMode,
  type PingResponseDTO,
  ProfileSetting,
  Status,
  Theme,
  type UserSettingsType,
} from '@juki-team/commons';
import { useCallback, useState } from 'react';
import { JUKI_TOKEN_NAME } from '../../constants/settings';
import { jukiApiManager } from '../../settings';
import { useI18nStore } from '../../stores/i18n/useI18nStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { T } from '../atoms/T/T';
import { authorizedRequest, localStorageCrossDomains } from '../helpers';
import type {
  AuthorizedRequestType,
  SetStatusType,
  SignInPayloadDTO,
  SignUpPayloadDTO,
  UpdatePasswordPayloadDTO,
  UpdateUserProfileDataPayloadDTO,
} from '../types';
import { useJukiNotification } from './useJukiNotification';

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
  
  const { notifyResponse, addErrorNotification } = useJukiNotification();
  const userMutate = useUserStore(state => state.mutate);
  
  const doRequest = useCallback(async <T, M extends Exclude<HTTPMethod, HTTPMethod.GET>>(
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
    const { url, ...options } = jukiApiManager.API_V2.auth.signIn({ body, params });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorageCrossDomains.setItem(JUKI_TOKEN_NAME, response.content.user.sessionId);
      // setUser(response.content.user);
      await userMutate();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO, HTTPMethod.POST>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [ doRequest, userMutate ]);
  
  const signUp = useCallback(async (
    { body, onSuccess, ...props }: ApiBodyType<SignUpPayloadDTO & {
      osName: string,
      deviceName: string
    }, PingResponseDTO>,
  ) => {
    const { url, ...options } = jukiApiManager.API_V2.auth.signUp({ body });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorageCrossDomains.setItem(JUKI_TOKEN_NAME, response.content.user.sessionId);
      // setUser(response.content.user);
      await userMutate();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO, HTTPMethod.POST>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [ doRequest, userMutate ]);
  
  const createUser = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{
      companyKey: string
    } | undefined, SignUpPayloadDTO & { overwrite: boolean }, PingResponseDTO>,
  ) => {
    const { url, ...options } = jukiApiManager.API_V2.auth.createUser({ params, body });
    await doRequest<PingResponseDTO, HTTPMethod.POST>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserProfileData = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, UpdateUserProfileDataPayloadDTO, string>,
  ) => {
    const { url, ...options } = jukiApiManager.API_V2.user.updateProfileData({ params, body });
    await doRequest<string, HTTPMethod.PUT>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserProfileImage = useCallback(async (
    { params, body, setLoader, onSuccess, onError, onFinally }: ApiParamsBodyType<{
      nickname: string
    }, Blob, { signedUrl: string }>,
  ) => {
    const { url, ...options } = jukiApiManager.API_V2.user.updateProfileImage({
      params,
      body: { contentType: body.type },
    });
    setLoader?.(Status.LOADING);
    const response = cleanRequest<ContentResponseType<{ signedUrl: string }>>(await authorizedRequest(url, options));
    if (response.success) {
      await fetch(response.content.signedUrl, {
        method: HTTPMethod.PUT,
        headers: {
          'Content-Type': body.type,
        },
        body,
      });
    }
    if (notifyResponse(response, setLoader)) {
      await onSuccess?.(response);
    } else {
      await onError?.(response);
    }
    onFinally?.(response);
  }, [ notifyResponse ]);
  
  const updatePassword = useCallback(async ({ body, params, ...props }: ApiParamsBodyType<{
    companyKey: string,
    nickname: string,
  }, UpdatePasswordPayloadDTO, string>) => {
    const { url, ...options } = jukiApiManager.API_V2.auth.updatePassword({
      params,
      body,
    });
    await doRequest<string, HTTPMethod.POST>({ url, options, ...props });
  }, [ doRequest ]);
  
  const resetUserPassword = useCallback(async (
    { params: { companyKey, nickname }, ...props }: ApiParamsType<{ companyKey: string, nickname: string }, string>,
  ) => {
    const { url, ...options } = jukiApiManager.API_V2.auth.resetPassword({ params: { companyKey, nickname } });
    await doRequest<string, HTTPMethod.POST>({ url, options, ...props });
  }, [ doRequest ]);
  
  const logout = useCallback(async ({ onError, onFinally, ...props }: ApiType<string>) => {
    
    const { url, ...options } = jukiApiManager.API_V2.auth.signOut();
    
    const onFinallyWrap = async (response: ErrorResponseType | ContentResponseType<string>) => {
      localStorageCrossDomains.removeItem(JUKI_TOKEN_NAME);
      // setUser(EMPTY_USER);
      await userMutate();
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
  }, [ addErrorNotification, doRequest, userMutate ]);
  
  const deleteUserSession = useCallback(async ({ params, ...props }: ApiParamsType<{ sessionId: string }, string>) => {
    const { url, ...options } = jukiApiManager.API_V2.user.deleteSession({ params });
    await doRequest<string, HTTPMethod.DELETE>({ url, options, ...props });
  }, [ doRequest ]);
  
  const updateUserPreferences = useCallback(async (
    { params, body, ...props }: ApiParamsBodyType<{ nickname: string }, UserSettingsType, string>,
  ) => {
    const { url, ...options } = jukiApiManager.API_V2.user.updatePreferences({ params, body });
    await doRequest<string, HTTPMethod.PUT>({ url, options, ...props });
  }, [ doRequest ]);
  
  return {
    signIn,
    signUp,
    logout,
    updatePassword,
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
  
  const i18nChangeLanguage = useI18nStore(state => state.changeLanguage);
  const setUser = useUserStore(state => state.setUser);
  const { isLogged, settings, nickname } = useUserStore(state => state.user);
  const mutatePing = useUserStore(state => state.mutate);
  const { updateUserPreferences } = useJukiUser();
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  const setSettings = useCallback(async (settingsToUpdate: {
    key: ProfileSetting,
    value: string | boolean | number
  }[]) => {
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
      if (key === ProfileSetting.TIME_ZONE) {
        newSettings[ProfileSetting.TIME_ZONE] = value as string;
      }
      if (key === ProfileSetting.FONT_SIZE) {
        newSettings[ProfileSetting.FONT_SIZE] = value as number;
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
      setUser({ settings: newSettings });
    }
    i18nChangeLanguage(newSettings[ProfileSetting.LANGUAGE]);
  }, [ i18nChangeLanguage, isLogged, mutatePing, nickname, setUser, settings, updateUserPreferences ]);
  
  const loading = loader === Status.LOADING;
  
  return {
    ...settings,
    loading,
    setSettings,
  };
};
