import {
  isPongWebSocketResponseEventDTO,
  ONE_MINUTE,
  WebSocketActionEvent,
  WebSocketResponseEventDTO,
} from '@juki-team/commons';
import { PingWebSocketEventDTO } from '@juki-team/commons/dist/types/dto/socket';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useJukiUser, usePageStore } from '../../hooks';
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
  const { user: { sessionId } } = useJukiUser();
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(null);
  
  useEffect(() => {
    
    const event: PingWebSocketEventDTO = {
      event: WebSocketActionEvent.PING,
      sessionId,
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
  }, [ sessionId, setConnectionId ]);
  
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
    void jukiApiSocketManager.SOCKET.authenticate(sessionId);
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isPageVisible) {
        jukiApiSocketManager.SOCKET.send({
          event: WebSocketActionEvent.PING,
          sessionId,
        });
      }
    }, ONE_MINUTE);
  }, [ isPageVisible, connectionId, sessionId, id ]);
  
  return children;
};
