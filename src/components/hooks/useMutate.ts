import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

export const useMutate = () => {
  
  const { cache, mutate } = useSWRConfig();
  
  return useCallback((_matcher: RegExp | string) => {
    if (!(cache instanceof Map)) {
      throw new Error('matchMutate requires the cache provider to be a Map instance');
    }
    
    const matcher = typeof _matcher === 'string' ? new RegExp(_matcher) : _matcher;
    
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
  }, [ cache, mutate ]); //  cache, mutate are stables
};
