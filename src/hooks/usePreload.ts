import { useCallback } from 'react';
import { preload } from 'swr';
import { jukiApiSocketManager } from '../settings';
import { fetcherWithToken } from './useFetcher';
import { useJukiUser } from './useJukiUser';

export const usePreload = () => {
  
  const { user: { sessionId } } = useJukiUser();
  const token = jukiApiSocketManager.getToken();
  
  return useCallback((url: string) => preload(typeof url === 'string' && url ? [ url, token, sessionId ] : null, fetcherWithToken), [ token, sessionId ]);
};
