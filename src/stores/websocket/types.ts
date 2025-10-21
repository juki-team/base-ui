import { WebSocketResponseEventDTO } from '@juki-team/commons/dist/types/dto/socket';

type Message = {
  key: string;
  data: WebSocketResponseEventDTO;
};

type Subscriber = (message: Message) => void;

export interface WebsocketSubStore {
  subscribers: Record<string, Subscriber[]>;
  broadcastMessage: (key: string, data: WebSocketResponseEventDTO) => void;
  subscribeToEvent: (key: string, callback: Subscriber) => () => void;
}
