import { consoleWarn } from '@juki-team/commons';
import { createContext, useContext, useEffect } from 'react';
import { LastPathContextRef } from '../contexts/JukiLastPathProvider/context';
import { LastPathContextInterface, LastPathType } from '../contexts/JukiLastPathProvider/types';
import { useJukiRouter } from './useJukiRouter';

const defaultContext = <T extends string | number, >() => createContext<LastPathContextInterface<T>>({
  pushPath: () => null,
  lastPath: {} as LastPathType<T>,
});

export const useLastPath = <T extends string | number, >() => {
  
  if (!LastPathContextRef.current) {
    consoleWarn('last path context not initialized');
  }
  
  const { lastPath, pushPath } = useContext(LastPathContextRef.current || defaultContext());
  
  return { lastPath, pushPath };
};

export const useTrackLastPath = (key: string) => {
  
  if (!LastPathContextRef.current) {
    consoleWarn('last path context not initialized');
  }
  
  const { pushPath } = useContext(LastPathContextRef.current || defaultContext());
  
  const { pathname, searchParams } = useJukiRouter();
  
  useEffect(() => {
    pushPath({ key, pathname, searchParams });
  }, [ key, searchParams, pathname ]);
};
