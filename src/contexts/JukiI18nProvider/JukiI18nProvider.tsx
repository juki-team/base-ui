import { PropsWithChildren, useEffect, useRef } from 'react';
import { useI18nStore } from '../../stores/i18n/useI18nStore';
import { usePageStore } from '../../stores/page/usePageStore';

export const JukiI18nProvider = (props: PropsWithChildren<{}>) => {
  
  const {
    children,
  } = props;
  
  const i18nLoadResources = useI18nStore(state => state.loadResources);
  const isPageVisible = usePageStore(state => state.isVisible);
  const firstRender = useRef(true);
  
  useEffect(() => {
    if (isPageVisible || firstRender.current) {
      void i18nLoadResources();
    }
    firstRender.current = false;
  }, [ i18nLoadResources, isPageVisible ]);
  
  return children;
};
