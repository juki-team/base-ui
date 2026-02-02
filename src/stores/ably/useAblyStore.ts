import Spaces from '@ably/spaces';
import { Realtime } from 'ably';
import { create } from 'zustand';

interface AblyStore {
  realtimeClient: null | Realtime,
  spaces: null | Spaces
  setRealtimeClient: (realtimeClient: Realtime) => void,
  setSpaces: (spaces: Spaces) => void,
}

export const useAblyStore = create<AblyStore>((set) => ({
  realtimeClient: null,
  spaces: null,
  setRealtimeClient: (realtimeClient: Realtime) => set({ realtimeClient }),
  setSpaces: (spaces: Spaces) => set({ spaces }),
}));
