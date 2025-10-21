import { WebSocketResponseEventDTO, WebSocketSubscribeEventDTO } from '@juki-team/commons';
import Ably from 'ably';

type Message = {
  key: string;
  data: WebSocketResponseEventDTO;
};

type Subscriber = (message: Message) => void;

export interface WebsocketSubStore {
  channelSubscription: Ably.RealtimeChannel | null,
  setChannelSubscription: (channelSubscription: Ably.RealtimeChannel) => void,
  subscribers: Record<string, Subscriber[]>,
  broadcastMessage: (key: string, data: WebSocketResponseEventDTO) => void,
  subscribeToEvent: (event: WebSocketSubscribeEventDTO, callback: Subscriber) => () => void,
}
