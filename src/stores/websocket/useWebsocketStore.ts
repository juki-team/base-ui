import { WebSocketSubscribeEventDTO, WebSocketUnsubscribeEventDTO } from '@juki-team/commons';
import { create } from 'zustand';
import { getKeyWebSocketEventDTO, getUnsubscribeEvent } from '../../components/helpers';
import { WebsocketSubStore } from './types';

export const useWebsocketStore = create<WebsocketSubStore>((set, get) => {
  let publishQueue: Array<{ key: string; event: WebSocketSubscribeEventDTO | WebSocketUnsubscribeEventDTO }> = [];
  let isPublishing = false;
  
  const flushQueue = async () => {
    if (isPublishing || publishQueue.length === 0) {
      return;
    }
    isPublishing = true;
    const queueCopy = publishQueue.map(({ event }) => event);
    publishQueue = [];
    const channelSubscription = get().channelSubscription;
    if (channelSubscription) {
      await channelSubscription.publish('batched', queueCopy);
    }
    isPublishing = false;
  };
  
  const queuePublish = (key: string, event: WebSocketSubscribeEventDTO | WebSocketUnsubscribeEventDTO) => {
    publishQueue.push({ key, event });
  };
  
  setInterval(flushQueue, 200);
  
  return {
    subscribers: {},
    channelSubscription: null,
    channelMessages: null,
    setProps: (props) => set(props),
    broadcastMessage: (key, data) => {
      const newMessage = { key, data };
      const subs = get().subscribers[key] || [];
      subs.forEach((cb) => cb(newMessage));
    },
    subscribeToEvent: (event, callback) => {
      const key = getKeyWebSocketEventDTO(event);
      queuePublish(key, event);
      set((state) => ({
        subscribers: {
          ...state.subscribers,
          [key]: [ ...(state.subscribers[key] || []), callback ],
        },
      }));
      return () => {
        const unSubEvent = getUnsubscribeEvent(event);
        queuePublish(getKeyWebSocketEventDTO(unSubEvent), unSubEvent);
        set((state) => ({
          subscribers: {
            ...state.subscribers,
            [key]: (state.subscribers[key] || []).filter((cb) => cb !== callback),
          },
        }));
      };
    },
  };
});
