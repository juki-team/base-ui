import React, { PropsWithChildren, useState } from 'react';
import { LastPathContextFn, LastPathContextRef } from './context';
import { LastPathType } from './types';

export interface LastPathProviderProps<T extends string | number> {
  initialLastPath: LastPathType<T>,
}

export const JukiLastPathProvider = <T extends string | number, >({
                                                                    children,
                                                                    initialLastPath,
                                                                  }: PropsWithChildren<LastPathProviderProps<T>>) => {
  if (!LastPathContextRef.current) {
    LastPathContextRef.current = LastPathContextFn<T>(initialLastPath);
  }
  
  const [ lastPath, setLastPath ] = useState<LastPathType<T>>(initialLastPath);
  
  return (
    <LastPathContextRef.current.Provider
      value={{
        pushPath: ({ key, pathname, searchParams }) => setLastPath(prevState => ({
          ...prevState,
          [key]: { pathname, searchParams },
        })),
        lastPath,
      }}
    >
      {children}
    </LastPathContextRef.current.Provider>
  );
};
