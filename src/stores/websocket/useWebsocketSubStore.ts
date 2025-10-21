import { create } from 'zustand';
import { WebsocketSubStore } from './types';

export const useWebsocketSubStore = create<WebsocketSubStore>((set, get) => ({
  subscribers: {},
  broadcastMessage: (key, data) => {
    const newMessage = { key, data };
    const subs = get().subscribers[key] || [];
    subs.forEach((cb) => cb(newMessage));
  },
  subscribeToEvent: (key, callback) => {
    set((state) => ({
      subscribers: {
        ...state.subscribers,
        [key]: [ ...(state.subscribers[key] || []), callback ],
      },
    }));
    return () => {
      set((state) => ({
        subscribers: {
          ...state.subscribers,
          [key]: (state.subscribers[key] || []).filter((cb) => cb !== callback),
        },
      }));
    };
  },
}));
