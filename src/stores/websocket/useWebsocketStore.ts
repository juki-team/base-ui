import { create } from 'zustand';
import { JukiWebSocketManagement } from './JukiWebSocketManagement';

interface WebsocketState {
  isConnected: boolean,
  setIsConnected: (isConnected: boolean) => void,
  connectionId: string,
  setConnectionId: (connectionId: string) => void,
  websocket: JukiWebSocketManagement;
}

export const useWebsocketStore = create<WebsocketState>((set, get) => ({
  isConnected: false,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  connectionId: '',
  setConnectionId: (connectionId: string) => set({ connectionId }),
  websocket: new JukiWebSocketManagement(),
}));
