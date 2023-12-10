import React, { PropsWithChildren } from 'react';
import { TContext } from './context';
import { JukiTProviderProps } from './types';

export const JukiTProvider = (props: PropsWithChildren<JukiTProviderProps>) => {
  
  const { t = (key: string) => key, children } = props;
  
  return (
    <TContext.Provider value={{ t }}>
      {children}
    </TContext.Provider>
  );
};
