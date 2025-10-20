import {
  CHANNEL_CLIENT_NOTIFICATIONS,
  CHANNEL_CLIENT_SUBSCRIPTIONS,
  CHANNEL_CLIENT_USER_SESSION,
  CHANNEL_SEVER_MESSAGES,
} from '@juki-team/commons';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { PropsWithChildren, useMemo } from 'react';
import { jukiApiManager } from '../../settings';
import { useUserStore } from '../../stores/user/useUserStore';

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
            </ChannelProvider>
          </ChannelProvider>
        </ChannelProvider>
      </ChannelProvider>
    </AblyProvider>
  );
};
