import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { getLocalToken } from '../helpers';

export const useSWR = () => {
  const { mutate } = useSWRConfig();
  const token = getLocalToken();
  return {
    mutate: useCallback((url: string) => mutate([ url, token ]), [ mutate, token ]),
  };
};
