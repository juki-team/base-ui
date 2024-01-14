import React, { PropsWithChildren, useMemo, useState } from 'react';
import { LastPathContextFn, LastPathContextRef } from './context';
import { LastPathContextInterface, LastPathType } from './types';

export interface LastPathProviderProps<T extends string | number> {
  initialLastPath: LastPathType<T>,
}

export const JukiLastPathProvider = <T extends string | number, >(props: PropsWithChildren<LastPathProviderProps<T>>) => {
  
  const { children, initialLastPath } = props;
  
  if (!LastPathContextRef.current) {
    LastPathContextRef.current = LastPathContextFn<T>(initialLastPath);
  }
  
  const [ lastPath, setLastPath ] = useState<LastPathType<T>>(initialLastPath);
  
  const value: LastPathContextInterface<T> = useMemo(() => ({
    pushPath: ({ key, pathname, searchParams }) => setLastPath(prevState => ({
      ...prevState,
      [key]: { pathname, searchParams },
    })),
    lastPath,
  }), [ lastPath, setLastPath ]);
  
  return (
    <LastPathContextRef.current.Provider value={value}>
      {children}
    </LastPathContextRef.current.Provider>
  );
};
