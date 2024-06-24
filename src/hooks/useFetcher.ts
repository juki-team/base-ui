import { ContentResponseType, ContentsResponseType, HTTPMethod } from '@juki-team/commons';
import { useMemo } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { authorizedRequest, cleanRequest, getLocalToken } from '../helpers';

const fetcherWithToken = ([ url, token ]: [ string, string ]) => {
  return authorizedRequest(url, { token, method: HTTPMethod.GET });
};

const fetcherWithTokenWithBody = (body: string) => ([ url, token ]: [ string, string ]) => {
  return authorizedRequest(url, { token, method: HTTPMethod.GET, body });
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string | null, config?: SWRConfiguration & {
  body?: string
}) => {
  
  const token = getLocalToken();
  
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    typeof url === 'string' ? [ url, token ] : null,
    config?.body ? fetcherWithTokenWithBody(config.body) : fetcherWithToken,
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
