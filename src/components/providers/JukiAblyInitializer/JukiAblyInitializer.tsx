import Spaces from '@ably/spaces';
import { SpaceProvider, SpacesProvider } from '@ably/spaces/react';
import {
  CHANNEL_PRESENCE_CLIENT,
  CHANNEL_PUBLISH_MESSAGES,
  CHANNEL_PUBLISH_SUBSCRIPTIONS,
  CHANNEL_SUBSCRIBE_CLIENT,
  CHANNEL_SUBSCRIBE_NOTIFICATIONS,
  cleanRequest,
  consoleInfo,
  consoleWarn,
  ContentResponseType,
  getParamsOfClientId,
} from '@juki-team/commons';
import Ably, { TokenDetails, TokenRequest } from 'ably';
import { LiveObjects } from 'ably/liveobjects';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { QueryParamKey } from '../../../enums';
import { jukiAbly, jukiApiManager } from '../../../settings';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { useWebsocketStore } from '../../../stores/websocket/useWebsocketStore';
import { authorizedRequest, isBrowser, safeReportError } from '../../helpers';
import { ErrorBoundary } from '../../templates';

const WebsocketProvider = () => {
  const clientId = useUserStore((state) => state.clientId);
  const broadcastMessage = useWebsocketStore((state) => state.broadcastMessage);
  const setProps = useWebsocketStore(store => store.setProps);
  const { channel: channelPublishSubscription } = useChannel(CHANNEL_PUBLISH_SUBSCRIPTIONS);
  const { channel: channelPublishMessages } = useChannel(CHANNEL_PUBLISH_MESSAGES);
  const { channel: channelPresenceClient } = useChannel(CHANNEL_PRESENCE_CLIENT);
  
  useEffect(() => {
    setProps({ channelPublishSubscription });
  }, [ channelPublishSubscription, setProps ]);
  useEffect(() => {
    setProps({ channelPublishMessages });
  }, [ channelPublishMessages, setProps ]);
  useEffect(() => {
    void channelPresenceClient.presence.enter({ clientId });
    return () => {
      void channelPresenceClient.presence.leave({ clientId });
    };
  }, [ channelPresenceClient, clientId ]);
  
  useChannel(CHANNEL_SUBSCRIBE_CLIENT(clientId), (msg) => {
    const { data } = msg;
    const key = data?.key;
    broadcastMessage(key, data);
  });
  
  useChannel(CHANNEL_SUBSCRIBE_NOTIFICATIONS, (msg) => {
    const { data } = msg;
    const key = data?.key;
    broadcastMessage(key, data);
  });
  
  return null;
};

const newAblyClient = (uiId: string) => {
  if (isBrowser()) {
    return new Ably.Realtime({
      authCallback: async (_, callback) => {
        if (isBrowser()) {
          consoleInfo('new request to auth ably');
          let tokenRequest;
          try {
            const response = cleanRequest<ContentResponseType<TokenDetails | TokenRequest | string | null>>(
              await authorizedRequest(jukiApiManager.API_V2.websocket.auth().url + `?uiId=${uiId}`),
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
      plugins: {
        LiveObjects,
      },
    });
  }
  return null;
};

export const JukiAblyInitializer = () => {
  
  const clientId = useUserStore(store => store.clientId);
  const newAuth = useWebsocketStore(store => store.newAuth);
  const [ forceRender, setForceRender ] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        if (jukiAbly.realtimeClient) {
          consoleInfo('Closing previous Ably connection due to clientId change');
          jukiAbly.realtimeClient.close();
        }
        const { sessionId, uiId } = getParamsOfClientId(clientId);
        if (!!sessionId && !!uiId) {
          consoleInfo(`Creating new Ably connection clientId: "${clientId}"`);
          jukiAbly.realtimeClient = newAblyClient(uiId);
          jukiAbly.spaces = new Spaces(jukiAbly.realtimeClient!);
          setForceRender(Date.now());
          setTimeout(newAuth, 1000);
        } else {
          consoleWarn('sessionId or uiId are empty', { sessionId, uiId });
        }
      } catch (error) {
        void safeReportError(
          error as Error,
          null,
          { message: 'Error during Ably authorization' },
        );
      }
    })();
  }, [ clientId, newAuth ]);
  
  if (isBrowser() && jukiAbly.realtimeClient) {
    return (
      <ErrorBoundary background>
        <AblyProvider client={jukiAbly.realtimeClient} key={forceRender}>
          <ChannelProvider channelName={CHANNEL_PUBLISH_SUBSCRIPTIONS}>
            <ChannelProvider channelName={CHANNEL_SUBSCRIBE_CLIENT(clientId)}>
              <ChannelProvider channelName={CHANNEL_PUBLISH_MESSAGES}>
                <ChannelProvider channelName={CHANNEL_SUBSCRIBE_NOTIFICATIONS}>
                  <ChannelProvider channelName={CHANNEL_PRESENCE_CLIENT}>
                    <WebsocketProvider />
                  </ChannelProvider>
                </ChannelProvider>
              </ChannelProvider>
            </ChannelProvider>
          </ChannelProvider>
        </AblyProvider>
      </ErrorBoundary>
    );
  }
  
  return null;
};

export const JukiAblySpaceProvider = ({ children }: PropsWithChildren) => {
  const searchParams = useRouterStore(store => store.searchParams);
  const roomKey = searchParams.get(QueryParamKey.ROOM);
  if (isBrowser() && jukiAbly.realtimeClient && jukiAbly.spaces && roomKey) {
    return (
      <SpacesProvider client={jukiAbly.spaces}>
        <SpaceProvider name={'room:' + roomKey}>
          {children}
        </SpaceProvider>
      </SpacesProvider>
    );
  }
  
  return children;
};
