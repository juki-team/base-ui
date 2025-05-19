import { useEffect } from 'react';
import { useLastPathStore } from '../stores/lastPath/useLastPath';
import { useRouterStore } from '../stores/router/useRouterStore';
import { useStore } from './useStore';

export const useTrackLastPath = (key: string) => {
  console.log('useTrackLastPath', { key });
  const pushPath = useStore(useLastPathStore, (state => state.pushPath));
  const pathname = useRouterStore(state => state.pathname);
  const searchParams = useRouterStore(state => state.searchParams);
  console.log('useTrackLastPath', { pushPath, pathname, searchParams });
  useEffect(() => {
    pushPath?.({ key, pathname, searchParams });
  }, [ key, searchParams, pathname, pushPath ]);
};
