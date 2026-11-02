import { WebSocketResponseEventDTO, WebSocketSubscribeEventDTO } from '@juki-team/commons';

type Message = {
  key: string;
  data: WebSocketResponseEventDTO;
};

type Subscriber = (message: Message) => void;

export interface WebsocketSubStore {
  newAuth: () => void,
  subscribers: Record<string, Subscriber[]>,
  broadcastMessage: (key: string, data: WebSocketResponseEventDTO) => void,
  subscribeToEvent: (event: WebSocketSubscribeEventDTO, callback: Subscriber) => () => void,
}
