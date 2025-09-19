import { ContentResponseType, ContentsResponseType, HTTPMethod } from '@juki-team/commons';
import { useMemo } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { cleanRequest, getAuthorizedRequest } from '../helpers';
import { jukiApiManager } from '../settings';
import { useUserStore } from '../stores/user/useUserStore';

export const fetcherWithToken = ([ url, token ]: [ string, string ]) => {
  return getAuthorizedRequest(url, { token, method: HTTPMethod.GET }, false);
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string | null, config?: SWRConfiguration) => {
  
  const token = jukiApiManager.getToken();
  const userSessionId = useUserStore(state => state.user.sessionId);
  
  const swrKey = useMemo(() => {
    return typeof url === 'string' && url ? [ url, token, userSessionId ] : null;
  }, [ url, token, userSessionId ]);
  
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    swrKey,
    fetcherWithToken,
    config,
  );
  
  return {
    data: useMemo(() => data ? cleanRequest<T>(data) : undefined, [ data ]),
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
