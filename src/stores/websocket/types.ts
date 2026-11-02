import { WebSocketResponseEventDto, WebSocketSubscribeEventDto } from '@juki-team/commons';

type Message = {
  key: string;
  data: WebSocketResponseEventDto;
};

type Subscriber = (message: Message) => void;

export interface WebsocketSubStore {
  newAuth: () => void,
  subscribers: Record<string, Subscriber[]>,
  broadcastMessage: (key: string, data: WebSocketResponseEventDto) => void,
  subscribeToEvent: (event: WebSocketSubscribeEventDto, callback: Subscriber) => () => void,
}
