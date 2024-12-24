import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { jukiApiSocketManager } from '../settings';

export const useSWR = () => {
  const { cache, mutate } = useSWRConfig();
  const token = jukiApiSocketManager.getToken();
  const matchMutate = useCallback((matcher: RegExp) => {
    if (!(cache instanceof Map)) {
      throw new Error('matchMutate requires the cache provider to be a Map instance');
    }
    
    const keys = [];
    const allKeys = [];
    for (const key of cache.keys()) {
      allKeys.push(key);
      if (matcher.test(key)) {
        keys.push(key);
      }
    }
    const mutations = keys.map((key) => mutate(key));
    return Promise.all(mutations);
  }, [ cache, mutate ]);
  
  return {
    mutate: useCallback((url: string) => mutate([ url, token ]), [ mutate, token ]),
    matchMutate,
  };
};
