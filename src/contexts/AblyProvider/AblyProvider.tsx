import {
  CHANNEL_CLIENT_NOTIFICATIONS,
  CHANNEL_CLIENT_SUBSCRIPTIONS,
  CHANNEL_CLIENT_USER_SESSION,
  CHANNEL_SEVER_MESSAGES,
} from '@juki-team/commons';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { jukiApiManager } from '../../settings';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketSubStore } from '../../stores/websocket/useWebsocketSubStore';

const WebsocketProvider = () => {
  const sessionId = useUserStore((state) => state.user.sessionId);
  const broadcastMessage = useWebsocketSubStore((state) => state.broadcastMessage);
  const setChannelSubscription = useWebsocketSubStore(store => store.setChannelSubscription);
  const channelName = useMemo(
    () => CHANNEL_CLIENT_USER_SESSION(sessionId),
    [ sessionId ],
  );
  const { channel: channelSubscription } = useChannel(CHANNEL_CLIENT_SUBSCRIPTIONS);
  useEffect(() => {
    setChannelSubscription(channelSubscription);
  }, [ channelSubscription, setChannelSubscription ]);
  
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
    if (!sessionId) {
      return null;
    }
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
        <ChannelProvider channelName={CHANNEL_CLIENT_USER_SESSION(sessionId)}>
          <WebsocketProvider />
        </ChannelProvider>
      </ChannelProvider>
      <ChannelProvider channelName={CHANNEL_CLIENT_NOTIFICATIONS}>
        <ChannelProvider channelName={CHANNEL_SEVER_MESSAGES}>
          {children}
        </ChannelProvider>
      </ChannelProvider>
    </AblyProvider>
  );
};
