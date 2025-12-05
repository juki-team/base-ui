import { WebSocketResponseEventDTO, WebSocketSubscribeEventDTO } from '@juki-team/commons';
import Ably from 'ably';

type Message = {
  key: string;
  data: WebSocketResponseEventDTO;
};

type Subscriber = (message: Message) => void;

export interface WebsocketSubStore {
  channelPublishSubscription: Ably.RealtimeChannel | null,
  channelPublishMessages: Ably.RealtimeChannel | null,
  newAuth: () => void,
  setProps: (props: Partial<Pick<WebsocketSubStore, 'channelPublishMessages' | 'channelPublishSubscription'>>) => void,
  subscribers: Record<string, Subscriber[]>,
  broadcastMessage: (key: string, data: WebSocketResponseEventDTO) => void,
  subscribeToEvent: (event: WebSocketSubscribeEventDTO, callback: Subscriber) => () => void,
}
