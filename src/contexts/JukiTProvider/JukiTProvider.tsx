import React, { PropsWithChildren, useEffect, useState } from 'react';
import { TContext } from './context';
import { JukiTProviderProps } from './types';

export const JukiTProvider = ({ i18n, children }: PropsWithChildren<JukiTProviderProps>) => {
  
  const [ _, setTrigger ] = useState(Date.now());
  
  useEffect(() => {
    i18n.on('languageChanged', () => setTrigger(Date.now));
  }, []);
  
  return (
    <TContext.Provider value={{ i18n }}>
      {children}
    </TContext.Provider>
  );
};
