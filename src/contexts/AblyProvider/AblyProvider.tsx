import {
  CHANNEL_CLIENT_NOTIFICATIONS,
  CHANNEL_CLIENT_SUBSCRIPTIONS,
  CHANNEL_CLIENT_USER_SESSION,
  CHANNEL_SEVER_MESSAGES,
  cleanRequest,
  ContentResponseType,
} from '@juki-team/commons';
import Ably, { TokenDetails, TokenRequest } from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { useEffect, useMemo } from 'react';
import { authorizedRequest } from '../../components/helpers';
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
  
  useEffect(() => {
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

const ablyClient = new Ably.Realtime({
  authCallback: async (_, callback) => {
    let tokenRequest;
    try {
      const response = cleanRequest<ContentResponseType<TokenDetails | TokenRequest | string | null>>(await authorizedRequest(jukiApiManager.API_V2.websocket.auth().url));
      tokenRequest = response.success ? response.content : null;
    } catch (error) {
      callback(error?.toString() || 'Error on authCallback', null);
      return;
    }
    callback(null, tokenRequest);
  },
});

export const JukiAblyProvider = () => {
  
  const sessionId = useUserStore(store => store.user.sessionId);
  useEffect(() => {
    void ablyClient.auth.authorize();
  }, [ sessionId ]);
  
  return (
    <AblyProvider client={ablyClient}>
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
