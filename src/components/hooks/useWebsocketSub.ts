import {
  CHANNEL_CLIENT_SUBSCRIPTIONS,
  CHANNEL_CLIENT_USER_SESSION,
  WebSocketSubscribeEventDTO,
} from '@juki-team/commons';
import { AblyMessageCallback, useChannel } from 'ably/react';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';
import { getKeyWebSocketEventDTO, getUnsubscribeEvent } from '../helpers';

export function useWebsocketSub(event: WebSocketSubscribeEventDTO, callbackOnMessage: AblyMessageCallback) {
  
  const { channel: channelSubscription } = useChannel(CHANNEL_CLIENT_SUBSCRIPTIONS);
  const sessionId = useUserStore(state => state.user.sessionId);
  useChannel(CHANNEL_CLIENT_USER_SESSION(sessionId), getKeyWebSocketEventDTO(event), callbackOnMessage);
  
  const eventString = JSON.stringify(event);
  
  const isValid = event.sessionId === sessionId && !!sessionId;
  
  useEffect(() => {
    if (isValid) {
      const event = JSON.parse(eventString);
      void channelSubscription.publish(getKeyWebSocketEventDTO(event), event);
      return () => {
        void channelSubscription.publish(getKeyWebSocketEventDTO(getUnsubscribeEvent(event)), event);
      };
    }
    return () => null;
  }, [ channelSubscription, eventString, isValid ]);
}
