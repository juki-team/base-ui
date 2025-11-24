import {
  CHANNEL_CLIENT_NOTIFICATIONS,
  CHANNEL_CLIENT_SUBSCRIPTIONS,
  CHANNEL_CLIENT_USER_SESSION,
  CHANNEL_SEVER_MESSAGES,
  cleanRequest,
  consoleError,
  consoleInfo,
  ContentResponseType,
} from '@juki-team/commons';
import Ably, { TokenDetails, TokenRequest } from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { useEffect, useMemo, useState } from 'react';
import { authorizedRequest, isBrowser } from '../../components/helpers';
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

const newAblyClient = () => {
  if (isBrowser()) {
    return new Ably.Realtime({
      authCallback: async (_, callback) => {
        if (isBrowser()) {
          consoleInfo('new request to auth ably');
          let tokenRequest;
          try {
            const response = cleanRequest<ContentResponseType<TokenDetails | TokenRequest | string | null>>(
              await authorizedRequest(jukiApiManager.API_V2.websocket.auth().url),
            );
            tokenRequest = response.success ? response.content : null;
          } catch (error) {
            callback(error?.toString() || 'Error on authCallback', null);
            return;
          }
          callback(null, tokenRequest);
        } else {
          console.warn('authCallback executed on server side');
          callback(null, null);
        }
      },
    });
  }
  return null;
};

let ablyClient = newAblyClient();

export const JukiAblyInitializer = () => {
  
  const sessionId = useUserStore(store => store.user.sessionId);
  const newAuth = useWebsocketStore(store => store.newAuth);
  const [ forceRender, setForceRender ] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        if (ablyClient && ablyClient.auth.clientId && ablyClient.auth.clientId !== sessionId) {
          consoleInfo('🔁 Closing previous Ably connection due to clientId change');
          ablyClient.close();
        }
        ablyClient = newAblyClient();
        setForceRender(Date.now());
        setTimeout(newAuth, 1000);
      } catch (error) {
        consoleError('Error during Ably authorization', error);
      }
    })();
  }, [ sessionId, newAuth ]);
  
  if (ablyClient) {
    return (
      <AblyProvider client={ablyClient} key={forceRender}>
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
  }
  
  return null;
};
