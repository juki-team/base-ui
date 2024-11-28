import { consoleInfo, ContentResponseType } from '@juki-team/commons';
import { useEffect } from 'react';
import { authorizedRequest, cleanRequest } from '../helpers';
import { jukiApiManager } from '../settings';
import { useJukiPage } from './useJukiPage';

export const useRunnerServicesWakeUp = () => {
  const { isOnline, isPageFocus, isPageVisible } = useJukiPage();
  useEffect(() => {
    const fun = async (isPageVisible: boolean, isOnline: boolean) => {
      if (isPageVisible && isOnline) {
        const { url, ...options } = jukiApiManager.V1.system.runnerServicesWakeUp();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
      }
    };
    void fun(isPageVisible, isOnline);
    const interval = setInterval(fun, 1000 * 45, isPageVisible, isOnline);
    return () => {
      clearInterval(interval);
    };
  }, [ isOnline, isPageFocus, isPageVisible ]);
};
