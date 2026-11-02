import { getParamsOfClientId } from '@juki-team/commons';
import { useEffect } from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { setOwnPresenceData } from '../../stores/websocket/topicChannels';

const UPDATE_DELAY_MS = 1000;

/**
 * Keeps the page of this tab in the presence of its company (see topicChannels.ts).
 * Ably sends the `leave` by itself when the connection closes.
 */
export const useOwnPresence = () => {
  const clientId = useUserStore((store) => store.clientId);
  const origin = useRouterStore((store) => store.origin);
  const pathname = useRouterStore((store) => store.pathname);
  const searchParams = useRouterStore((store) => store.searchParams);

  useEffect(() => {
    const { uiId } = getParamsOfClientId(clientId);
    const href = `${origin}${pathname}?${searchParams.toString()}`;
    // debounced: a navigation can change the route several times in a row
    const timeout = setTimeout(() => setOwnPresenceData({ href, uiId }), UPDATE_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [clientId, origin, pathname, searchParams]);
};
