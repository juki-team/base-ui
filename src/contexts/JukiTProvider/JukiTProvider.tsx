import { consoleError, Language } from '@juki-team/commons';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useJukiPage } from '../../hooks/useJukiPage';
import { jukiApiManager } from '../../settings';
import { TContext } from './context';
import { JukiTProviderProps } from './types';

export const JukiTProvider = ({ i18n, children }: PropsWithChildren<JukiTProviderProps>) => {
  
  const [ trigger, setTrigger ] = useState(Date.now());
  const { isPageVisible } = useJukiPage();
  
  useEffect(() => {
    i18n.on('languageChanged', () => setTrigger(Date.now));
  }, [ i18n ]);
  
  useEffect(() => {
    const fun = async () => {
      try {
        const namespace = 'translation';
        const [ dataEN, dataES ] = await Promise.all([
          fetch(jukiApiManager.V1.locale.get({
            params: { locale: Language.EN, namespace },
          }).url).then(res => res.json()),
          fetch(jukiApiManager.V1.locale.get({
            params: { locale: Language.ES, namespace },
          }).url).then(res => res.json()),
        ]);
        i18n.addResourceBundle(Language.EN, namespace, dataEN);
        i18n.addResourceBundle(Language.ES, namespace, dataES);
      } catch (error) {
        consoleError(error);
      }
    };
    
    if (isPageVisible) {
      void fun();
    }
  }, [ i18n, trigger, isPageVisible ]);
  
  const value = useMemo(() => ({ i18n }), [ i18n ]);
  
  return (
    <TContext.Provider value={value}>
      {children}
    </TContext.Provider>
  );
};
