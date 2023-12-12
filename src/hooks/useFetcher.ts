import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import { useMemo } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { jukiSettings } from '../config';
import { authorizedRequest, cleanRequest } from '../helpers';

const fetcherWithToken = ([ url, token ]: [ string, string ]) => {
  return authorizedRequest(url, { token });
};

export const useFetcher = <T extends (ContentResponseType<any> | ContentsResponseType<any>)>(url?: string | null, config?: SWRConfiguration) => {
  
  let token = '';
  
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(jukiSettings.TOKEN_NAME) || '';
  }
  
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    typeof url === 'string' ? [ url, token ] : null,
    fetcherWithToken,
    config,
  );
  
  return useMemo(() => ({
    data: data ? cleanRequest<T>(data) : undefined,
    error,
    isLoading,
    mutate,
    isValidating,
  }), [ data, error, isLoading, mutate, isValidating ]);
};
