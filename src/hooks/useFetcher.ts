import { ContentResponseType, ContentsResponseType, HTTPMethod } from '@juki-team/commons';
import { useMemo } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { authorizedRequest, cleanRequest, getLocalToken } from '../helpers';
import { useJukiUser } from './useJukiUser';

const fetcherWithToken = ([ url, token ]: [ string, string ]) => {
  return authorizedRequest(url, { token, method: HTTPMethod.GET });
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string | null, config?: SWRConfiguration) => {
  
  const token = getLocalToken();
  const { user: { sessionId } } = useJukiUser();
  
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    typeof url === 'string' ? [ url, token, sessionId ] : null,
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
