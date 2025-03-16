import {
  isPongWebSocketResponseEventDTO,
  ONE_MINUTE,
  WebSocketActionEvent,
  WebSocketResponseEventDTO,
} from '@juki-team/commons';
import { PingWebSocketEventDTO } from '@juki-team/commons/dist/types/dto/socket';
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { useJukiUser, usePageStore } from '../../hooks';
import { jukiApiSocketManager } from '../../settings';
import { WebsocketContext } from './context';
import { JukiWebsocketProviderProps } from './types';

export const JukiWebsocketProvider = (props: PropsWithChildren<JukiWebsocketProviderProps>) => {
  
  const { children } = props;
  
  const isPageVisible = usePageStore(state => state.isVisible);
  const [ isConnected, setIsConnected ] = useState(false);
  const [ id, setId ] = useState('');
  const { user: { sessionId } } = useJukiUser();
  const [ connectionId, setConnectionId ] = useState('');
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(null);
  
  useEffect(() => {
    
    const event: PingWebSocketEventDTO = {
      event: WebSocketActionEvent.PING,
      sessionId,
    };
    const callback = (data: WebSocketResponseEventDTO) => {
      if (isPongWebSocketResponseEventDTO(data)) {
        setConnectionId(data.connectionId);
      }
    };
    
    jukiApiSocketManager.SOCKET.subscribe(event, callback);
    
    return () => {
      jukiApiSocketManager.SOCKET.unsubscribe(event, callback);
    };
  }, [ sessionId ]);
  
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
  }, []);
  
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
  
  const value = useMemo(() => ({
    id,
    isConnected,
    connectionId,
  }), [ connectionId, isConnected, id ]);
  
  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  );
};
