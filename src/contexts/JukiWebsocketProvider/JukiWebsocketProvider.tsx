import { PropsWithChildren, useEffect } from 'react';
import { usePageStore } from '../../stores/page/usePageStore';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';
import { JukiWebsocketProviderProps } from './types';

export const JukiWebsocketProvider = (props: PropsWithChildren<JukiWebsocketProviderProps>) => {
  
  const { children } = props;
  
  const isPageVisible = usePageStore(state => state.isVisible);
  const isMouseInsidePage = usePageStore(store => store.isMouseInside);
  
  const setIsConnected = useWebsocketStore(state => state.setIsConnected);
  const setConnectionId = useWebsocketStore(state => state.setConnectionId);
  
  const connectionId = useWebsocketStore(state => state.connectionId);
  const websocket = useWebsocketStore(state => state.websocket);
  
  const userSessionId = useUserStore(state => state.user.sessionId);
  
  useEffect(() => {
    websocket.setPageVisibilityState(isPageVisible);
    websocket.setMouseInsidePageState(isMouseInsidePage);
    if (isPageVisible && isMouseInsidePage) {
      void websocket.authenticate(userSessionId);
    }
  }, [ websocket, userSessionId, connectionId, isPageVisible, isMouseInsidePage ]);
  
  useEffect(() => {
    websocket.on('isOnlineChanged', ({ isOnline }: { isOnline: boolean }) => {
      setIsConnected(isOnline);
    });
    websocket.on('connectionIdChanged', ({ connectionId }: { connectionId: string }) => {
      setConnectionId(connectionId);
    });
  }, [ setIsConnected, setConnectionId ]);
  
  return children;
};
