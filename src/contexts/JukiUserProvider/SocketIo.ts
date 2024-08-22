import { consoleError, consoleInfo, consoleWarn, isStringJson, SocketEvent } from '@juki-team/commons';
import { getLocalToken } from '../../helpers';

const FORCE_CLOSED = 'FORCE_CLOSED';

export class SocketIo {
  private _socket: WebSocket | null = null;
  private socketServiceUrl: string;
  private callbacks: { [key: string]: { [key: string]: (data: any) => void } } = {};
  
  constructor(socketServiceUrl: string) {
    this.socketServiceUrl = socketServiceUrl;
  }
  
  connect() {
    const ws = new WebSocket(this.socketServiceUrl);
    ws.onopen = function () {
      ws.send('hello');
      consoleInfo('Jk socket connected');
    };
    
    ws.onmessage = (event) => {
      if (isStringJson(event.data)) {
        const data = JSON.parse(event.data);
        if (data.event && data.id && data.payload) {
          if (this.callbacks?.[data.event]?.[data.id]) {
            this.callbacks?.[data.event]?.[data.id](data.payload);
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
    };
    
    ws.onclose = (e) => {
      if (e.reason !== FORCE_CLOSED) {
        consoleInfo('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(() => {
          this._socket = this.connect();
          if (typeof window !== 'undefined') {
            // @ts-ignore
            window.__JUKI_SOCKET_IO__ = this._socket;
          }
        }, 800);
      }
    };
    
    ws.onerror = (error) => {
      consoleError('Socket encountered error, Closing socket', error);
      ws.close();
    };
    return ws;
  }
  
  start() {
    if (this._socket?.readyState === undefined || this._socket?.readyState === WebSocket.CLOSED || this._socket?.readyState === WebSocket.CLOSING) {
      this._socket = this.connect();
    }
  }
  
  getReadyState() {
    return this._socket?.readyState;
  }
  
  stop() {
    this._socket?.close(3001, FORCE_CLOSED);
  }
  
  subscribe(event: SocketEvent, id: string) {
    if (this._socket?.readyState === WebSocket.OPEN) {
      this._socket.send(JSON.stringify({ action: 'subscribe', event, id, sessionId: getLocalToken() }));
      return true;
    }
    consoleWarn('the socket isn\'t ready');
    return false;
  }
  
  unsubscribe(event: SocketEvent, id: string) {
    if (this._socket?.readyState === WebSocket.OPEN) {
      this._socket.send(JSON.stringify({ action: 'unsubscribe', event, id, sessionId: getLocalToken() }));
      return true;
    }
    consoleWarn('the socket isn\'t ready');
    return false;
  }
  
  onMessage(event: SocketEvent, id: string, callback: (data: any) => void) {
    if (this._socket) {
      if (!this.callbacks?.[event]) {
        this.callbacks[event] = {};
      }
      this.callbacks[event][id] = callback;
      return true;
    }
    consoleWarn('the socket isn\'t ready');
    return false;
  }
}
