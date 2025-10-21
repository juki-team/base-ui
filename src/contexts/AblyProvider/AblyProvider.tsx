import {
  CHANNEL_CLIENT_NOTIFICATIONS,
  CHANNEL_CLIENT_SUBSCRIPTIONS,
  CHANNEL_CLIENT_USER_SESSION,
  CHANNEL_SEVER_MESSAGES,
} from '@juki-team/commons';
import Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { useEffect, useMemo } from 'react';
import { jukiApiManager } from '../../settings';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';

const WebsocketProvider = () => {
  const sessionId = useUserStore((state) => state.user.sessionId);
  const broadcastMessage = useWebsocketStore((state) => state.broadcastMessage);
  const setProps = useWebsocketStore(store => store.setProps);
  const channelName = useMemo(
    () => CHANNEL_CLIENT_USER_SESSION(sessionId),
    [ sessionId ],
  );
  const { channel: channelSubscription } = useChannel(CHANNEL_CLIENT_SUBSCRIPTIONS);
  const { channel: channelMessages } = useChannel(CHANNEL_SEVER_MESSAGES);
  
  console.log('WebsocketProvider');
  useEffect(() => {
    console.log('setChannelSubscription');
    setProps({ channelSubscription });
  }, [ channelSubscription, setProps ]);
  useEffect(() => {
    setProps({ channelMessages });
  }, [ channelMessages, setProps ]);
  
  useChannel(channelName, (msg) => {
    const { data } = msg;
    const key = data.key;
    broadcastMessage(key, data);
  });
  
  return null;
};

export const JukiAblyProvider = () => {
  
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
          <ChannelProvider channelName={CHANNEL_SEVER_MESSAGES}>
            <ChannelProvider channelName={CHANNEL_CLIENT_NOTIFICATIONS}>
              <WebsocketProvider />
            </ChannelProvider>
          </ChannelProvider>
        </ChannelProvider>
      </ChannelProvider>
    </AblyProvider>
  );
};
