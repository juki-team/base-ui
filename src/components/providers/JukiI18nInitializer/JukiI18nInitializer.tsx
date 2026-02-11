import { useEffect } from 'react';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';

export const JukiI18nInitializer = () => {
  
  const i18nLoadResources = useI18nStore(state => state.loadResources);
  
  useEffect(() => {
    void i18nLoadResources();
  }, [ i18nLoadResources ]);
  
  return null;
};
