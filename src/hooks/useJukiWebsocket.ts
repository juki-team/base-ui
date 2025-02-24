import { useContext } from 'react';
import { WebsocketContext } from '../contexts/JukiWebsocketProvider/context';

export const useJukiWebsocket = () => {
  const { id, connectionId, isConnected } = useContext(WebsocketContext);
  
  return { id, connectionId, isConnected };
};
