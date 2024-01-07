import { useContext, useEffect } from 'react';
import { LastPathContextRef } from '../contexts/JukiLastPathProvider/context';
import { useJukiRouter } from './useJukiRouter';

export const useLastPath = () => {
  const { lastPath, pushPath } = useContext(LastPathContextRef.current!);
  return { lastPath, pushPath };
};

export const useTrackLastPath = (key: string) => {
  const { pushPath } = useContext(LastPathContextRef.current!);
  const { pathname, searchParams } = useJukiRouter();
  useEffect(() => {
    pushPath({ key, pathname, searchParams });
  }, [ key, searchParams, pathname ]);
};
