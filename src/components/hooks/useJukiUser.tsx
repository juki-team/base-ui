import type { PingResponseDTO } from '@juki-team/commons/dto';
import {
  type DataViewMode,
  HTTPMethod,
  type Language,
  type MenuViewMode,
  ProfileSetting,
  Status,
  type Theme,
} from '@juki-team/commons/enums';
import { cleanRequest } from '@juki-team/commons/helpers';
import type { ContentResponse, ErrorResponse, UserSettings } from '@juki-team/commons/types';
import { useCallback, useState } from 'react';
import { jukiApiManager } from '../../settings';
import { useI18nStore } from '../../stores/i18n/useI18nStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { T } from '../atoms/T/T';
import { authorizedRequest } from '../helpers';
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
  setLoader?: SetStatusType;
  onSuccess?: (response: ContentResponse<T>) => void;
  onError?: (response: ErrorResponse) => void;
  onFinally?: (response: ContentResponse<T> | ErrorResponse) => void;
};

type ApiParamsType<T, U> = ApiType<U> & {
  params: T;
};

type ApiBodyType<T, U> = ApiType<U> & {
  body: T;
};

type ApiParamsBodyType<T, U, V> = ApiType<V> & {
  params: T;
  body: U;
};

export const useJukiUser = () => {
  const { notifyResponse, addErrorNotification } = useJukiNotification();
  const userMutate = useUserStore((state) => state.mutate);

  const doRequest = useCallback(
    async <T, M extends Exclude<HTTPMethod, 'GET'>>({
      url,
      options,
      setLoader,
      onSuccess,
      onError,
      onFinally,
    }: ApiType<T> & {
      url: string;
      options?: AuthorizedRequestType<M>;
    }) => {
      setLoader?.(Status.LOADING);
      const response = cleanRequest<ContentResponse<T>>(await authorizedRequest(url, options));
      if (notifyResponse(response, setLoader)) {
        await onSuccess?.(response);
      } else {
        await onError?.(response);
      }
      onFinally?.(response);
    },
    [notifyResponse],
  );

  const signIn = useCallback(
    async ({
      params,
      body,
      onSuccess,
      ...props
    }: ApiParamsBodyType<
      | {
          organizationKey: string;
        }
      | undefined,
      SignInPayloadDTO,
      PingResponseDTO
    >) => {
      const { url, ...options } = jukiApiManager.apiV2.auth.signIn({ body, params });
      const onSuccessWrap = async (response: ContentResponse<PingResponseDTO>) => {
        await userMutate();
        await onSuccess?.(response);
      };
      await doRequest<PingResponseDTO, 'POST'>({ url, options, onSuccess: onSuccessWrap, ...props });
    },
    [doRequest, userMutate],
  );

  const signUp = useCallback(
    async ({
      body,
      onSuccess,
      ...props
    }: ApiBodyType<
      SignUpPayloadDTO & {
        osName: string;
        deviceName: string;
      },
      PingResponseDTO
    >) => {
      const { url, ...options } = jukiApiManager.apiV2.auth.signUp({ body });
      const onSuccessWrap = async (response: ContentResponse<PingResponseDTO>) => {
        await userMutate();
        await onSuccess?.(response);
      };
      await doRequest<PingResponseDTO, 'POST'>({ url, options, onSuccess: onSuccessWrap, ...props });
    },
    [doRequest, userMutate],
  );

  const createUser = useCallback(
    async ({
      params,
      body,
      ...props
    }: ApiParamsBodyType<
      | {
          organizationKey: string;
        }
      | undefined,
      SignUpPayloadDTO & { overwrite: boolean },
      PingResponseDTO
    >) => {
      const { url, ...options } = jukiApiManager.apiV2.auth.createUser({ params, body });
      await doRequest<PingResponseDTO, 'POST'>({ url, options, ...props });
    },
    [doRequest],
  );

  const updateUserProfileData = useCallback(
    async ({
      params,
      body,
      ...props
    }: ApiParamsBodyType<
      {
        nickname: string;
        organizationKey: string;
      },
      UpdateUserProfileDataPayloadDTO,
      string
    >) => {
      const { url, ...options } = jukiApiManager.apiV2.user.updateProfileData({ params, body });
      await doRequest<string, 'PUT'>({ url, options, ...props });
    },
    [doRequest],
  );

  const updateUserProfileImage = useCallback(
    async ({
      params,
      body,
      setLoader,
      onSuccess,
      onError,
      onFinally,
    }: ApiParamsBodyType<
      {
        nickname: string;
        organizationKey: string;
      },
      Blob,
      { signedUrl: string }
    >) => {
      const { url, ...options } = jukiApiManager.apiV2.user.updateProfileImage({
        params,
        body: { contentType: body.type },
      });
      setLoader?.(Status.LOADING);
      const response = cleanRequest<ContentResponse<{ signedUrl: string }>>(await authorizedRequest(url, options));
      if (response.success) {
        try {
          const uploadResponse = await fetch(response.content.signedUrl, {
            method: HTTPMethod.PUT,
            headers: {
              'Content-Type': body.type,
            },
            body,
          });
          if (!uploadResponse.ok) {
            setLoader?.(Status.ERROR);
            onError?.({ success: false, message: 'Error on upload image with signed url', errors: [] });
            onFinally?.(response);
            return;
          }
        } catch (uploadError) {
          setLoader?.(Status.ERROR);
          onError?.({
            success: false,
            message: (uploadError as Error)?.message || 'Unknow error on upload image with signed url',
            errors: [],
          });
          onFinally?.(response);
          return;
        }
      }
      if (notifyResponse(response, setLoader)) {
        onSuccess?.(response);
      } else {
        onError?.(response);
      }
      onFinally?.(response);
    },
    [notifyResponse],
  );

  const updatePassword = useCallback(
    async ({
      body,
      params,
      ...props
    }: ApiParamsBodyType<
      {
        organizationKey: string;
        nickname: string;
      },
      UpdatePasswordPayloadDTO,
      string
    >) => {
      const { url, ...options } = jukiApiManager.apiV2.auth.updatePassword({
        params,
        body,
      });
      await doRequest<string, 'POST'>({ url, options, ...props });
    },
    [doRequest],
  );

  const resetUserPassword = useCallback(
    async ({
      params: { organizationKey, nickname },
      ...props
    }: ApiParamsType<{ organizationKey: string; nickname: string }, string>) => {
      const { url, ...options } = jukiApiManager.apiV2.auth.resetPassword({
        params: { organizationKey, nickname },
      });
      await doRequest<string, 'POST'>({ url, options, ...props });
    },
    [doRequest],
  );

  const logout = useCallback(
    async ({ onError, onFinally, ...props }: ApiType<string>) => {
      const { url, ...options } = jukiApiManager.apiV2.auth.signOut();

      const onFinallyWrap = async (response: ErrorResponse | ContentResponse<string>) => {
        await userMutate();
        await onFinally?.(response);
      };

      const onErrorWrap = async (response: ErrorResponse) => {
        addErrorNotification(<T className="tt-se">force Logout</T>);
        await onError?.(response);
      };

      await doRequest<string, 'POST'>({
        url,
        options,
        onError: onErrorWrap,
        onFinally: onFinallyWrap,
        ...props,
      });
    },
    [addErrorNotification, doRequest, userMutate],
  );

  const deleteUserSession = useCallback(
    async ({ params, ...props }: ApiParamsType<{ sessionId: string }, string>) => {
      const { url, ...options } = jukiApiManager.apiV2.user.deleteSession({ params });
      await doRequest<string, 'DELETE'>({ url, options, ...props });
    },
    [doRequest],
  );

  const updateUserPreferences = useCallback(
    async ({
      params,
      body,
      ...props
    }: ApiParamsBodyType<{ nickname: string; organizationKey: string }, UserSettings, string>) => {
      const { url, ...options } = jukiApiManager.apiV2.user.updatePreferences({ params, body });
      await doRequest<string, 'PUT'>({ url, options, ...props });
    },
    [doRequest],
  );

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
  const i18nChangeLanguage = useI18nStore((state) => state.changeLanguage);
  const setUser = useUserStore((state) => state.setUser);
  const {
    isLogged,
    settings,
    nickname,
    organization: { key: organizationKey },
  } = useUserStore((state) => state.user);
  const mutatePing = useUserStore((state) => state.mutate);
  const { updateUserPreferences } = useJukiUser();
  const [loader, setLoader] = useState<Status>(Status.NONE);
  const setSettings = useCallback(
    async (
      settingsToUpdate: {
        key: ProfileSetting;
        value: string | boolean | number;
      }[],
    ) => {
      const newSettings: UserSettings = { ...settings };
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
          params: { nickname, organizationKey },
          body: { ...newSettings },
          setLoader,
          onSuccess: async () => {
            setLoader?.(Status.LOADING);
            await mutatePing();
            setLoader?.(Status.SUCCESS);
          },
        });
      } else {
        setUser({ settings: newSettings });
      }
      i18nChangeLanguage(newSettings[ProfileSetting.LANGUAGE]);
    },
    [i18nChangeLanguage, isLogged, mutatePing, nickname, setUser, settings, updateUserPreferences, organizationKey],
  );

  const loading = loader === Status.LOADING;

  return {
    ...settings,
    loading,
    setSettings,
  };
};
