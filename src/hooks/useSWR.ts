import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { settings } from '../config';

export const useSWR = () => {
  const { mutate } = useSWRConfig();
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(settings.TOKEN_NAME) || '';
  }
  return {
    mutate: useCallback((url: string) => mutate([ url, token ]), [ mutate, token ]),
  };
};
