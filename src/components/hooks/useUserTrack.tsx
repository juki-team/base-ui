import { UserTrackWebSocketEventDTO, WebSocketActionEvent } from '@juki-team/commons';
import { useEffect } from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';

export const useUserTrack = () => {
  
  const websocket = useWebsocketStore(store => store.websocket);
  const sessionId = useUserStore(store => store.user.sessionId);
  const origin = useRouterStore(store => store.origin);
  const pathname = useRouterStore(store => store.pathname);
  const searchParams = useRouterStore(store => store.searchParams);
  
  useEffect(() => {
    const event: UserTrackWebSocketEventDTO = {
      event: WebSocketActionEvent.USER_TRACK,
      sessionId,
      href: `${origin}${pathname}?${searchParams.toString()}`,
    };
    websocket.send(event);
  }, [ sessionId, websocket, origin, pathname, searchParams ]);
  return null;
};
