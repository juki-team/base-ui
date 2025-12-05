import { ONE_MINUTE, UserTrackWebSocketEventDTO, WebSocketMessageEvent } from '@juki-team/commons';
import { useEffect } from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';

export const useUserTrack = () => {
  
  const sessionId = useUserStore(store => store.user.sessionId);
  const origin = useRouterStore(store => store.origin);
  const pathname = useRouterStore(store => store.pathname);
  const searchParams = useRouterStore(store => store.searchParams);
  const channelMessages = useWebsocketStore(store => store.channelPublishMessages);
  
  useEffect(() => {
    const track = () => {
      const event: UserTrackWebSocketEventDTO = {
        event: WebSocketMessageEvent.USER_TRACK,
        sessionId,
        href: `${origin}${pathname}?${searchParams.toString()}`,
      };
      void channelMessages?.publish('', event);
    };
    track();
    const interval = setInterval(track, ONE_MINUTE);
    return () => {
      clearInterval(interval);
    };
  }, [ sessionId, origin, pathname, searchParams, channelMessages ]);
  
  return null;
};
