import { consoleError, Language } from '@juki-team/commons';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { jukiSettings } from '../../config';
import { TContext } from './context';
import { JukiTProviderProps } from './types';

export const JukiTProvider = ({ i18n, children }: PropsWithChildren<JukiTProviderProps>) => {
  
  const [ trigger, setTrigger ] = useState(Date.now());
  
  useEffect(() => {
    i18n.on('languageChanged', () => setTrigger(Date.now));
  }, [ i18n ]);
  
  useEffect(() => {
    (async () => {
      try {
        const namespace = 'translation';
        const [ dataEN, dataES ] = await Promise.all([
          fetch(jukiSettings.API.locale.get({
            params: { locale: Language.EN, namespace },
          }).url).then(res => res.json()),
          fetch(jukiSettings.API.locale.get({
            params: { locale: Language.ES, namespace },
          }).url).then(res => res.json()),
        ])
        i18n.addResourceBundle(Language.EN, namespace, dataEN);
        i18n.addResourceBundle(Language.ES, namespace, dataES);
        setTimeout(() => setTrigger(Date.now()), 200);
      } catch (error) {
        consoleError(error);
      }
    })();
  }, [ i18n ]);
  
  const value = useMemo(() => ({ i18n }), [ i18n, trigger ]);
  
  return (
    <TContext.Provider value={value}>
      {children}
    </TContext.Provider>
  );
};
