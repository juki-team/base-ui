import { WebSocketResponseEventDTO, WebSocketSubscribeEventDTO } from '@juki-team/commons';
import { useEffect, useRef } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';
import { useStableState } from './useStableState';

export const useSubscribe = (event: Omit<WebSocketSubscribeEventDTO, 'clientId'>, cb: (response: WebSocketResponseEventDTO) => void) => {
  
  const clientId = useUserStore(store => store.clientId);
  const subscribeToEvent = useWebsocketStore(store => store.subscribeToEvent);
  
  const [ stableEvent ] = useStableState(event);
  const cbRef = useRef(cb);
  cbRef.current = cb;
  
  useEffect(() => {
    const event: WebSocketSubscribeEventDTO = {
      ...(stableEvent as WebSocketSubscribeEventDTO),
      clientId,
    };
    return subscribeToEvent(event, (message) => {
      const data = message.data;
      cbRef.current?.(data);
    });
  }, [ clientId, stableEvent, subscribeToEvent ]);
};
