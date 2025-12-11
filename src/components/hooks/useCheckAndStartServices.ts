import { cleanRequest, consoleInfo, type ContentResponseType, ONE_MINUTE } from '@juki-team/commons';
import { useEffect } from 'react';
import { jukiApiManager } from '../../settings';
import { usePageStore } from '../../stores/page/usePageStore';
import { authorizedRequest, isDev } from '../helpers';

export const useCheckAndStartServices = () => {
  
  const isLive = usePageStore(store => store.isOnline && store.isFocus && store.isVisible);
  
  useEffect(() => {
    
    if (!isLive) {
      return;
    }
    
    const fun = async () => {
      if (isDev()) {
        return;
      }
      const lastRequested = +(localStorage.getItem('lastRequestedServicesCheck') || '0');
      if ((Date.now() - lastRequested) >= ONE_MINUTE) {
        localStorage.setItem('lastRequestedServicesCheck', Date.now().toString());
        const { url, ...options } = jukiApiManager.API_V2.system.services.checkAndStart();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
        localStorage.setItem('lastRequestedServicesCheck', Date.now().toString());
      }
    };
    void fun();
    
    const interval = setInterval(fun, ONE_MINUTE);
    
    return () => {
      clearInterval(interval);
    };
  }, [ isLive ]);
};
