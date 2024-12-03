import {
  consoleError,
  consoleInfo,
  consoleWarn,
  isStringJson,
  SocketEvent,
  SocketEventsResponseDTO,
  SocketSubscribeEventDTO,
  SocketUnsubscribeEventDTO,
} from '@juki-team/commons';
import { jukiApiSocketManager } from './index';

const FORCE_CLOSED = 'FORCE_CLOSED';

export class SocketIo {
  private _socket: WebSocket | null = null;
  private socketServiceUrl: string;
  private callbacks: { [key: string]: { [key: string]: (data: SocketEventsResponseDTO) => void } } = {};
  private _messageQueue: string[] = [];
  
  constructor(socketServiceUrl: string) {
    this.socketServiceUrl = socketServiceUrl;
  }
  
  send(message: string) {
    if (this._socket?.readyState === WebSocket.OPEN) {
      this._socket.send(message);
      return true;
    }
    consoleWarn('the socket isn\'t ready, queued message', { message });
    this._messageQueue.push(message);
    return false;
  }
  
  connect() {
    const token = jukiApiSocketManager.getToken();
    if (!token) {
      consoleWarn('Jk socket no connected, token not found');
      setTimeout(() => this.connect(), 1000);
      return;
    }
    
    this._socket = new WebSocket(this.socketServiceUrl + `?sessionId=${jukiApiSocketManager.getToken()}`);
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.__JUKI_SOCKET_IO__ = this._socket;
    }
    
    this._socket?.addEventListener('open', () => {
      this.send('hello');
      while (this._messageQueue.length > 0) {
        this.send(this._messageQueue.shift()!);
      }
      consoleInfo('Jk socket connected');
    });
    
    this._socket?.addEventListener('message', (event) => {
      if (isStringJson(event.data)) {
        const data: SocketEventsResponseDTO = JSON.parse(event.data);
        if (data.event && data.id) {
          if (this.callbacks?.[data.event]?.[data.id]) {
            this.callbacks?.[data.event]?.[data.id](data);
            return true;
          } else {
            consoleWarn('websocket message not subscribed', { event, data });
          }
          return false;
        }
        consoleWarn('websocket message not recognized', { event, data });
        return false;
      }
      consoleError('data of websocket message not valid', event);
      return false;
    });
    
    this._socket?.addEventListener('close', (e) => {
      if (e.reason !== FORCE_CLOSED) {
        consoleInfo('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(() => this.connect(), 800);
      }
    });
    
    this._socket?.addEventListener('error', (error) => {
      consoleError('Socket encountered error, Closing socket', error);
      this._socket?.close();
    });
  }
  
  start() {
    if (this._socket?.readyState === undefined || this._socket?.readyState === WebSocket.CLOSED || this._socket?.readyState === WebSocket.CLOSING) {
      this.stop();
      this.connect();
    }
  }
  
  getReadyState() {
    return this._socket?.readyState;
  }
  
  stop() {
    this._messageQueue = [];
    this.callbacks = {};
    this._socket?.close(3001, FORCE_CLOSED);
  }
  
  subscribe(event: SocketEvent, id: string) {
    const payload: SocketSubscribeEventDTO = {
      action: 'subscribe',
      event,
      id,
      sessionId: jukiApiSocketManager.getToken(),
    };
    return this.send(JSON.stringify(payload));
  }
  
  unsubscribe(event: SocketEvent, id: string) {
    const payload: SocketUnsubscribeEventDTO = {
      action: 'unsubscribe',
      event,
      id,
      sessionId: jukiApiSocketManager.getToken(),
    };
    return this.send(JSON.stringify(payload));
  }
  
  onMessage(event: SocketEvent, id: string, callback: (data: SocketEventsResponseDTO) => void) {
    if (!this.callbacks?.[event]) {
      this.callbacks[event] = {};
    }
    this.callbacks[event][id] = callback;
    
    if (this._socket?.readyState === WebSocket.OPEN) {
      return true;
    }
    consoleWarn('the socket isn\'t ready');
    return false;
  }
}
