import { HTTPMethod } from '@juki-team/commons';
import { ManagerOptions, SocketOptions } from 'socket.io-client';
import { AuthorizedRequestType } from '../services';

export class Settings {
  private _UTILS_SERVICE_URL = '';
  private _UTILS_SERVICE_API_URL = '';
  private _UTILS_UI_URL = '';
  private _JUKI_TOKEN_NAME = '';
  
  get UTILS_SERVICE_URL(): string {
    return this._UTILS_SERVICE_URL;
  }
  
  get UTILS_SERVICE_API_URL(): string {
    return this._UTILS_SERVICE_API_URL;
  }
  
  get UTILS_UI_URL(): string {
    return this._UTILS_UI_URL;
  }
  
  get JUKI_TOKEN_NAME(): string {
    console.log('get JUKI_TOKEN_NAME', this, this._JUKI_TOKEN_NAME);
    return this._JUKI_TOKEN_NAME;
  }
  
  public get UTILS_API() {
    return {
      GET_ALL_PUBLIC_IMAGES: (): [string] => [this._UTILS_SERVICE_API_URL + '/images'],
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
        this._UTILS_SERVICE_API_URL + '/code/run', {
          method: HTTPMethod.POST,
          body,
        },
      ],
      CONNECT_WEBSOCKET: (): [string, Partial<ManagerOptions & SocketOptions>] => [
        this._UTILS_SERVICE_URL, { withCredentials: true, transports: ['websocket'], autoConnect: false, reconnection: true },
      ],
      POST_LOGIN: (): [string, AuthorizedRequestType] => [
        this._UTILS_SERVICE_API_URL + '/auth/login', { method: HTTPMethod.POST },
      ],
    };
  }
  
  setSetting(utilsServiceUrl: string, apiVersion: string, utilsUiUrl: string, jukiTokenName: string) {
    this._UTILS_SERVICE_URL = utilsServiceUrl;
    this._UTILS_SERVICE_API_URL = utilsServiceUrl + '/' + apiVersion;
    this._UTILS_UI_URL = utilsUiUrl;
    this._JUKI_TOKEN_NAME = jukiTokenName;
  }
}
