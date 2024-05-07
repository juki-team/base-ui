import { consoleInfo, consoleWarn, ContentResponseType, SocketEvent } from '@juki-team/commons';
import io, { Socket } from 'socket.io-client';
import { getLocalToken } from '../../helpers';

export class SocketIo {
  private readonly _socket: Socket;
  private _sessionId = '';
  private readonly _socketServiceUrl: string;
  
  constructor(socketServiceUrl: string) {
    this._socketServiceUrl = socketServiceUrl;
    this._socket = io(this._socketServiceUrl, {
      withCredentials: true,
      transports: [ 'websocket' ],
      autoConnect: false,
      reconnection: true,
    });
  }
  
  async onConnect() {
    consoleInfo('Jk socket connected');
    await this.joinSession();
  }
  
  onDisconnect() {
    consoleInfo('Jk socket disconnect');
  }
  
  onConnectError(error: any) {
    consoleWarn('connect_error', { error, req: error.req, code: error.code, message: error.message, context: error.context });
  }
  
  start() {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.__JUKI_SOCKET_IO__ = this._socket;
    }
    this._socket.connect();
    
    this._socket.on('connect', this.onConnect.bind(this));
    
    this._socket.on('disconnect', this.onDisconnect);
    
    this._socket.on('connect_error', this.onConnectError);
  }
  
  stop() {
    this._socket.off('connect', this.onConnect.bind(this));
    
    this._socket.off('disconnect', this.onDisconnect);
    
    this._socket.off('connect_error', this.onConnectError);
    
    this._socket.disconnect();
  }
  
  emitAsync(event: string, payload: any): Promise<ContentResponseType<string>> {
    return new Promise((resolve, reject) => {
      if (!this._socket) {
        consoleWarn('the socket isn\'t ready, the event will be lost');
      }
      return this._socket?.emit(event, payload, (response: ContentResponseType<string>) => {
        if (response.success) {
          return resolve(response);
        }
        reject(response);
      });
    });
  }
  
  async joinSession() {
    this._sessionId = getLocalToken();
    if (this._sessionId) {
      try {
        const response = await this.emitAsync(SocketEvent.SIGN_IN, this._sessionId);
        consoleInfo('join session', response.message);
      } catch (error) {
        consoleWarn('error on joinSession', { error });
      }
    } else {
      consoleWarn('join session failed, invalid cookie session');
    }
  }
  
  async leaveSession() {
    if (this._sessionId) {
      try {
        const response = await this.emitAsync(SocketEvent.SIGN_OUT, this._sessionId);
        consoleInfo('leave session', response.message);
      } catch (error) {
        consoleWarn('error on leaveSession', { error });
      }
    } else {
      consoleWarn('leave session failed, invalid cookie session');
    }
    this._sessionId = '';
  }
  
  on(message: string, listener: (result: any) => void) {
    if (this._socket) {
      this._socket.on(message, listener);
      return true;
    }
    consoleWarn('the socket isn\'t ready, the listener will be added when socket is ready');
    return false;
  }
  
  off(message: string, listener: (result: any) => void) {
    if (this._socket) {
      this._socket.off(message, listener);
      return true;
    }
    consoleWarn('the socket isn\'t ready, the listener will be added when socket is ready');
    return false;
  }
}
