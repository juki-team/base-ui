'use client';

import { create } from 'zustand';

interface WebsocketState {
  id: string,
  setId: (id: string) => void,
  isConnected: boolean,
  setIsConnected: (isConnected: boolean) => void,
  connectionId: string,
  setConnectionId: (connectionId: string) => void,
}

export const useWebsocketStore = create<WebsocketState>((set) => ({
  id: '',
  setId: (id) => set({ id }),
  isConnected: false,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  connectionId: '',
  setConnectionId: (connectionId: string) => set({ connectionId }),
}));
