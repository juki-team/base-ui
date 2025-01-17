import { ContentResponseType, ContentsResponseType, HTTPMethod } from '@juki-team/commons';
import { useMemo } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { authorizedRequest, cleanRequest } from '../helpers';
import { jukiApiSocketManager } from '../settings';
import { useJukiUser } from './useJukiUser';

export const fetcherWithToken = ([ url, token ]: [ string, string ]) => {
  return authorizedRequest(url, { token, method: HTTPMethod.GET }, false);
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string | null, config?: SWRConfiguration) => {
  
  const token = jukiApiSocketManager.getToken();
  const { user: { sessionId } } = useJukiUser();
  
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    typeof url === 'string' && url ? [ url, token, sessionId ] : null,
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
