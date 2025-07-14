import { consoleInfo, ContentResponseType, ONE_MINUTE } from '@juki-team/commons';
import { useEffect, useRef } from 'react';
import { authorizedRequest, cleanRequest } from '../helpers';
import { jukiApiManager } from '../settings';
import { usePageStore } from '../stores/page/usePageStore';

export const useCheckAndStartServices = () => {
  
  const isPageOnline = usePageStore(store => store.isOnline);
  const isPageFocus = usePageStore(store => store.isFocus);
  const isPageVisible = usePageStore(store => store.isVisible);
  
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  
  useEffect(() => {
    const fun = async (isPageVisible: boolean, isOnline: boolean) => {
      const lastRequested = +(localStorage.getItem('lastRequestedServicesCheck') || '0');
      if (isPageVisible && isOnline && (Date.now() - lastRequested) >= ONE_MINUTE) {
        localStorage.setItem('lastRequestedServicesCheck', Date.now().toString());
        const { url, ...options } = jukiApiManager.API_V1.system.services.checkAndStart();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
        localStorage.setItem('lastRequestedServicesCheck', Date.now().toString());
      }
    };
    void fun(isPageVisible, isPageOnline);
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fun, ONE_MINUTE, isPageVisible, isPageOnline);
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [ isPageOnline, isPageFocus, isPageVisible ]);
};
