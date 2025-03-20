import { useEffect } from 'react';
import { useLastPathStore } from '../stores/lastPath/useLastPath';
import { useRouterStore } from '../stores/router/useRouterStore';

export const useTrackLastPath = (key: string) => {
  
  const pushPath = useLastPathStore(state => state.pushPath);
  
  const pathname = useRouterStore(state => state.pathname);
  const searchParams = useRouterStore(state => state.searchParams);
  useEffect(() => {
    pushPath({ key, pathname, searchParams });
  }, [ key, searchParams, pathname, pushPath ]);
};
