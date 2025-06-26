import { consoleInfo, ContentResponseType, ONE_MINUTE } from '@juki-team/commons';
import { useEffect } from 'react';
import { authorizedRequest, cleanRequest } from '../helpers';
import { jukiApiSocketManager } from '../settings';
import { usePageStore } from '../stores/page/usePageStore';

const intervalRef: {
  current: ReturnType<typeof setInterval> | undefined,
  lastRequested: number
} = { current: undefined, lastRequested: 0 };

export const useCheckAndStartServices = () => {
  
  const { isOnline: isPageOnline, isFocus: isPageFocus, isVisible: isPageVisible } = usePageStore();
  
  useEffect(() => {
    const fun = async (isPageVisible: boolean, isOnline: boolean) => {
      if (isPageVisible && isOnline && (Date.now() - intervalRef.lastRequested) >= ONE_MINUTE) {
        intervalRef.lastRequested = Date.now();
        const { url, ...options } = jukiApiSocketManager.API_V1.system.services.checkAndStart();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
        intervalRef.lastRequested = Date.now();
      }
    };
    void fun(isPageVisible, isPageOnline);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fun, ONE_MINUTE, isPageVisible, isPageOnline);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ isPageOnline, isPageFocus, isPageVisible ]);
};
