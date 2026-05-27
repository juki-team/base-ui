import { ONE_MINUTE } from '@juki-team/commons/constants';
import type { PingResponseDTO } from '@juki-team/commons/dto';
import type { ContentResponse } from '@juki-team/commons/types';
import { useCallback, useEffect, useRef } from 'react';
import { JUKI_SERVICE_V2_URL } from '../../../constants/settings';
import { jukiApiManager } from '../../../settings';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { isBrowser } from '../../helpers/commons';
import { useFetcher } from '../../hooks/useFetcher';
import { useInjectCompanyStyles } from '../../hooks/useInjectCompanyStyles';
import { useInjectFontSize } from '../../hooks/useInjectFontSize';
import { useInjectTheme } from '../../hooks/useInjectTheme';
import { useMatchMutate } from '../../hooks/useMatchMutate';

export const JukiUserProvider = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setOrganization = useUserStore((state) => state.setOrganization);
  const setDevice = useUserStore((state) => state.setDevice);
  const setMutate = useUserStore((state) => state.setMutate);
  const isLoading = useUserStore((state) => state.isLoading);
  const userNickname = useUserStore((state) => state.user.nickname);
  const organizationKey = useUserStore((state) => state.organization?.key);
  const userSessionId = useUserStore((state) => state.user.sessionId);
  const isOnline = usePageStore((store) => store.isOnline);
  const isFocus = usePageStore((store) => store.isFocus);
  const isVisible = usePageStore((store) => store.isVisible);

  const isFirstRenderForRefresh = useRef(true);
  const isFirstRenderForMutate = useRef(true);

  const {
    data,
    // isLoading: isLoadingPing,
    // isValidating: isValidatingPing,
    mutate,
  } = useFetcher<ContentResponse<PingResponseDTO>>(jukiApiManager.apiV2.auth.ping().url, { refreshInterval: ONE_MINUTE * 5 });

  const matchMutate = useMatchMutate();

  const refreshAllRequest = useCallback(async () => {
    await matchMutate(new RegExp(`${JUKI_SERVICE_V2_URL}`));
  }, [matchMutate]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: userNickname/organizationKey/userSessionId are change triggers (not read inside) to refresh SWR cache when user identity changes
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isFirstRenderForRefresh.current) {
      isFirstRenderForRefresh.current = false;
      return;
    }
    void refreshAllRequest();
  }, [userNickname, organizationKey, userSessionId, refreshAllRequest, isLoading]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: isOnline is a change trigger to re-run when connectivity returns
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isFirstRenderForMutate.current) {
      isFirstRenderForMutate.current = false;
      return;
    }

    if (isFocus && isVisible) {
      void mutate();
    }
  }, [mutate, isOnline, isFocus, isVisible, isLoading]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data?.success) {
      setOrganization(data.content.organization);
      setUser(data.content.user);
    }
  }, [data, setOrganization, setUser]);

  useEffect(() => {
    if (isBrowser()) {
      import('react-device-detect').then((mod) => {
        setDevice({
          type: mod.deviceType,
          isMobile: mod.isMobile,
          isBrowser: mod.isBrowser,
          label: mod.isMobile ? `${mod.mobileModel} ${mod.mobileVendor}` : `${mod.browserName} ${mod.browserVersion}`,
          osLabel: `${mod.osName} ${mod.osVersion}`,
        });
      });
    }
    setMutate(mutate);
  }, [mutate, setDevice, setMutate]);

  useInjectTheme();
  useInjectFontSize();
  useInjectCompanyStyles();

  return null;
};
