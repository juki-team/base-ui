import { HTTPMethod } from '@juki-team/commons';
import { ManagerOptions, SocketOptions } from 'socket.io-client';
import { AuthorizedRequestType } from '../services';

export class Settings {
  private _UTILS_SERVICE_URL = '';
  private _UTILS_SERVICE_API_URL = '';
  private _UTILS_UI_URL = '';
  private _TOKEN_NAME = '';
  private _UTILS_SERVICE_SOCKET_URL = '';
  
  get UTILS_SERVICE_URL(): string {
    return this._UTILS_SERVICE_URL;
  }
  
  get UTILS_SERVICE_API_URL(): string {
    return this._UTILS_SERVICE_API_URL;
  }
  
  get UTILS_UI_URL(): string {
    return this._UTILS_UI_URL;
  }
  
  get TOKEN_NAME(): string {
    return this._TOKEN_NAME;
  }
  
  get UTILS_SERVICE_SOCKET_URL(): string {
    return this._UTILS_SERVICE_SOCKET_URL;
  }
  
  public get JUKI_API() {
    return {
      PING: () => {
        return [`${this._UTILS_SERVICE_API_URL}/auth/ping`];
      },
      GET_ALL_PUBLIC_IMAGES: (): [string] => [this._UTILS_SERVICE_API_URL + '/image/list'],
      POST_PUBLIC_IMAGE: (body: FormData): [string, AuthorizedRequestType] => [
        this._UTILS_SERVICE_API_URL + '/image',
        { method: HTTPMethod.POST, body },
      ],
      POST_PUBLIC_NOTE: (body: string): [string, AuthorizedRequestType] => [
        this._UTILS_SERVICE_API_URL + '/note/publish',
        {
          method: HTTPMethod.POST,
          headers: { 'Content-Type': 'application/json' },
          body,
        },
      ],
      GET_PUBLIC_NOTE_MARKDOWN: (sourceUrl: string): [string] => [
        `${this._UTILS_UI_URL}/note/v?sourceUrl=${sourceUrl}`,
      ],
      GET_PUBLIC_NOTE_MARKDOWN_FULLSCREEN: (sourceUrl: string): [string] => [
        `${this._UTILS_UI_URL}/note/v?sourceUrl=${sourceUrl}&view=fullscreen`,
      ],
      GET_PUBLIC_NOTE_PDF: (sourceUrl: string): [string] => [
        `${this._UTILS_SERVICE_API_URL}/note/pdf?sourceUrl=${sourceUrl}`,
      ],
      POST_CODE_RUN: (body: string): [string, AuthorizedRequestType] => [
        // this._UTILS_SERVICE_API_URL + '/code/run', {
        //   method: HTTPMethod.POST,
        //   body,
        // },
        this._UTILS_SERVICE_API_URL + '/code/run',
        { method: HTTPMethod.POST, body },
      ],
      CONNECT_WEBSOCKET: (): [string, Partial<ManagerOptions & SocketOptions>] => [
        this._UTILS_SERVICE_SOCKET_URL, { withCredentials: true, transports: ['websocket'], autoConnect: false, reconnection: true },
      ],
    };
  }
  
  setSetting(utilsServiceUrl: string, utilsServiceApiVersion: string, utilsSocketServiceUrl: string, utilsUiUrl: string, tokenName: string) {
    this._UTILS_SERVICE_API_URL = utilsServiceUrl + '/' + utilsServiceApiVersion;
    this._UTILS_SERVICE_SOCKET_URL = utilsSocketServiceUrl;
    this._UTILS_UI_URL = utilsUiUrl;
    this._TOKEN_NAME = tokenName;
  }
}
