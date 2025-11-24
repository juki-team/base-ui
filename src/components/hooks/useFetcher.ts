import { cleanRequest, type ContentResponseType, type ContentsResponseType } from '@juki-team/commons';
import { useMemo } from 'react';
import useSWR, { type SWRConfiguration } from 'swr';
import { useUserStore } from '../../stores/user/useUserStore';
import { getAuthorizedRequest } from '../helpers';

export const fetcher = ([ url ]: [ string ]) => {
  return getAuthorizedRequest(url, {}, false);
};

export const getUrlKey = (url: string | null | undefined, userSessionId: string) => {
  return (typeof url === 'string' && url) ? [ url, userSessionId ] : null;
};

export const useFetcher = <T extends (ContentResponseType<unknown> | ContentsResponseType<unknown>)>(url?: string | null, config?: SWRConfiguration) => {
  
  const userSessionId = useUserStore(state => state.user.sessionId);
  
  const swrKey = getUrlKey(url, userSessionId);
  
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    swrKey,
    fetcher,
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
