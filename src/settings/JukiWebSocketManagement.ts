import {
  AuthenticateWebSocketEventDTO,
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
  ONE_MINUTE,
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
  private callbacks: { [key: WebSocketResponseEventKey]: ((data: WebSocketResponseEventDTO) => void)[] } = {};
  private _messageQueue: string[] = [];
  private _reconnecting = false;
  private _attempts = 0;
  private _eventListeners: Parameters<WebSocket['addEventListener']>[] = [];
  private readonly _baseDelay = 1000; // 1 segundo
  
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
  
  _connect(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.stop();
      
      this._socket = new WebSocket(this.socketServiceUrl);
      
      for (const eventListener of this._eventListeners) {
        this._socket.addEventListener(...eventListener);
      }
      // @ts-ignore
      this._socket._id = crypto.randomUUID();
      
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
      
      this._socket.addEventListener('open', () => {
        this._attempts = 0;
        consoleInfo('Juki Websocket connected', this._socket);
        resolve(true);
        // const token = jukiApiSocketManager.getToken();
        // const event: PingWebSocketEventDTO = { event: WebSocketActionEvent.PING, sessionId: token as ObjectIdType };
        // this._send(JSON.stringify(contentResponse('hi', event)), false);
        
        // this.authenticate(jukiApiSocketManager.getToken() as ObjectIdType);
        while (this._messageQueue.length > 0) {
          if (!this._send(this._messageQueue.shift()!, true)) {
            break;
          }
        }
      });
      
      this._socket.addEventListener('message', (event) => {
        const response = cleanRequest<ContentResponseType<WebSocketResponseEventDTO>>(event.data);
        if (response.success) {
          const content = response.content;
          const callbacks = (this.callbacks?.[content.key] || []);
          if (callbacks.length) {
            for (const callback of callbacks) {
              callback?.(content);
            }
            return true;
          }
          consoleWarn('no callback for key ', { content, callbacks: this.callbacks });
          return false;
        }
        consoleWarn('web socket event data not valid', event);
        return false;
      });
      
      this._socket.addEventListener('close', (event) => {
        if (event.reason !== FORCE_CLOSED) {
          consoleError('Juki web socket closed, reconnecting...', event, this._socket);
          this._reconnect();
        }
        resolve(false);
      });
      
      this._socket.addEventListener('error', (event) => {
        consoleError('Juki web socket error, reconnecting...', event, this._socket);
        this._reconnect();
        resolve(false);
      });
    });
  }
  
  async _reconnect() {
    if (this._reconnecting) {
      return;
    }
    this._reconnecting = true;
    this._attempts++;
    const delay = Math.min(this._baseDelay * Math.pow(2, this._attempts), ONE_MINUTE); // Exponential backoff
    consoleInfo(`Reconnecting in ${delay / 1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    this._reconnecting = false;
    
    if (!(await this._connect())) {
      await this._reconnect();
    }
  }
  
  async connect() {
    if (this._socket?.readyState === WebSocket.OPEN) {
      return;
    }
    await this._connect();
    if (!this._socket || this._socket?.readyState !== WebSocket.OPEN) {
      return this._reconnect();
    }
  }
  
  getId() {
    // @ts-ignore
    return this._socket?._id || '';
  }
  
  getReadyState() {
    return this._socket?.readyState || WebSocket.CLOSED;
  }
  
  addEventListener(...props: Parameters<WebSocket['addEventListener']>) {
    this._eventListeners.push(props);
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
  
  subscribe(event: WebSocketEventDTO, callbackSubscription: (data: WebSocketResponseEventDTO) => void) {
    const eventKey = this._getKeyWebSocketEventDTO(event);
    if (!Array.isArray(this.callbacks[eventKey])) {
      this.callbacks[eventKey] = [];
    }
    this.callbacks[eventKey].push(callbackSubscription);
  }
  
  send(event: WebSocketEventDTO, callbackSubscription?: (data: WebSocketResponseEventDTO) => void) {
    if (!event.sessionId) {
      consoleWarn('session id not valid sending web socket event', { event, callbackSubscription });
      return;
    }
    if (callbackSubscription) {
      this.subscribe(event, callbackSubscription);
    }
    
    return this._send(JSON.stringify(contentResponse('sending new message', event)), true);
  }
  
  async authenticate(sessionId: ObjectIdType) {
    this._messageQueue = [];
    if (!sessionId) {
      consoleWarn('Juki web socket no authenticated, no valid sessionId');
      return;
    }
    const event: AuthenticateWebSocketEventDTO = {
      event: WebSocketActionEvent.AUTHENTICATE,
      sessionId,
    };
    this._send(JSON.stringify(contentResponse('authenticate', event)), true);
  }
  
  unsubscribeAll(event: WebSocketEventDTO) {
    const eventKey = this._getKeyWebSocketEventDTO(event);
    this.callbacks[eventKey] = [];
    
    return this._send(JSON.stringify(contentResponse('sent', event)), true);
  }
  
  unsubscribe(event: WebSocketEventDTO, callbackSubscription: (data: WebSocketResponseEventDTO) => void) {
    const eventKey = this._getKeyWebSocketEventDTO(event);
    this.callbacks[eventKey] = (this.callbacks[eventKey] || []).filter(callback => callback !== callbackSubscription);
  }
  
  unSend(event: WebSocketEventDTO, callbackSubscription?: (data: WebSocketResponseEventDTO) => void) {
    
    if (callbackSubscription) {
      this.unsubscribe(event, callbackSubscription);
    }
    
    return this._send(JSON.stringify(contentResponse('sent', event)), true);
  }
}
