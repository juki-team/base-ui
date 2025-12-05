import { ONE_MINUTE, UserTrackWebSocketEventDTO, WebSocketMessageEvent } from '@juki-team/commons';
import { useEffect } from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';

export const useUserTrack = () => {
  
  const clientId = useUserStore(store => store.clientId);
  const origin = useRouterStore(store => store.origin);
  const pathname = useRouterStore(store => store.pathname);
  const searchParams = useRouterStore(store => store.searchParams);
  const channelMessages = useWebsocketStore(store => store.channelPublishMessages);
  
  useEffect(() => {
    const track = () => {
      const event: UserTrackWebSocketEventDTO = {
        event: WebSocketMessageEvent.USER_TRACK,
        clientId,
        href: `${origin}${pathname}?${searchParams.toString()}`,
      };
      void channelMessages?.publish('', event);
    };
    track();
    const interval = setInterval(track, ONE_MINUTE);
    return () => {
      clearInterval(interval);
    };
  }, [ clientId, origin, pathname, searchParams, channelMessages ]);
  
  return null;
};
