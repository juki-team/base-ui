import { consoleWarn, getProblemJudgeKey, HTTPMethod, Judge, UserSettingsType } from '@juki-team/commons';
import { ErrorInfo } from 'react';
import { LoginFormType } from '../components';
import { AuthorizedRequestType } from '../services';
import { SignUpPayloadDTO, UpdatePasswordPayloadDTO, UpdateUserProfileDataPayloadDTO } from '../types';

export class Settings {
  private _SERVICE_API_URL = '';
  private _UTILS_UI_URL = '';
  private _TOKEN_NAME = '';
  private _SERVICE_SOCKET_URL = '';
  private _ON_ERROR = (error: any) => consoleWarn({ message: 'a error happened', error });
  
  get SERVICE_API_URL(): string {
    return this._SERVICE_API_URL;
  }
  
  get UTILS_UI_URL(): string {
    return this._UTILS_UI_URL;
  }
  
  get TOKEN_NAME(): string {
    return this._TOKEN_NAME;
  }
  
  get SERVICE_SOCKET_URL(): string {
    return this._SERVICE_SOCKET_URL;
  }
  
  get reportError(): (error: any) => void {
    return this._ON_ERROR;
  }
  
  public getAPI() {
    type ResponseAPI = ({ url: string } & AuthorizedRequestType);
    
    const valid = <T, >(callback: (props: T) => ResponseAPI) => {
      if (this._SERVICE_API_URL) {
        return callback;
      }
      return () => ({ url: '' });
    };
    
    const injectPage = (path: string, page: number, size: number) => {
      return path + `page=${page}&size=${size}`;
    };
    
    const injectSort = (path: string, sortUrl: string | undefined) => {
      return path + (sortUrl ? '&' + sortUrl : '');
    };
    
    const injectFilter = (path: string, filterUrl: string | undefined) => {
      return path + (filterUrl ? '&' + filterUrl : '');
    };
    
    const injectBaseUrl = (prefix: string, path: string) => {
      return `${this._SERVICE_API_URL}/${prefix}${path}`;
    };
    
    return {
      auth: {
        ping: valid<void>(() => ({
          url: injectBaseUrl('auth', '/ping'),
          method: HTTPMethod.GET,
        })),
        signIn: valid<{ body: LoginFormType }>(({ body }) => ({
          url: injectBaseUrl('auth', '/sign-in'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        signUp: valid<{ body: SignUpPayloadDTO }>(({ body }) => ({
          url: injectBaseUrl('auth', '/sign-up'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        signOut: valid<void>(() => ({
          url: injectBaseUrl('auth', '/sign-out'),
          method: HTTPMethod.POST,
        })),
        initiateResetPassword: valid<{ body: { email: string } }>(({ body }) => ({
          url: injectBaseUrl('auth', '/initiate-reset-password'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        updatePassword: valid<{ body: UpdatePasswordPayloadDTO }>(({ body }) => ({
          url: injectBaseUrl('auth', '/update-password'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        resetPassword: valid<{ params: { companyKey: string, nickname: string } }>(({
                                                                                      params: {
                                                                                        companyKey,
                                                                                        nickname,
                                                                                      },
                                                                                    }) => ({
          url: injectBaseUrl('auth', `/company/${companyKey}/nickname/${nickname}/reset-password`),
          method: HTTPMethod.POST,
        })),
      },
      log: valid<{ body: { error: Error, errorInfo: ErrorInfo, location: Location, token: string } }>(({ body }) => ({
        url: injectBaseUrl('log', `/error`),
        method: HTTPMethod.POST,
        body: JSON.stringify(body),
      })),
      user: {
        summary: valid<{ params: { nickname: string } }>(({ params: { nickname } }) => ({
          url: injectBaseUrl('user', `/nickname/${nickname}/summary`),
          method: HTTPMethod.GET,
        })),
        summaryList: valid<{ params: { companyKey: string } }>(({ params: { companyKey } }) => ({
          url: injectBaseUrl('user', `/company/${companyKey}/summary-list`),
          method: HTTPMethod.GET,
        })),
        updateProfileData: valid<{
          params: { nickname: string },
          body: UpdateUserProfileDataPayloadDTO
        }>(({ params: { nickname }, body }) => ({
          url: injectBaseUrl('user', `/nickname/${nickname}/profile-data`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        updateProfileImage: valid<{ params: { nickname: string }, body: FormData }>(({
                                                                                       params: { nickname },
                                                                                       body,
                                                                                     }) => ({
          url: injectBaseUrl('user', `/nickname/${nickname}/profile-image`),
          method: HTTPMethod.PUT,
          body,
        })),
        updatePreferences: valid<{ params: { nickname: string }, body: UserSettingsType }>(({
                                                                                              params: { nickname },
                                                                                              body,
                                                                                            }) => ({
          url: injectBaseUrl('user', `/nickname/${nickname}/preferences`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        deleteSession: valid<{ params: { sessionId: string } }>(({ params: { sessionId } }) => ({
          url: injectBaseUrl('user', `/session/${sessionId}`),
          method: HTTPMethod.DELETE,
        })),
      },
      problem: {
        list: valid<{ params: { page: number, size: number, filterUrl?: string, sortUrl?: string } }>(({
                                                                                                         params: {
                                                                                                           page,
                                                                                                           size,
                                                                                                           filterUrl,
                                                                                                           sortUrl,
                                                                                                         },
                                                                                                       }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/list?'), page, size), filterUrl), sortUrl),
        })),
        summary: valid<{ params: { judge: Judge, key: string } }>(({ params: { judge, key } }) => ({
          url: injectBaseUrl('problem', `/${getProblemJudgeKey(judge, key)}/summary`),
        })),
      },
      image: {
        list: valid<void>(() => ({
          url: injectBaseUrl('image', '/list'),
        })),
        create: valid<{ body: FormData }>(({ body }) => ({
          url: injectBaseUrl('image', ''),
          method: HTTPMethod.POST,
          body,
        })),
      },
      note: {
        publish: valid<{ body: { source: string } }>(({ body }) => ({
          url: injectBaseUrl('note', '/publish'),
          method: HTTPMethod.POST,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })),
        view: valid<{ params: { sourceUrl: string } }>(({ params: { sourceUrl } }) => ({
          url: injectBaseUrl('note', `/v?sourceUrl=${sourceUrl}`),
        })),
        viewFullscreen: valid<{ params: { sourceUrl: string } }>(({ params: { sourceUrl } }) => ({
          url: injectBaseUrl('note', `/v?sourceUrl=${sourceUrl}&view=fullscreen`),
        })),
        pdf: valid<{ params: { sourceUrl: string } }>(({ params: { sourceUrl } }) => ({
          url: injectBaseUrl('note', `/pdf?sourceUrl=${sourceUrl}`),
        })),
      },
      code: {
        run: valid<{
          body: {
            language: string,
            source: string,
            inputs: { key: string, source: string }[]
            timeLimit: number,
            memoryLimit: number,
          }
        }>(({ body }) => ({
          url: injectBaseUrl('code', '/run'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      websocket: {
        connect: () => ({
          url: this._SERVICE_SOCKET_URL,
        }),
      },
    };
  }
  
  setSetting(serviceApiUrl: string, socketServiceUrl: string, utilsUiUrl: string, tokenName: string) {
    this._SERVICE_API_URL = serviceApiUrl;
    this._SERVICE_SOCKET_URL = socketServiceUrl;
    this._UTILS_UI_URL = utilsUiUrl;
    this._TOKEN_NAME = tokenName;
  }
  
  setOnError(onError: (error: any) => void) {
    this._ON_ERROR = onError;
  }
}
