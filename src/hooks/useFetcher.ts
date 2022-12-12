import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import { useMemo } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { settings } from '../config';
import { authorizedRequest, cleanRequest } from '../services';

const fetcherWithToken = ([url, token]: [string, string]) => {
  return authorizedRequest(url, { token });
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string, config?: SWRConfiguration) => {
  
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(settings.TOKEN_NAME) || '';
  }
  
  const { data, error, mutate, isValidating, isLoading } = useSWR(url ? [url, token] : null, fetcherWithToken, config);
  
  return useMemo(() => ({
    data: data ? cleanRequest<T>(data) : undefined,
    error,
    isLoading,
    mutate,
    isValidating,
  }), [data, error, isLoading, mutate, isValidating]);
};
