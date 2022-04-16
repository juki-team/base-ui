import { ManagerOptions, SocketOptions } from 'socket.io-client';
import { AuthorizedRequestType } from '../services';
import { POST } from './constants';

export class Settings {
  private _UTILS_SERVICE_URL = '';
  private _UTILS_SERVICE_API_URL = '';
  private _UTILS_UI_URL = '';
  
  public get UTILS_API() {
    return {
      GET_ALL_PUBLIC_IMAGES: (): [string] => [this._UTILS_SERVICE_API_URL + '/images'],
      POST_PUBLIC_IMAGE: (body: FormData): [string, AuthorizedRequestType] => [
        this._UTILS_SERVICE_API_URL + '/image',
        { method: POST, body },
      ],
      POST_PUBLIC_NOTE: (body: string): [string, AuthorizedRequestType] => [
        this._UTILS_SERVICE_API_URL + '/note/publish',
        {
          method: POST,
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
          method: POST,
          body,
        },
      ],
      CONNECT_WEBSOCKET: (): [string, Partial<ManagerOptions & SocketOptions>] => [
        this._UTILS_SERVICE_URL, { withCredentials: true, transports: ['websocket'], autoConnect: false, reconnection: true },
      ],
      POST_LOGIN: (): [string, AuthorizedRequestType] => [
        this._UTILS_SERVICE_API_URL + '/auth/login', { method: POST },
      ],
    };
  }
  
  setSetting(utilsServiceUrl: string, apiVersion: string, utilsUiUrl: string) {
    this._UTILS_SERVICE_URL = utilsServiceUrl;
    this._UTILS_SERVICE_API_URL = utilsServiceUrl + '/' + apiVersion;
    this._UTILS_UI_URL = utilsUiUrl;
  }
}