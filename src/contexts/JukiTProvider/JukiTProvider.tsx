import { consoleError, Language } from '@juki-team/commons';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { jukiSettings } from '../../config';
import { TContext } from './context';
import { JukiTProviderProps } from './types';

export const JukiTProvider = ({ i18n, children }: PropsWithChildren<JukiTProviderProps>) => {
  
  const [ _, setTrigger ] = useState(Date.now());
  
  useEffect(() => {
    i18n.on('languageChanged', () => setTrigger(Date.now));
  }, []);
  
  useEffect(() => {
    (async () => {
      try {
        const namespace = 'translation';
        const [ dataEN, dataES ] = await Promise.all([
          fetch(jukiSettings.getAPI().locale.get({
            params: { locale: Language.EN, namespace },
          }).url).then(res => res.json()),
          fetch(jukiSettings.getAPI().locale.get({
            params: { locale: Language.ES, namespace },
          }).url).then(res => res.json()),
        ])
        i18n.addResourceBundle(Language.EN, namespace, dataEN);
        i18n.addResourceBundle(Language.ES, namespace, dataES);
      } catch (error) {
        consoleError(error);
      }
    })();
  }, []);
  
  return (
    <TContext.Provider value={{ i18n }}>
      {children}
    </TContext.Provider>
  );
};
