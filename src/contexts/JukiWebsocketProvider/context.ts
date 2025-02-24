import { createContext } from 'react';

export const WebsocketContext = createContext<{
  id: string,
  connectionId: string,
  isConnected: boolean,
}>({
  id: '',
  connectionId: '',
  isConnected: false,
});
