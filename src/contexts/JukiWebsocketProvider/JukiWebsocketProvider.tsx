import {
  isPongWebSocketResponseEventDTO,
  ONE_MINUTE,
  WebSocketActionEvent,
  WebSocketResponseEventDTO,
} from '@juki-team/commons';
import { PingWebSocketEventDTO } from '@juki-team/commons/dist/types/dto/socket';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { usePageStore, useUserStore } from '../../hooks';
import { jukiApiSocketManager } from '../../settings';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';
import { JukiWebsocketProviderProps } from './types';

export const JukiWebsocketProvider = (props: PropsWithChildren<JukiWebsocketProviderProps>) => {
  
  const { children } = props;
  
  const isPageVisible = usePageStore(state => state.isVisible);
  const id = useWebsocketStore(state => state.id);
  const setId = useWebsocketStore(state => state.setId);
  const setIsConnected = useWebsocketStore(state => state.setIsConnected);
  const connectionId = useWebsocketStore(state => state.connectionId);
  const setConnectionId = useWebsocketStore(state => state.setConnectionId);
  const userSessionId = useUserStore(state => state.user.sessionId);
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(null);
  
  useEffect(() => {
    
    const event: PingWebSocketEventDTO = {
      event: WebSocketActionEvent.PING,
      sessionId: userSessionId,
    };
    const callback = (data: WebSocketResponseEventDTO) => {
      console.log('data', { data });
      if (isPongWebSocketResponseEventDTO(data)) {
        setConnectionId(data.connectionId);
      }
    };
    
    jukiApiSocketManager.SOCKET.subscribe(event, callback);
    
    return () => {
      jukiApiSocketManager.SOCKET.unsubscribe(event, callback);
    };
  }, [ userSessionId, setConnectionId ]);
  
  useEffect(() => {
    void jukiApiSocketManager.SOCKET.connect();
    jukiApiSocketManager.SOCKET.addEventListener('open', () => {
      setIsConnected(true);
      setId(jukiApiSocketManager.SOCKET.getId());
    });
    
    jukiApiSocketManager.SOCKET.addEventListener('close', () => {
      setIsConnected(false);
    });
    
    jukiApiSocketManager.SOCKET.addEventListener('error', (error) => {
      setIsConnected(false);
    });
  }, [ setId, setIsConnected ]);
  
  useEffect(() => {
    void jukiApiSocketManager.SOCKET.authenticate(userSessionId);
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isPageVisible) {
        jukiApiSocketManager.SOCKET.send({
          event: WebSocketActionEvent.PING,
          sessionId: userSessionId,
        });
      }
    }, ONE_MINUTE);
  }, [ isPageVisible, connectionId, userSessionId, id ]);
  
  return children;
};
