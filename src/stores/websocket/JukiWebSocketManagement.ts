import {
  AuthenticateWebSocketEventDTO,
  cleanRequest,
  consoleError,
  consoleInfo,
  consoleWarn,
  contentResponse,
  ContentResponseType,
  getWebSocketResponseEventKey,
  isPingWebSocketEventDTO,
  isSubscribeCodeRunStatusWebSocketEventDTO,
  isSubscribeProblemCrawledWebSocketEventDTO,
  isSubscribeSenDataEc2InstancesListWebSocketEventDTO,
  isSubscribeSenDataEcsTaskDefinitionsListWebSocketEventDTO,
  isSubscribeSenDataEcsTasksListWebSocketEventDTO,
  isSubscribeSenDataSsmSessionsListWebSocketEventDTO,
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
import { jukiApiManager } from '../../settings';

const FORCE_CLOSED = 'FORCE_CLOSED';

export class JukiWebSocketManagement {
  private socket: WebSocket | null = null;
  private socketServiceUrl = '';
  private callbacks: Record<WebSocketResponseEventKey, Set<(data: WebSocketResponseEventDTO) => void>> = {};
  private messageQueue: string[] = [];
  private reconnecting = false;
  private attempts = 0;
  private eventListeners: Parameters<WebSocket['addEventListener']>[] = [];
  private readonly baseDelay = 1000;
  private isOnline = false;
  private listeners: { [key: string]: Function[] } = {};
  private socketId = '';
  private sessionId = '' as ObjectIdType;
  private connectionId = '';
  private pingInterval: ReturnType<typeof setInterval> | null = null;
  private isPageVisible = true;
  private isMouseInsidePage = true;
  
  constructor() {
  }
  
  getIsOnline() {
    return this.isOnline;
  }
  
  getSocketId() {
    return this.socketId;
  }
  
  async setSocketServiceUrl(socketServiceUrl: string) {
    if (this.socketServiceUrl !== socketServiceUrl) {
      await this.stop(true);
      this.socketServiceUrl = socketServiceUrl;
      await this.connect(true);
    } else {
      consoleWarn('socketServiceUrl already set');
    }
  }
  
  getReadyState() {
    return this.socket?.readyState || WebSocket.CLOSED;
  }
  
  async stop(withClean: boolean) {
    this.eventListeners.forEach(listener => this.socket?.removeEventListener(...listener));
    if (withClean) {
      this.clean();
      this.callbacks = {};
    }
    return new Promise<boolean>((resolve) => {
      if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
        consoleInfo('WebSocket is already closed');
        resolve(true);
        return;
      }
      
      if (this.socket.readyState === WebSocket.OPEN) {
        const event: PingWebSocketEventDTO = {
          event: WebSocketActionEvent.PING,
          sessionId: jukiApiManager.getToken() as ObjectIdType,
          href: typeof window !== 'undefined' ? window.location.href : '',
        };
        this.sendRaw(JSON.stringify(contentResponse('bye', event)), false);
      }
      
      this.socket.addEventListener('close', () => resolve(true));
      
      this.socket.close(3001, FORCE_CLOSED);
    });
  }
  
  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    if (event === 'isOnlineChanged') {
      this.emit('isOnlineChanged', { isOnline: this.isOnline });
    }
    if (event === 'connectionIdChanged') {
      this.emit('connectionIdChanged', { connectionId: this.connectionId });
    }
  }
  
  off(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }
  
  subscribe(event: WebSocketEventDTO, callbackSubscription: (data: WebSocketResponseEventDTO) => void) {
    const eventKey = this.getKeyWebSocketEventDTO(event);
    if (!Array.isArray(this.callbacks[eventKey])) {
      this.callbacks[eventKey] = new Set();
    }
    this.callbacks[eventKey].add(callbackSubscription);
  }
  
  send(event: WebSocketEventDTO, callbackSubscription?: (data: WebSocketResponseEventDTO) => void) {
    if (!event.sessionId) {
      consoleWarn('Invalid session ID in WebSocket event', { event });
      return false;
    }
    if (callbackSubscription) {
      this.subscribe(event, callbackSubscription);
    }
    
    return this.sendRaw(JSON.stringify(contentResponse('sending new message', event)), true);
  }
  
  async authenticate(sessionId: ObjectIdType) {
    if (this.sessionId !== sessionId) {
      if (!sessionId) {
        consoleWarn('Authentication failed: invalid session ID');
        return false;
      }
      this.clean();
      this.sessionId = sessionId;
    }
    const event: AuthenticateWebSocketEventDTO = {
      event: WebSocketActionEvent.AUTHENTICATE,
      sessionId,
    };
    this.sendRaw(JSON.stringify(contentResponse('sending authenticate', event)), false);
    this.startPingInterval();
    return true;
  }
  
  unsubscribeAll(event: WebSocketEventDTO) {
    const eventKey = this.getKeyWebSocketEventDTO(event);
    this.callbacks[eventKey]?.clear();
    
    return this.sendRaw(JSON.stringify(contentResponse('sending unsubscribe all', event)), true);
  }
  
  unsubscribe(event: WebSocketEventDTO, callbackSubscription: (data: WebSocketResponseEventDTO) => void) {
    const eventKey = this.getKeyWebSocketEventDTO(event);
    this.callbacks[eventKey]?.delete(callbackSubscription);
    return this.sendRaw(JSON.stringify(contentResponse('sending unsubscribe', event)), true);
  }
  
  async reconnect(): Promise<boolean> {
    if (this.reconnecting) {
      return true;
    }
    this.reconnecting = true;
    this.attempts++;
    const delay = Math.min(this.baseDelay * 2 ** this.attempts, ONE_MINUTE); // Exponential backoff
    consoleInfo(`Reconnecting in ${delay / 1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    if (await this.connect(false)) {
      this.reconnecting = false;
      return true;
    } else {
      return await this.reconnect();
    }
  }
  
  setPageVisibilityState(isVisible: boolean) {
    this.isPageVisible = isVisible;
  }
  
  setMouseInsidePageState(isInside: boolean) {
    this.isMouseInsidePage = isInside;
  }
  
  private clean() {
    consoleInfo(`cleaned ${this.messageQueue.length} queued message and ${Object.keys(this.callbacks).length} callbacks`);
    this.messageQueue = [];
    this.callbacks = {};
  }
  
  private addEventListener(...props: Parameters<WebSocket['addEventListener']>) {
    this.eventListeners.push(props);
  }
  
  private emit(event: string, ...args: any[]) {
    this.listeners[event]?.forEach(cb => cb(...args));
  }
  
  private getKeyWebSocketEventDTO(event: WebSocketEventDTO) {
    if (isPingWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.PONG, event.sessionId, '*');
    }
    if (isSubscribeCodeRunStatusWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.CODE_RUN_STATUS_MESSAGE, event.sessionId, event.runId);
    }
    if (isSubscribeSubmissionRunStatusWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSION_RUN_STATUS_MESSAGE, event.sessionId, event.submitId);
    }
    if (isSubscribeSenDataEcsTaskDefinitionsListWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_ECS_TASK_DEFINITIONS_LIST, event.sessionId, '*');
    }
    if (isSubscribeSenDataEcsTasksListWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_ECS_TASKS_LIST, event.sessionId, '*');
    }
    if (isSubscribeSenDataEc2InstancesListWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_EC2_INSTANCES_LIST, event.sessionId, '*');
    }
    if (isSubscribeSenDataSsmSessionsListWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_SSM_SESSIONS_LIST, event.sessionId, '*');
    }
    if (isSubscribeProblemCrawledWebSocketEventDTO(event)) {
      return getWebSocketResponseEventKey(WebSocketResponseEvent.PROBLEM_CRAWLED, event.sessionId, event.problemKey);
    }
    
    return '' as WebSocketResponseEventKey;
  }
  
  private sendRaw(message: string, persist: boolean) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(message);
      return true;
    }
    if (persist) {
      consoleWarn('the socket isn\'t ready, queued message', { message });
      this.messageQueue.push(message);
    } else {
      consoleWarn('the socket isn\'t ready, message not sent and discarded', { message });
    }
    
    return false;
  }
  
  private async connect(withClean: boolean): Promise<boolean> {
    
    if (!this.socketServiceUrl) {
      consoleWarn('WebSocket URL not set');
      return false;
    }
    if (this.socket?.readyState === WebSocket.OPEN) {
      return true;
    }
    
    await new Promise(async (resolve) => {
      await this.stop(withClean);
      
      this.addEventListener('open', () => {
        this.attempts = 0;
        this.updateIsOnline(true);
        const messageQueueLength = this.messageQueue.length;
        let sending = 0;
        while (this.messageQueue.length > 0) {
          if (!this.sendRaw(this.messageQueue.shift()!, true)) {
            break;
          }
          sending++;
        }
        consoleInfo(`Juki Websocket connected, sent ${sending} queued messages of ${messageQueueLength}, remaining ${this.messageQueue.length} queued messages`);
        resolve(true);
      });
      
      this.addEventListener('message', (event) => {
        const response = cleanRequest<ContentResponseType<WebSocketResponseEventDTO>>((event as MessageEvent).data);
        if (response.success) {
          const content = response.content;
          this.updateConnectionId(content.connectionId);
          const listeners = this.callbacks[content.key];
          if (listeners && listeners.size) {
            listeners.forEach(cb => cb(content));
            return;
          }
          consoleWarn('No callbacks for event key', { content, callbacks: this.callbacks });
        } else {
          consoleWarn('Invalid WebSocket message format', event);
        }
      });
      
      this.addEventListener('close', (event) => {
        this.updateIsOnline(false);
        if ((event as CloseEvent).reason !== FORCE_CLOSED) {
          consoleError('Juki WebSocket closed unexpectedly, reconnecting...', event);
          this.reconnect();
        }
        resolve(false);
      });
      
      this.addEventListener('error', (event) => {
        this.updateIsOnline(false);
        consoleError('Juki WebSocket error, reconnecting...', event);
        this.reconnect();
        resolve(false);
      });
      
      this.socket = new WebSocket(this.socketServiceUrl);
      this.eventListeners.forEach(listener => this.socket!.addEventListener(...listener));
      this.socketId = crypto.randomUUID();
      
      if (typeof window !== 'undefined') {
        // @ts-ignore
        window.__JUKI_WEB_SOCKET__ = this;
      }
    });
    
    if (this.socket?.readyState === WebSocket.OPEN) {
      return true;
    }
    return this.reconnect();
  }
  
  private updateIsOnline(isOnline: boolean) {
    if (this.isOnline !== isOnline) {
      this.isOnline = isOnline;
      this.emit('isOnlineChanged', { isOnline: this.isOnline });
      if (isOnline) {
        this.startPingInterval();
      } else {
        this.stopPingInterval();
      }
    }
  }
  
  private updateConnectionId(connectionId: string): void {
    if (this.connectionId !== connectionId) {
      this.connectionId = connectionId;
      this.emit('connectionIdChanged', { connectionId: this.connectionId });
    }
  }
  
  private startPingInterval() {
    this.stopPingInterval();
    const callback = () => {
      if (this.isPageVisible && this.isMouseInsidePage && this.sessionId) {
        const event: PingWebSocketEventDTO = {
          event: WebSocketActionEvent.PING,
          sessionId: this.sessionId,
          href: typeof window !== 'undefined' ? window.location.href : '',
        };
        this.send(event, () => null);
      }
    };
    callback();
    this.pingInterval = setInterval(callback, ONE_MINUTE);
  }
  
  private stopPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
