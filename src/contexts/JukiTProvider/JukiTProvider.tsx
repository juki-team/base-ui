import { consoleInfo, Language, ProfileSetting } from '@juki-team/commons';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useJukiUser } from '../../hooks';
import { TContext } from './context';
import { JukiTProviderProps } from './types';

export const JukiTProvider = ({ i18n, children }: PropsWithChildren<JukiTProviderProps>) => {
  
  const { user } = useJukiUser();
  const [ _, setTrigger ] = useState(Date.now());
  
  const userLanguage = user.settings?.[ProfileSetting.LANGUAGE] === Language.ES ? Language.ES : Language.EN;
  
  useEffect(() => {
    i18n.on('languageChanged', () => setTrigger(Date.now));
  }, []);
  
  useEffect(() => {
    void i18n.changeLanguage(userLanguage);
    consoleInfo(`language changed to ${userLanguage}`);
  }, [ userLanguage ]);
  
  return (
    <TContext.Provider value={{ i18n }}>
      {children}
    </TContext.Provider>
  );
};
