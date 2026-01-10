import { useEffect } from 'react';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import { usePageStore } from '../../../stores/page/usePageStore';

export const JukiI18nInitializer = () => {
  
  const i18nLoadResources = useI18nStore(state => state.loadResources);
  const isOnline = usePageStore(store => store.isOnline);
  const isFocus = usePageStore(store => store.isFocus);
  const isVisible = usePageStore(store => store.isVisible);
  
  useEffect(() => {
    if (isOnline && isFocus && isVisible) {
      void i18nLoadResources();
    }
  }, [ i18nLoadResources, isOnline, isFocus, isVisible ]);
  
  return null;
};
