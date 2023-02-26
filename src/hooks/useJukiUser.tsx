import { ContentResponseType, ErrorResponseType, PingResponseDTO, Status } from '@juki-team/commons';
import { useCallback, useContext } from 'react';
import { SetLoaderStatusOnClickType, useNotification, UserContext } from '../components';
import { settings } from '../config';
import { useMatchMutate } from '../hooks';
import { LoginFormType, SignUpFormType } from '../integrated-components';
import { authorizedRequest, cleanRequest } from '../services';

type OnResponseActionsType<T> = { onSuccess?: (response: ContentResponseType<T>) => void, onError?: (response: ErrorResponseType) => void };

export const useJukiUser = () => {
  
  const { user, isLoading, setUser, mutate, company } = useContext(UserContext);
  const { notifyResponse } = useNotification();
  const { matchMutate } = useMatchMutate();
  
  const refreshAllRequest = useCallback(async () => {
    await matchMutate(new RegExp(`^${settings.UTILS_SERVICE_API_URL}`, 'g'));
  }, [matchMutate]);
  
  const signIn = useCallback(async (data: LoginFormType, setLoader: SetLoaderStatusOnClickType, {
    onError,
    onSuccess,
  }: OnResponseActionsType<PingResponseDTO>) => {
    setLoader?.(Status.LOADING);
    const { url, ...options } = settings.getAPI().auth.signIn(data);
    const response = cleanRequest<ContentResponseType<PingResponseDTO>>(await authorizedRequest(url, options));
    if (notifyResponse(response, setLoader)) {
      localStorage.setItem(settings.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      onSuccess?.(response);
    } else {
      onError?.(response);
    }
  }, [notifyResponse, refreshAllRequest, setUser]);
  
  const signUp = useCallback(async (data: SignUpFormType, setLoader: SetLoaderStatusOnClickType, {
    onError, onSuccess,
  }: OnResponseActionsType<PingResponseDTO>) => {
    setLoader?.(Status.LOADING);
    const { url, ...options } = settings.getAPI().auth.signUp(data);
    const response = cleanRequest<ContentResponseType<PingResponseDTO>>(await authorizedRequest(url, options));
    if (notifyResponse(response, setLoader)) {
      localStorage.setItem(settings.TOKEN_NAME, response.content.user.sessionId);
      setUser({ ...response.content.user, isLogged: true });
      await refreshAllRequest();
      onSuccess?.(response);
    } else {
      onError?.(response);
    }
  }, [notifyResponse, refreshAllRequest, setUser]);
  
  return {
    company,
    user,
    setUser,
    isLoading,
    mutate,
    refreshAllRequest,
    signIn,
    signUp,
  };
};
