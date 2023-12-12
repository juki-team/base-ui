import { consoleInfo, consoleWarn, ContentResponseType, SocketEvent } from '@juki-team/commons';
import io, { Socket } from 'socket.io-client';

export class SocketIo {
  private _socket: null | Socket = null;
  private _sessionId = '';
  private readonly _socketServiceUrl: string;
  private readonly _tokenName: string;
  
  constructor(socketServiceUrl: string, tokenName: string) {
    this._socketServiceUrl = socketServiceUrl;
    this._tokenName = tokenName;
  }
  
  start() {
    if (this._socket) {
      this._socket.disconnect();
    }
    this._socket = io(this._socketServiceUrl, {
      withCredentials: true,
      transports: [ 'websocket' ],
      autoConnect: false,
      reconnection: true,
    });
    
    this._socket.connect();
    
    this._socket.on('connect', async () => {
      consoleInfo('Jk socket connected');
      await this.joinSession();
    });
    
    this._socket.on('disconnect', () => {
      consoleInfo('Jk socket disconnect');
    });
    
    this._socket.on('connect_error', (error) => {
      consoleWarn('connect_error', { error });
    });
  }
  
  stop() {
    if (this._socket) {
      this._socket.disconnect();
    }
    this._socket = null;
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
    this._sessionId = localStorage.getItem(this._tokenName) || '';
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
