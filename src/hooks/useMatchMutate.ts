import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

export function useMatchMutate() {
  const { cache, mutate } = useSWRConfig();
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
    matchMutate,
  };
}
