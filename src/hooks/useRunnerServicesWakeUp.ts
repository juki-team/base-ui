import { consoleInfo, ContentResponseType, ONE_MINUTE } from '@juki-team/commons';
import { useEffect } from 'react';
import { authorizedRequest, cleanRequest } from '../helpers';
import { jukiApiSocketManager } from '../settings';
import { useJukiPage } from './useJukiPage';

const intervalRef: {
  current: ReturnType<typeof setInterval> | undefined,
  lastRequested: number
} = { current: undefined, lastRequested: 0 };

export const useRunnerServicesWakeUp = () => {
  const { isOnline, isPageFocus, isPageVisible } = useJukiPage();
  useEffect(() => {
    const fun = async (isPageVisible: boolean, isOnline: boolean) => {
      if (isPageVisible && isOnline && (Date.now() - intervalRef.lastRequested) >= ONE_MINUTE) {
        intervalRef.lastRequested = Date.now();
        const { url, ...options } = jukiApiSocketManager.API_V1.system.runnerServicesWakeUp();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
        intervalRef.lastRequested = Date.now();
      }
    };
    void fun(isPageVisible, isOnline);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fun, ONE_MINUTE, isPageVisible, isOnline);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ isOnline, isPageFocus, isPageVisible ]);
};
