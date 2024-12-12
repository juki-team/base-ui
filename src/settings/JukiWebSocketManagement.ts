import {
  consoleError,
  consoleInfo,
  consoleWarn,
  contentResponse,
  ContentResponseType,
  getWebSocketResponseEventKey,
  isPingWebSocketEventDTO,
  isSubscribeCodeRunStatusWebSocketEventDTO,
  isSubscribeSubmissionRunStatusWebSocketEventDTO,
  ObjectIdType,
  PingWebSocketEventDTO,
  WebSocketActionEvent,
  WebSocketEventDTO,
  WebSocketResponseEvent,
  WebSocketResponseEventDTO,
  WebSocketResponseEventKey,
} from '@juki-team/commons';
import { cleanRequest } from '../helpers';
import { jukiApiSocketManager } from './index';

const FORCE_CLOSED = 'FORCE_CLOSED';

export class JukiWebSocketManagement {
  private _socket: WebSocket | null = null;
  private socketServiceUrl: string;
  private callbacks: { [key: WebSocketResponseEventKey]: ((data: WebSocketResponseEventDTO) => void) | null } = {};
  private _messageQueue: string[] = [];
  private _reconnecting = false;
  
  constructor(socketServiceUrl: string) {
    this.socketServiceUrl = socketServiceUrl;
  }
  
  _send(message: string, persist: boolean) {
    if (this._socket?.readyState === WebSocket.OPEN) {
      this._socket.send(message);
      return true;
    }
    if (persist) {
      consoleWarn('the socket isn\'t ready, queued message', { message });
      this._messageQueue.push(message);
    } else {
      consoleWarn('the socket isn\'t ready, message not sent', { message });
    }
    
    return false;
  }
  
  async _reconnect() {
    if (this._reconnecting) {
      return;
    }
    this._reconnecting = true;
    if (!await this._connect()) {
      consoleInfo('Socket not connected successfully, reconnect will be attempted in 1 second');
      await new Promise(resolve => setTimeout(resolve, 1000));
      this._reconnecting = false;
      await this._reconnect();
    }
    this._reconnecting = false;
  }
  
  _connect(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const token = jukiApiSocketManager.getToken();
      if (!token) {
        consoleWarn('Juki web socket no connected, token not found');
        return resolve(false);
      }
      await this.stop();
      
      this._socket = new WebSocket(this.socketServiceUrl + `?sessionId=${jukiApiSocketManager.getToken()}`);
      
      if (typeof window !== 'undefined') {
        // @ts-ignore
        if (!window.__JUKI_WEB_SOCKET__) {
          // @ts-ignore
          window.__JUKI_WEB_SOCKET__ = [];
        }
        // @ts-ignore
        window.__JUKI_WEB_SOCKET__.push(this._socket);
        // with storybook: document.getElementById('storybook-preview-iframe').contentWindow.__JUKI_WEB_SOCKET__.
      }
      
      this._socket?.addEventListener('open', () => {
        resolve(true);
        const event: PingWebSocketEventDTO = { event: WebSocketActionEvent.PING, sessionId: token as ObjectIdType };
        this._send(JSON.stringify(contentResponse('hi', event)), false);
        
        while (this._messageQueue.length > 0) {
          if (!this._send(this._messageQueue.shift()!, true)) {
            break;
          }
        }
        
        consoleInfo('Juki web socket connected');
      });
      
      this._socket?.addEventListener('message', (event) => {
        const response = cleanRequest<ContentResponseType<WebSocketResponseEventDTO>>(event.data);
        if (response.success) {
          const content = response.content;
          if (this.callbacks?.[content.key]) {
            this.callbacks?.[content.key]?.(content);
            return true;
          }
          consoleWarn('no callback for key ', { content });
          return false;
        }
        consoleWarn('web socket event data not valid', event);
        return false;
      });
      
      this._socket?.addEventListener('close', (event) => {
        if (event.reason !== FORCE_CLOSED) {
          consoleError('Juki web socket closed, reconnecting...', event);
          this._reconnect();
        }
        resolve(false);
      });
      
      this._socket?.addEventListener('error', (event) => {
        consoleError('Juki web socket error, reconnecting...', event);
        this._reconnect();
        resolve(false);
      });
    });
  }
  
  start() {
    return this._reconnect();
  }
  
  getReadyState() {
    return this._socket?.readyState || WebSocket.CLOSED;
  }
  
  stop() {
    return new Promise((resolve) => {
      if (!this._socket || this._socket.readyState === WebSocket.CLOSED) {
        consoleInfo('WebSocket is already closed');
        resolve(true);
        return;
      }
      
      if (this._socket?.readyState === WebSocket.OPEN) {
        const event: PingWebSocketEventDTO = {
          event: WebSocketActionEvent.PING,
          sessionId: jukiApiSocketManager.getToken() as ObjectIdType,
        };
        this._send(JSON.stringify(contentResponse('bye', event)), false);
      }
      
      this._socket?.addEventListener('close', (e) => {
        consoleInfo('WebSocket closed');
        this._socket = null;
        this._messageQueue = [];
        this.callbacks = {};
        resolve(true);
      });
      
      this._socket.close(3001, FORCE_CLOSED); // Llama al método `close` del WebSocket
    });
  }
  
  _getKeyWebSocketEventDTO(event: WebSocketEventDTO) {
    if (isPingWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.PONG, event.sessionId, '*');
    }
    if (isSubscribeCodeRunStatusWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.CODE_RUN_STATUS_MESSAGE, event.sessionId, event.runId);
    }
    if (isSubscribeSubmissionRunStatusWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSION_RUN_STATUS_MESSAGE, event.sessionId, event.submitId);
    }
    
    return '' as WebSocketResponseEventKey;
  }
  
  send(event: WebSocketEventDTO, message?: string, callbackSubscription?: (data: WebSocketResponseEventDTO) => void) {
    if (!event.sessionId) {
      consoleWarn('session id not valid sending web socket event', { event, message, callbackSubscription });
      return;
    }
    if (callbackSubscription) {
      const eventKey = this._getKeyWebSocketEventDTO(event);
      this.callbacks[eventKey] = callbackSubscription;
    }
    
    return this._send(JSON.stringify(contentResponse(message || 'sent', event)), true);
  }
  
  unsubscribe(event: WebSocketEventDTO) {
    const eventKey = this._getKeyWebSocketEventDTO(event);
    
    this.callbacks[eventKey] = null;
    
    return this._send(JSON.stringify(contentResponse('sent', event)), true);
  }
}
