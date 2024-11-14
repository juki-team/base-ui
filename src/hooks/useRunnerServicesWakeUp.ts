import { consoleInfo, ContentResponseType } from '@juki-team/commons';
import { useEffect } from 'react';
import { jukiSettings } from '../config';
import { authorizedRequest, cleanRequest } from '../helpers';
import { useJukiPage } from './useJukiPage';

export const useRunnerServicesWakeUp = () => {
  const { isOnline, isPageFocus, isPageVisible } = useJukiPage();
  useEffect(() => {
    const fun = async (isPageVisible: boolean, isOnline: boolean) => {
      if (isPageVisible && isOnline) {
        const { url, ...options } = jukiSettings.API.system.runnerServicesWakeUp();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
      }
    };
    
    const interval = setInterval(fun, 1000 * 60, isPageVisible, isOnline);
    
    return () => {
      clearInterval(interval);
    };
  }, [ isOnline, isPageFocus, isPageVisible ]);
};
