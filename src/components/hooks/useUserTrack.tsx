import { UserTrackWebSocketEventDTO, WebSocketMessageEvent } from '@juki-team/commons';
import { useEffect } from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketMessages } from './useWebsocketMessages';

export const useUserTrack = () => {
  
  const sessionId = useUserStore(store => store.user.sessionId);
  const origin = useRouterStore(store => store.origin);
  const pathname = useRouterStore(store => store.pathname);
  const searchParams = useRouterStore(store => store.searchParams);
  
  const channel = useWebsocketMessages();
  
  useEffect(() => {
    const event: UserTrackWebSocketEventDTO = {
      event: WebSocketMessageEvent.USER_TRACK,
      sessionId,
      href: `${origin}${pathname}?${searchParams.toString()}`,
    };
    void channel.publish('', event);
  }, [ sessionId, origin, pathname, searchParams, channel ]);
  return null;
};
