import { WebSocketResponseEventDTO, WebSocketSubscribeEventDTO } from '@juki-team/commons';
import Ably from 'ably';

type Message = {
  key: string;
  data: WebSocketResponseEventDTO;
};

type Subscriber = (message: Message) => void;

export interface WebsocketSubStore {
  channelSubscription: Ably.RealtimeChannel | null,
  channelMessages: Ably.RealtimeChannel | null,
  setProps: (props: Partial<Pick<WebsocketSubStore, 'channelMessages' | 'channelSubscription'>>) => void,
  subscribers: Record<string, Subscriber[]>,
  broadcastMessage: (key: string, data: WebSocketResponseEventDTO) => void,
  subscribeToEvent: (event: WebSocketSubscribeEventDTO, callback: Subscriber) => () => void,
}
