import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { settings } from '../config';
import { authorizedRequest, AuthorizedRequestType, cleanRequest } from '../services';

export type UseFetcherOptionsType = {
  revalidateIfStale?: boolean,
  revalidateOnFocus?: boolean,
  revalidateOnReconnect?: boolean,
  refreshInterval?: number,
}

const fetcherWithToken = (url: string, props: AuthorizedRequestType) => {
  return authorizedRequest(url, props);
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string, options?: UseFetcherOptionsType) => {
  
  const {
    revalidateIfStale = true,
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    refreshInterval,
  } = options || {};
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(settings.TOKEN_NAME) || '';
  }
  
  const { data, error, mutate, isValidating } = useSWR(url ? [url, { token }] : null, fetcherWithToken, {
    revalidateIfStale,
    revalidateOnFocus,
    revalidateOnReconnect,
    refreshInterval,
  });
  
  useEffect(() => {
    if (error) {
      settings.reportError({ url, token });
    }
  }, [error, url, token]);
  
  return useMemo(() => ({
    data: data ? cleanRequest<T>(data) : undefined,
    error,
    isLoading: error === undefined && data === undefined,
    mutate,
    isValidating,
  }), [data, error, mutate, isValidating]);
};
