import { WebSocketResponseEventDTO, WebSocketSubscribeEventDTO } from '@juki-team/commons';
import { useEffect, useRef } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';
import { safeReportError } from '../helpers';
import { useStableState } from './useStableState';

export const useSubscribe = (event: Omit<WebSocketSubscribeEventDTO, 'clientId'>, cb: (response: WebSocketResponseEventDTO) => (void | Promise<void>), isValid = () => true) => {
  
  const clientId = useUserStore(store => store.clientId);
  const subscribeToEvent = useWebsocketStore(store => store.subscribeToEvent);
  
  const [ stableEvent ] = useStableState(event);
  const cbRef = useRef(cb);
  cbRef.current = cb;
  
  useEffect(() => {
    if (!isValid()) {
      return;
    }
    const event: WebSocketSubscribeEventDTO = {
      ...(stableEvent as WebSocketSubscribeEventDTO),
      clientId,
    };
    return subscribeToEvent(event, async (message) => {
      const data = message.data;
      try {
        await cbRef.current?.(data);
      } catch (error) {
        await safeReportError(error as Error, null, { message: 'Error on callback useSubscribe', data, event });
      }
    });
  }, [ clientId, stableEvent, subscribeToEvent ]);
};
