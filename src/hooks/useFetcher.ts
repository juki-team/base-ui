import { useMemo } from 'react';
import useSWR from 'swr';
import { authorizedRequest, cleanRequest } from '../services';
import { ContentResponseType, ContentsResponseType, HTTPMethod } from '../types';

export type UseFetcherOptionsType = {
  revalidateIfStale?: boolean,
  revalidateOnFocus?: boolean,
  revalidateOnReconnect?: boolean,
  refreshInterval?: number,
}

const fetcher = (url: string, method?: HTTPMethod, body?: string, signal?: AbortSignal) => {
  return authorizedRequest(url, { method, body, signal });
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string, options?: UseFetcherOptionsType, debug?: boolean) => {
  
  const {
    revalidateIfStale = true,
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    refreshInterval,
  } = options || {};
  
  const { data, error, mutate, isValidating } = useSWR(url, fetcher, {
    revalidateIfStale,
    revalidateOnFocus,
    revalidateOnReconnect,
    refreshInterval,
  });
  
  return useMemo(() => ({
    data: data ? cleanRequest<T>(data) : undefined,
    error,
    isLoading: error === undefined && data === undefined,
    mutate,
    isValidating,
  }), [data, error, mutate, isValidating]);
};
