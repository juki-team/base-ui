import { consoleInfo } from '@juki-team/commons';
import { create } from 'zustand';
import { getKeyWebSocketEventDTO } from '../../components/helpers';
import { addTopicSubscription } from './topicChannels';
import { WebsocketSubStore } from './types';

export const useWebsocketStore = create<WebsocketSubStore>((set, get) => {
  const getSubscribeToEvent: () => WebsocketSubStore['subscribeToEvent'] = () => {
    consoleInfo('new SubscribeToEvent function');
    return (event, callback) => {
      const key = getKeyWebSocketEventDTO(event);
      // the events arrive by the TOPIC channels (see topicChannels.ts), the subscription only says which ones are needed
      const removeTopicSubscription = addTopicSubscription(event);
      set((state) => ({
        subscribers: {
          ...state.subscribers,
          [key]: [...(state.subscribers[key] || []), callback],
        },
      }));
      return () => {
        removeTopicSubscription();
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
    channelPublishMessages: null,
    setProps: (props) => set(props),
    broadcastMessage: (key, data) => {
      const newMessage = { key, data };
      const subs = get().subscribers[key] || [];
      subs.forEach((cb) => cb(newMessage));
    },
    subscribeToEvent: getSubscribeToEvent(),
  };
});
