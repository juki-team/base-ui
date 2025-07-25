import { PropsWithChildren, useEffect } from 'react';
import { jukiApiManager } from '../../settings';
import { useI18nStore } from '../../stores/i18n/useI18nStore';
import { usePageStore } from '../../stores/page/usePageStore';

export const JukiI18nProvider = (props: PropsWithChildren<{}>) => {
  
  const {
    children,
  } = props;
  
  const i18nLoadResources = useI18nStore(state => state.loadResources);
  const isPageVisible = usePageStore(state => state.isVisible);
  
  useEffect(() => {
    if (isPageVisible) {
      void i18nLoadResources();
    }
    
    const reload = () => {
      void i18nLoadResources();
    };
    
    jukiApiManager.on('apiSettingsChanged', reload);
    
    return () => {
      jukiApiManager.off('apiSettingsChanged', reload);
    };
  }, [ i18nLoadResources, isPageVisible ]);
  
  return children;
};
