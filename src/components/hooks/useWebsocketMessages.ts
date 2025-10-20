import { CHANNEL_SEVER_MESSAGES } from '@juki-team/commons';
import { useChannel } from 'ably/react';

export function useWebsocketMessages() {
  
  // const sessionId = useUserStore(state => state.user.sessionId);
  const { channel } = useChannel(CHANNEL_SEVER_MESSAGES);
  return channel;
}
