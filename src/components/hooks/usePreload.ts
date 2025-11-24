import { useCallback } from 'react';
import { preload } from 'swr';
import { useUserStore } from '../../stores/user/useUserStore';
import { fetcher, getUrlKey } from './useFetcher';

export const usePreload = () => {
  
  const userSessionId = useUserStore(state => state.user.sessionId);
  
  return useCallback((url: string) => preload(getUrlKey(url, userSessionId), fetcher), [ userSessionId ]);
};
