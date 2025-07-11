import {
  isPongWebSocketResponseEventDTO,
  ONE_MINUTE,
  WebSocketActionEvent,
  WebSocketResponseEventDTO,
} from '@juki-team/commons';
import { PingWebSocketEventDTO } from '@juki-team/commons/dist/types/dto/socket';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useMouseInsidePage } from '../../hooks';
import { usePageStore } from '../../stores/page/usePageStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';
import { JukiWebsocketProviderProps } from './types';

export const JukiWebsocketProvider = (props: PropsWithChildren<JukiWebsocketProviderProps>) => {
  
  const { children } = props;
  
  const isPageVisible = usePageStore(state => state.isVisible);
  const setIsConnected = useWebsocketStore(state => state.setIsConnected);
  const connectionId = useWebsocketStore(state => state.connectionId);
  const setConnectionId = useWebsocketStore(state => state.setConnectionId);
  const websocket = useWebsocketStore(state => state.websocket);
  const userSessionId = useUserStore(state => state.user.sessionId);
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(null);
  const isMouseInside = useMouseInsidePage();
  
  useEffect(() => {
    void websocket.authenticate(userSessionId);
    const event: PingWebSocketEventDTO = {
      event: WebSocketActionEvent.PING,
      sessionId: userSessionId,
      href: window.location.href,
    };
    const callback = (data: WebSocketResponseEventDTO) => {
      if (isPongWebSocketResponseEventDTO(data)) {
        setConnectionId(data.connectionId);
      }
    };
    
    websocket.subscribe(event, callback);
    
    return () => {
      websocket.unsubscribe(event, callback);
    };
  }, [ userSessionId, setConnectionId ]);
  
  useEffect(() => {
    websocket.addEventListener('open', () => setIsConnected(true));
    websocket.addEventListener('close', () => setIsConnected(false));
    websocket.addEventListener('error', () => setIsConnected(false));
  }, [ setIsConnected ]);
  
  useEffect(() => {
    const callback = () => {
      if (isPageVisible && isMouseInside) {
        websocket.send({
          event: WebSocketActionEvent.PING,
          sessionId: userSessionId,
          href: window.location.href,
        });
      }
    };
    callback();
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(callback, ONE_MINUTE / 2);
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [ isPageVisible, connectionId, userSessionId, isMouseInside ]);
  
  return children;
};
