import { consoleWarn, ContentResponseType } from '@juki-team/commons';
import io, { Socket } from 'socket.io-client';
import { settings } from '../config';
import { authorizedRequest, cleanRequest } from './fetch';

export class SocketIo {
  private _socket: null | Socket = null;
  // private _onListeners: { message: string, listener: (result: any) => void }[] = [];
  private _cookieSession = '';
  
  async start() {
    if (this._socket) {
      this._socket.disconnect();
    }
    this._socket = io(...settings.UTILS_API.CONNECT_WEBSOCKET());
    
    this._socket.connect();
    this._socket.on('connect', () => {
      console.info('socket connected');
      this.joinSession();
    });
    this._socket.on('disconnect', () => {
      console.info('socket disconnect');
    });
    this._socket.on('connect_error', (err) => {
      consoleWarn(`connect_error due to ${err.message}`);
    });
  }
  
  async joinSession() {
    const request = cleanRequest<ContentResponseType<string>>(await authorizedRequest(...settings.UTILS_API.POST_LOGIN()));
    this._cookieSession = (request?.success && request?.content) || '';
    if (this._cookieSession) {
      this._socket?.emit('join-session', this._cookieSession);
      console.info('join-session', this._cookieSession);
    } else {
      consoleWarn({ request, message: 'join session failed, invalid cookie session' });
    }
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
    // this._onListeners.push({ message, listener });
    if (this._socket) {
      this._socket.off(message, listener);
      return true;
    }
    consoleWarn('the socket isn\'t ready, the listener will be added when socket is ready');
    return false;
  }
  
  emit(event: string, data: string) {
    if (!this._socket) {
      consoleWarn('the socket isn\'t ready, the event will be lost');
    }
    this._socket?.emit(event, data);
  }
}