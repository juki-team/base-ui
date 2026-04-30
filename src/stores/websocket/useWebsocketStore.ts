import type { WebSocketSubscribeEventDTO, WebSocketUnsubscribeEventDTO } from '@juki-team/commons/dto';
import { consoleInfo } from '@juki-team/commons/helpers';
import { create } from 'zustand';
import { getKeyWebSocketEventDTO, getUnsubscribeEvent } from '../../components/helpers';
import type { WebsocketSubStore } from './types';

export const useWebsocketStore = create<WebsocketSubStore>((set, get) => {
  let publishQueue: Array<{ key: string; event: WebSocketSubscribeEventDTO | WebSocketUnsubscribeEventDTO }> = [];
  let isPublishing = false;

  const flushQueue = async () => {
    if (isPublishing || publishQueue.length === 0) {
      return;
    }
    isPublishing = true;
    const channelSubscription = get().channelPublishSubscription;
    if (channelSubscription) {
      const queueCopy = publishQueue.map(({ event }) => event);
      publishQueue = [];
      await channelSubscription.publish('batched', queueCopy);
    }
    isPublishing = false;
  };

  const queuePublish = (key: string, event: WebSocketSubscribeEventDTO | WebSocketUnsubscribeEventDTO) => {
    publishQueue.push({ key, event });
  };

  setInterval(flushQueue, 200);

  const getSubscribeToEvent: () => WebsocketSubStore['subscribeToEvent'] = () => {
    consoleInfo('new SubscribeToEvent function');
    return (event, callback) => {
      const key = getKeyWebSocketEventDTO(event);
      queuePublish(key, event);
      set((state) => ({
        subscribers: {
          ...state.subscribers,
          [key]: [...(state.subscribers[key] || []), callback],
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
    };
  };

  return {
    subscribers: {},
    newAuth: () => set({ subscribeToEvent: getSubscribeToEvent() }),
    channelPublishSubscription: null,
    channelPublishMessages: null,
    setProps: (props) => set(props),
    broadcastMessage: (key, data) => {
      const newMessage = { key, data };
      const subs = get().subscribers[key] || [];
      for (const cb of subs) cb(newMessage);
    },
    subscribeToEvent: getSubscribeToEvent(),
  };
});
