import { create } from 'zustand';
import { getKeyWebSocketEventDTO, getUnsubscribeEvent } from '../../components/helpers';
import { WebsocketSubStore } from './types';

export const useWebsocketSubStore = create<WebsocketSubStore>((set, get) => ({
  subscribers: {},
  channelSubscription: null,
  setChannelSubscription: (channelSubscription) => set({ channelSubscription }),
  broadcastMessage: (key, data) => {
    const newMessage = { key, data };
    const subs = get().subscribers[key] || [];
    subs.forEach((cb) => cb(newMessage));
  },
  subscribeToEvent: (event, callback) => {
    const key = getKeyWebSocketEventDTO(event);
    const channelSubscription = get().channelSubscription;
    void channelSubscription?.publish(key, event);
    set((state) => ({
      subscribers: {
        ...state.subscribers,
        [key]: [ ...(state.subscribers[key] || []), callback ],
      },
    }));
    return () => {
      const unSubEvent = getUnsubscribeEvent(event);
      void get().channelSubscription?.publish(getKeyWebSocketEventDTO(unSubEvent), unSubEvent);
      set((state) => ({
        subscribers: {
          ...state.subscribers,
          [key]: (state.subscribers[key] || []).filter((cb) => cb !== callback),
        },
      }));
    };
  },
}));
