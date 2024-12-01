import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { jukiApiSocketManager } from '../settings';

export const useSWR = () => {
  const { cache, mutate } = useSWRConfig();
  const token = jukiApiSocketManager.getToken();
  // @ts-ignore
  const matchMutate = useCallback((matcher, ...args) => {
    if (!(cache instanceof Map)) {
      throw new Error('matchMutate requires the cache provider to be a Map instance');
    }
    
    const keys = [];
    
    for (const key of cache.keys()) {
      if (matcher.test(key)) {
        keys.push(key);
      }
    }
    const mutations = keys.map((key) => mutate(key, ...args));
    return Promise.all(mutations);
  }, [ cache, mutate ]);
  
  return {
    mutate: useCallback((url: string) => mutate([ url, token ]), [ mutate, token ]),
    matchMutate,
  };
};
