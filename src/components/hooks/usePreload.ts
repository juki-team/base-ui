import { useCallback } from 'react';
import { preload } from 'swr';
import { jukiApiManager } from '../../settings';
import { useUserStore } from '../../stores/user/useUserStore';
import { fetcherWithToken } from './useFetcher';

export const usePreload = () => {
  
  const userSessionId = useUserStore(state => state.user.sessionId);
  const token = jukiApiManager.getToken();
  
  return useCallback((url: string) => preload(typeof url === 'string' && url ? [ url, token, userSessionId ] : null, fetcherWithToken), [ token, userSessionId ]);
};
