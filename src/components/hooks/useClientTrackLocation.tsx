import { ClientTrackLocationWebSocketEventDTO, ONE_MINUTE, WebSocketMessageEvent } from '@juki-team/commons';
import { useEffect } from 'react';
import { usePageStore } from '../../stores/page/usePageStore';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';

export const useClientTrackLocation = () => {
  
  const clientId = useUserStore(store => store.clientId);
  const origin = useRouterStore(store => store.origin);
  const pathname = useRouterStore(store => store.pathname);
  const searchParams = useRouterStore(store => store.searchParams);
  const channelMessages = useWebsocketStore(store => store.channelPublishMessages);
  const isLive = usePageStore(store => store.isOnline && store.isFocus && store.isVisible);
  
  useEffect(() => {
    if (!isLive) {
      return;
    }
    const track = () => {
      const event: ClientTrackLocationWebSocketEventDTO = {
        event: WebSocketMessageEvent.CLIENT_TRACK_LOCATION,
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
  }, [ clientId, origin, pathname, searchParams, channelMessages, isLive ]);
  
  return null;
};
