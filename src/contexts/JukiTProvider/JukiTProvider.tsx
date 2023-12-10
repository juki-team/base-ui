import { Language, ProfileSetting } from '@juki-team/commons';
import React, { PropsWithChildren, useEffect } from 'react';
import { useJukiUser } from '../../hooks';
import { TContext } from './context';
import { JukiTProviderProps } from './types';

export const JukiTProvider = ({ i18n, children }: PropsWithChildren<JukiTProviderProps>) => {
  
  const { user } = useJukiUser();
  
  const userLanguage = user.settings?.[ProfileSetting.LANGUAGE] === Language.ES ? Language.ES : Language.EN;
  
  useEffect(() => {
    void i18n.changeLanguage(userLanguage);
  }, [ userLanguage ]);
  
  return (
    <TContext.Provider value={{ i18n }}>
      {children}
    </TContext.Provider>
  );
};
