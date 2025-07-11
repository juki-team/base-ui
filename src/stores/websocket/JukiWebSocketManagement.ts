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
  private socketServiceUrl: string = '';
  private callbacks: Record<WebSocketResponseEventKey, Set<(data: WebSocketResponseEventDTO) => void>> = {};
  private messageQueue: string[] = [];
  private reconnecting = false;
  private attempts = 0;
  private eventListeners: Parameters<WebSocket['addEventListener']>[] = [];
  private readonly baseDelay = 1000;
  
  constructor() {
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
  
  addEventListener(...props: Parameters<WebSocket['addEventListener']>) {
    this.eventListeners.push(props);
  }
  
  async stop(withClean: boolean) {
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
      
      this.socket.addEventListener('close', (e) => {
        consoleInfo('WebSocket closed');
        this.socket = null;
        if (withClean) {
          this.messageQueue = [];
          this.callbacks = {};
        }
        
        resolve(true);
      });
      
      this.socket.close(3001, FORCE_CLOSED);
    });
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
    this.messageQueue = [];
    this.callbacks = {};
    if (!sessionId) {
      consoleWarn('Authentication failed: invalid session ID');
      return false;
    }
    const event: AuthenticateWebSocketEventDTO = {
      event: WebSocketActionEvent.AUTHENTICATE,
      sessionId,
    };
    return this.sendRaw(JSON.stringify(contentResponse('sending authenticate', event)), false);
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
      
      this.socket = new WebSocket(this.socketServiceUrl);
      this.eventListeners.forEach(listener => this.socket!.addEventListener(...listener));
      
      // @ts-ignore
      this.socket._id = crypto.randomUUID();
      
      if (typeof window !== 'undefined') {
        // @ts-ignore
        window.__JUKI_WEB_SOCKET__ = window.__JUKI_WEB_SOCKET__ || [];
        // @ts-ignore
        window.__JUKI_WEB_SOCKET__.push(this._socket);
        // with storybook: document.getElementById('storybook-preview-iframe').contentWindow.__JUKI_WEB_SOCKET__.
      }
      
      this.socket.addEventListener('open', () => {
        this.attempts = 0;
        consoleInfo('Juki Websocket connected');
        while (this.messageQueue.length > 0) {
          if (!this.sendRaw(this.messageQueue.shift()!, true)) {
            break;
          }
        }
        resolve(true);
      });
      
      this.socket.addEventListener('message', (event) => {
        const response = cleanRequest<ContentResponseType<WebSocketResponseEventDTO>>(event.data);
        if (response.success) {
          const content = response.content;
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
      
      this.socket.addEventListener('close', (event) => {
        if (event.reason !== FORCE_CLOSED) {
          consoleError('Juki WebSocket closed unexpectedly, reconnecting...', event);
          this.reconnect();
        }
        resolve(false);
      });
      
      this.socket.addEventListener('error', (event) => {
        consoleError('Juki WebSocket error, reconnecting...', event);
        this.reconnect();
        resolve(false);
      });
    });
    
    if (this.socket?.readyState === WebSocket.OPEN) {
      return true;
    }
    return this.reconnect();
  }
}
