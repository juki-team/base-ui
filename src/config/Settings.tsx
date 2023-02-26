import { consoleWarn, HTTPMethod } from '@juki-team/commons';
import { LoginFormType, SignUpFormType } from '../integrated-components';
import { AuthorizedRequestType } from '../services';

export class Settings {
  private _UTILS_SERVICE_URL = '';
  private _UTILS_SERVICE_API_URL = '';
  private _UTILS_UI_URL = '';
  private _TOKEN_NAME = '';
  private _UTILS_SERVICE_SOCKET_URL = '';
  private _ON_ERROR = (error: any) => consoleWarn({ message: 'a error happened', error });
  
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
  
  get reportError(): (error: any) => void {
    return this._ON_ERROR;
  }
  
  public getAPI() {
    type ResponseAPI = ({ url: string } & AuthorizedRequestType);
    
    const valid = <T, >(callback: (props: T) => ResponseAPI) => {
      if (this._UTILS_SERVICE_API_URL) {
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
      return `${this._UTILS_SERVICE_API_URL}/${prefix}${path}`;
    };
    
    return {
      auth: {
        ping: valid<void>(() => ({
          url: injectBaseUrl('auth', '/ping'),
          method: HTTPMethod.GET,
        })),
        signIn: valid<LoginFormType>((data) => ({
          url: injectBaseUrl('auth', '/sign-in'),
          method: HTTPMethod.POST,
          body: JSON.stringify(data),
        })),
        signUp: valid<SignUpFormType>(({ nickname, password, familyName, email, givenName }) => ({
          url: injectBaseUrl('auth', '/sign-up'),
          method: HTTPMethod.POST,
          body: JSON.stringify({
            givenName,
            familyName,
            nickname,
            email,
            password,
          }),
        })),
        initiateResetPassword: valid<{ email: string }>(({ email }) => ({
          url: injectBaseUrl('auth', '/initiate-reset-password'),
          method: HTTPMethod.POST,
          body: JSON.stringify({ email }),
        })),
      },
      problem: {
        list: valid<{ page: number, size: number, filterUrl?: string, sortUrl?: string }>(({
          page,
          size,
          filterUrl,
          sortUrl,
        }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/list?'), page, size), filterUrl), sortUrl),
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
        publish: valid<{ body: string }>(({ body }) => ({
          url: injectBaseUrl('note', '/publish'),
          method: HTTPMethod.POST,
          headers: { 'Content-Type': 'application/json' },
          body,
        })),
        view: valid<{ sourceUrl: string }>(({ sourceUrl }) => ({
          url: injectBaseUrl('note', `/v?sourceUrl=${sourceUrl}`),
        })),
        viewFullscreen: valid<{ sourceUrl: string }>(({ sourceUrl }) => ({
          url: injectBaseUrl('note', `/v?sourceUrl=${sourceUrl}&view=fullscreen`),
        })),
        pdf: valid<{ sourceUrl: string }>(({ sourceUrl }) => ({
          url: injectBaseUrl('note', `/pdf?sourceUrl=${sourceUrl}`),
        })),
      },
      code: {
        run: valid<{ body: string }>(({ body }) => ({
          url: injectBaseUrl('code', '/run'),
          method: HTTPMethod.POST,
          body,
        })),
      },
      websocket: {
        connect: () => ({
          url: this._UTILS_SERVICE_SOCKET_URL,
        }),
      },
    };
  }
  
  setSetting(utilsServiceUrl: string, utilsServiceApiVersion: string, utilsSocketServiceUrl: string, utilsUiUrl: string, tokenName: string) {
    this._UTILS_SERVICE_API_URL = utilsServiceUrl + '/' + utilsServiceApiVersion;
    this._UTILS_SERVICE_SOCKET_URL = utilsSocketServiceUrl;
    this._UTILS_UI_URL = utilsUiUrl;
    this._TOKEN_NAME = tokenName;
  }
  
  setOnError(onError: (error: any) => void) {
    this._ON_ERROR = onError;
  }
}
