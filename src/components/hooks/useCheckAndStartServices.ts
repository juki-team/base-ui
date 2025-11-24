import { cleanRequest, consoleInfo, type ContentResponseType, ONE_MINUTE } from '@juki-team/commons';
import { useEffect } from 'react';
import { jukiApiManager } from '../../settings';
import { usePageStore } from '../../stores/page/usePageStore';
import { authorizedRequest, isDev } from '../helpers';

export const useCheckAndStartServices = () => {
  
  const isPageOnline = usePageStore(store => store.isOnline);
  const isPageFocus = usePageStore(store => store.isFocus);
  const isPageVisible = usePageStore(store => store.isVisible);
  
  useEffect(() => {
    const fun = async (isPageVisible: boolean, isPageOnline: boolean, isPageFocus: boolean) => {
      if (isDev()) {
        return;
      }
      const lastRequested = +(localStorage.getItem('lastRequestedServicesCheck') || '0');
      if (isPageVisible && isPageOnline && isPageFocus && (Date.now() - lastRequested) >= ONE_MINUTE) {
        localStorage.setItem('lastRequestedServicesCheck', Date.now().toString());
        const { url, ...options } = jukiApiManager.API_V1.system.services.checkAndStart();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
        localStorage.setItem('lastRequestedServicesCheck', Date.now().toString());
      }
    };
    void fun(isPageVisible, isPageOnline, isPageFocus);
    
    const interval = setInterval(fun, ONE_MINUTE, isPageVisible, isPageOnline, isPageFocus);
    return () => {
      clearInterval(interval);
    };
  }, [ isPageOnline, isPageFocus, isPageVisible ]);
};
