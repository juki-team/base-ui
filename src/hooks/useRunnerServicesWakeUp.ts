import { consoleInfo, ContentResponseType } from '@juki-team/commons';
import { clearInterval } from 'node:timers';
import { useEffect } from 'react';
import { jukiSettings } from '../config';
import { authorizedRequest, cleanRequest } from '../helpers';
import { useJukiPage } from './useJukiPage';

export const useRunnerServicesWakeUp = () => {
  const { isOnline, isPageFocus, isPageVisible } = useJukiPage();
  useEffect(() => {
    const fun = async () => {
      if (isPageVisible && isOnline) {
        const { url, ...options } = jukiSettings.API.system.runnerServicesWakeUp();
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
        consoleInfo('ecs wake up', response);
      }
    };
    
    const interval = setInterval(fun, 1000 * 60);
    
    return () => {
      clearInterval(interval);
    };
  }, [ isOnline, isPageFocus, isPageVisible ]);
};
