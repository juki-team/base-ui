import {
  CHANNEL_CLIENT_NOTIFICATIONS,
  CHANNEL_CLIENT_SUBSCRIPTIONS,
  CHANNEL_CLIENT_USER_SESSION,
  CHANNEL_SEVER_MESSAGES,
} from '@juki-team/commons';
import { WebSocketResponseEventDTO } from '@juki-team/commons/dist/types/dto/socket';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { PropsWithChildren, useMemo } from 'react';
import { create } from 'zustand';
import { jukiApiManager } from '../../settings';
import { useUserStore } from '../../stores/user/useUserStore';

type Message = {
  key: string;
  data: WebSocketResponseEventDTO;
};

type Subscriber = (message: Message) => void;

interface WebsocketStore {
  subscribers: Record<string, Subscriber[]>;
  broadcastMessage: (key: string, data: WebSocketResponseEventDTO) => void;
  subscribeToEvent: (key: string, callback: Subscriber) => () => void;
}

export const useWebsocketStore = create<WebsocketStore>((set, get) => ({
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

const WebsocketProvider = () => {
  const sessionId = useUserStore((state) => state.user.sessionId);
  const broadcastMessage = useWebsocketStore((state) => state.broadcastMessage);
  
  const channelName = useMemo(
    () => CHANNEL_CLIENT_USER_SESSION(sessionId),
    [ sessionId ],
  );
  
  useChannel(channelName, (msg) => {
    const { data } = msg;
    const key = data.key;
    broadcastMessage(key, data);
  });
  
  return null;
};

export const JukiAblyProvider = ({ children }: PropsWithChildren) => {
  
  const sessionId = useUserStore(store => store.user.sessionId);
  const client = useMemo(() => {
    return new Ably.Realtime({
      authUrl: `${jukiApiManager.API_V2.websocket.auth().url}`,
      authHeaders: {
        'x-juki-session-id': sessionId,
        'x-juki-forwarded-host': window?.location?.host,
      },
    });
  }, [ sessionId ]);
  
  if (!client) {
    return null;
  }
  
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={CHANNEL_CLIENT_SUBSCRIPTIONS}>
        <ChannelProvider channelName={CHANNEL_CLIENT_NOTIFICATIONS}>
          <ChannelProvider channelName={CHANNEL_SEVER_MESSAGES}>
            <ChannelProvider channelName={CHANNEL_CLIENT_USER_SESSION(sessionId)}>
              {children}
              <WebsocketProvider />
            </ChannelProvider>
          </ChannelProvider>
        </ChannelProvider>
      </ChannelProvider>
    </AblyProvider>
  );
};
