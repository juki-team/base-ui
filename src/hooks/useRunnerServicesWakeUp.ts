import { consoleInfo, ContentResponseType } from '@juki-team/commons';
import { useEffect } from 'react';
import { authorizedRequest, cleanRequest } from '../helpers';
import { jukiApiSocketManager } from '../settings';
import { useJukiPage } from './useJukiPage';

const intervalRef: { current: ReturnType<typeof setInterval> | undefined } = { current: undefined };

export const useRunnerServicesWakeUp = () => {
  const { isOnline, isPageFocus, isPageVisible } = useJukiPage();
  useEffect(() => {
    const fun = async (isPageVisible: boolean, isOnline: boolean) => {
      if (isPageVisible && isOnline) {
        const { url, ...options } = jukiApiSocketManager.API_V1.system.runnerServicesWakeUp();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
      }
    };
    void fun(isPageVisible, isOnline);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fun, 1000 * 60, isPageVisible, isOnline);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ isOnline, isPageFocus, isPageVisible ]);
};
