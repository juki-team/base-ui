import { ONE_MINUTE } from '@juki-team/commons/constants';
import { cleanRequest, consoleInfo } from '@juki-team/commons/helpers';
import type { ContentResponse } from '@juki-team/commons/types';
import { useEffect } from 'react';
import { jukiApiManager } from '../../settings';
import { usePageStore } from '../../stores/page/usePageStore';
import { isDev } from '../helpers/commons';
import { authorizedRequest } from '../helpers/fetch';

export const useCheckAndStartServices = () => {
  const isLive = usePageStore((store) => store.isOnline && store.isFocus && store.isVisible);

  useEffect(() => {
    if (!isLive) {
      return;
    }

    const fun = async () => {
      if (isDev()) {
        return;
      }
      const lastRequested = +(localStorage.getItem('lastRequestedServicesCheck') || '0');
      if (Date.now() - lastRequested >= ONE_MINUTE) {
        localStorage.setItem('lastRequestedServicesCheck', Date.now().toString());
        const { url, ...options } = jukiApiManager.apiV2.system.services.checkAndStart();
        const response = cleanRequest<ContentResponse<string>>(await authorizedRequest(url, options));
        consoleInfo('runner services wake up requested', response);
      }
    };
    void fun();

    const interval = setInterval(fun, ONE_MINUTE);

    return () => {
      clearInterval(interval);
    };
  }, [isLive]);
};
