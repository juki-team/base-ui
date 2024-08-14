import { consoleInfo, ContentResponseType } from '@juki-team/commons';
import { useEffect } from 'react';
import { jukiSettings } from '../config';
import { authorizedRequest, cleanRequest } from '../helpers';
import { useJukiPage } from './useJukiPage';
import { useJukiRouter } from './useJukiRouter';

export const useEcsWakeUp = () => {
  const { isOnline, isPageFocus, isPageVisible } = useJukiPage();
  const { pathname } = useJukiRouter();
  useEffect(() => {
    const fun = async () => {
      const { url, ...options } = jukiSettings.API.system.aws.ecsPostWakeUp();
      const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(url, options));
      consoleInfo('ecs wake up', response);
    };
    if (isPageVisible && isOnline) {
      void fun();
    }
  }, [ isOnline, isPageFocus, isPageVisible, pathname ]);
};
