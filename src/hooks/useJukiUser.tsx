import {
  ContentResponseType,
  ErrorResponseType,
  PingResponseDTO,
  Status,
  USER_GUEST,
  UserSettingsType,
} from '@juki-team/commons';
import React, { useCallback, useContext } from 'react';
import { SetLoaderStatusOnClickType, T, useNotification, UserContext } from '../components';
import { settings } from '../config';
import { useMatchMutate } from '../hooks';
import { LoginFormType } from '../integrated-components';
import { authorizedRequest, AuthorizedRequestType, cleanRequest } from '../services';
import { SignUpPayloadDTO, UpdatePasswordPayloadDTO, UpdateUserProfileDataPayloadDTO } from '../types';

type ApiType<T> = {
  setLoader?: SetLoaderStatusOnClickType,
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
  
  const { user, isLoading, setUser, mutate, company } = useContext(UserContext);
  const { notifyResponse, addErrorNotification } = useNotification();
  const { matchMutate } = useMatchMutate();
  
  const refreshAllRequest = useCallback(async () => {
    await matchMutate(new RegExp(`^${settings.UTILS_SERVICE_API_URL}`, 'g'));
  }, [matchMutate]);
  
  const doRequest = useCallback(async <T, >({
    url,
    options,
    setLoader,
    onSuccess,
    onError,
    onFinally,
  }: ApiType<T> & { url: string, options?: AuthorizedRequestType }) => {
    setLoader?.(Status.LOADING);
    const response = cleanRequest<ContentResponseType<T>>(await authorizedRequest(url, options));
    if (notifyResponse(response, setLoader)) {
      await onSuccess?.(response);
    } else {
      await onError?.(response);
    }
    onFinally?.(response);
  }, [notifyResponse]);
  
  const signIn = useCallback(async ({ body, onSuccess, ...props }: ApiBodyType<LoginFormType, PingResponseDTO>) => {
    const { url, ...options } = settings.getAPI().auth.signIn({ body });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorage.setItem(settings.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [doRequest, refreshAllRequest, setUser]);
  
  const signUp = useCallback(async ({ body, onSuccess, ...props }: ApiBodyType<SignUpPayloadDTO, PingResponseDTO>) => {
    const { url, ...options } = settings.getAPI().auth.signUp({ body });
    const onSuccessWrap = async (response: ContentResponseType<PingResponseDTO>) => {
      localStorage.setItem(settings.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      await onSuccess?.(response);
    };
    await doRequest<PingResponseDTO>({ url, options, onSuccess: onSuccessWrap, ...props });
  }, [doRequest, refreshAllRequest, setUser]);
  
  const createUser = useCallback(async ({ body, ...props }: ApiBodyType<SignUpPayloadDTO, PingResponseDTO>) => {
    const { url, ...options } = settings.getAPI().auth.signUp({ body });
    await doRequest<PingResponseDTO>({ url, options, ...props });
  }, [doRequest]);
  
  const updateUserProfileData = useCallback(async ({
    params,
    body,
    ...props
  }: ApiParamsBodyType<{ nickname: string }, UpdateUserProfileDataPayloadDTO, string>) => {
    const { url, ...options } = settings.getAPI().user.updateProfileData({ params, body });
    await doRequest<string>({ url, options, ...props });
  }, [doRequest]);
  
  const updateUserProfileImage = useCallback(async ({
    params,
    body,
    ...props
  }: ApiParamsBodyType<{ nickname: string }, FormData, string>) => {
    const { url, ...options } = settings.getAPI().user.updateProfileImage({ params, body });
    await doRequest<string>({ url, options, ...props });
  }, [doRequest]);
  
  const updatePassword = useCallback(async ({ body, ...props }: ApiBodyType<UpdatePasswordPayloadDTO, string>) => {
    const { url, ...options } = settings.getAPI().auth.updatePassword({ body });
    await doRequest<string>({ url, options, ...props });
  }, [doRequest]);
  
  const resetUserPassword = useCallback(async ({
    params: { nickname },
    ...props
  }: ApiParamsType<{ nickname: string }, string>) => {
    const { url, ...options } = settings.getAPI().auth.resetPassword({ params: { nickname } });
    await doRequest<string>({ url, options, ...props });
  }, [doRequest]);
  
  const logout = useCallback(async ({ onError, onFinally, ...props }: ApiType<string>) => {
    
    const { url, ...options } = settings.getAPI().auth.signOut();
    
    const onFinallyWrap = async (response: ErrorResponseType | ContentResponseType<string>) => {
      localStorage.removeItem(settings.TOKEN_NAME);
      setUser(USER_GUEST);
      await refreshAllRequest();
      await onFinally?.(response);
    };
    
    const onErrorWrap = async (response: ErrorResponseType) => {
      addErrorNotification(<T className="tt-se">force Logout</T>);
      await onError?.(response);
    };
    
    await doRequest<string>({ url, options, onError: onErrorWrap, onFinally: onFinallyWrap, ...props });
  }, [addErrorNotification, doRequest, refreshAllRequest, setUser]);
  
  const deleteUserSession = useCallback(async ({ params, ...props }: ApiParamsType<{ sessionId: string }, string>) => {
    const { url, ...options } = settings.getAPI().user.deleteSession({ params });
    await doRequest<string>({ url, options, ...props });
  }, [doRequest]);
  
  const updateUserPreferences = useCallback(async ({
    params,
    body,
    ...props
  }: ApiParamsBodyType<{ nickname: string }, UserSettingsType, string>) => {
    const { url, ...options } = settings.getAPI().user.updatePreferences({ params, body });
    await doRequest<string>({ url, options, ...props });
  }, [doRequest]);
  
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
    // users
    createUser,
    updateUserProfileData,
    updateUserProfileImage,
    resetUserPassword,
    deleteUserSession,
    updateUserPreferences,
  };
};
