import {
  consoleWarn,
  getProblemJudgeKey,
  HTTPMethod,
  Judge,
  Language,
  Theme,
  UserSettingsType,
} from '@juki-team/commons';
import { ErrorInfo } from 'react';
import {
  AuthorizedRequestType,
  SignInPayloadDTO,
  SignUpPayloadDTO,
  UpdatePasswordPayloadDTO,
  UpdateUserProfileDataPayloadDTO,
} from '../types';

const addQuery = (path: string) => {
  return !path.includes('?') ? path + '?' : path;
};

const addAnd = (path: string) => {
  return path[path.length - 1] !== '?' ? path + '&' : path;
};

const injectPage = (path: string, page: number, size: number) => {
  return addAnd(addQuery(path)) + `page=${page}&size=${size}`;
};

const injectSort = (path: string, sortUrl: string | undefined) => {
  return sortUrl ? addAnd(addQuery(path)) + sortUrl : path;
};

const injectFilter = (path: string, filterUrl: string | undefined) => {
  return filterUrl ? addAnd(addQuery(path)) + filterUrl : path;
};

const injectCompany = (path: string, companyKey: string | undefined) => {
  return companyKey ? addAnd(addQuery(path)) + `companyKey=${companyKey}` : path;
};

type ResponseAPI<M extends HTTPMethod = HTTPMethod.GET> = ({ url: string } & AuthorizedRequestType<M>);

export class Settings {
  private _SERVICE_API_URL = '';
  private _UTILS_UI_URL = '';
  private _TOKEN_NAME = '';
  private _ON_ERROR = (error: any) => consoleWarn('an error happened', { error });
  
  get SERVICE_API_URL(): string {
    return this._SERVICE_API_URL;
  }
  
  get UTILS_UI_URL(): string {
    return this._UTILS_UI_URL;
  }
  
  get TOKEN_NAME(): string {
    return this._TOKEN_NAME;
  }
  
  get reportError(): (error: any) => void {
    return this._ON_ERROR;
  }
  
  get API() {
    
    const injectBaseUrl = (prefix: string, path: string) => {
      return `${this._SERVICE_API_URL}/${prefix}${path}`;
    };
    
    const valid = <T, M extends HTTPMethod = HTTPMethod.GET>(callback: (props: T) => ResponseAPI<M>): ((props: T) => ResponseAPI<M>) => {
      if (this._SERVICE_API_URL) {
        return callback;
      }
      return () => ({ url: '', method: HTTPMethod.GET as M });
    };
    
    return {
      auth: {
        ping: valid<void>(() => ({
          url: injectBaseUrl('auth', '/ping'),
          method: HTTPMethod.GET,
        })),
        signIn: valid<
          { params?: { companyKey: string }, body: SignInPayloadDTO },
          HTTPMethod.POST
        >(({ params: { companyKey } = {}, body }) => ({
          url: injectCompany(injectBaseUrl('auth', '/sign-in'), companyKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        signUp: valid<{ body: SignUpPayloadDTO }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('auth', '/sign-up'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        createUser: valid<
          { params?: { companyKey: string }, body: SignUpPayloadDTO },
          HTTPMethod.POST
        >(({ params: { companyKey } = {}, body }) => ({
          url: injectCompany(injectBaseUrl('auth', '/sign-up'), companyKey),
          method: HTTPMethod.POST,
          body: JSON.stringify({ ...body, isGenerated: true }),
        })),
        signOut: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('auth', '/sign-out'),
          method: HTTPMethod.POST,
        })),
        initiateResetPassword: valid<{ body: { email: string } }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('auth', '/initiate-reset-password'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        updatePassword: valid<{ body: UpdatePasswordPayloadDTO }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('auth', '/update-password'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        resetPassword: valid<
          { params: { companyKey?: string, nickname: string } },
          HTTPMethod.POST
        >(({ params: { companyKey, nickname } }) => ({
          url: injectCompany(injectBaseUrl('auth', `/nickname/${nickname}/reset-password`), companyKey),
          method: HTTPMethod.POST,
        })),
      },
      log: valid<
        {
          body: {
            errorName: string,
            errorMessage: string,
            errorStack?: string,
            errorInfo: ErrorInfo,
            location: Location,
            token: string
          }
        },
        HTTPMethod.POST
      >(({ body }) => ({
        url: injectBaseUrl('log', `/error`),
        method: HTTPMethod.POST,
        body: JSON.stringify(body),
      })),
      user: {
        getSummary: valid<
          { params: { nickname: string, companyKey?: string } }
        >(({ params: { nickname, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('user', `/nickname/${nickname}/summary`), companyKey),
          method: HTTPMethod.GET,
        })),
        getSummaryList: valid<
          { params: { companyKey: string } } | void
        >(({ params: { companyKey } = { companyKey: '' } } = { params: { companyKey: '' } }) => ({
          url: injectCompany(injectBaseUrl('user', `/summary-list`), companyKey),
          method: HTTPMethod.GET,
        })),
        getProfile: valid<
          { params: { nickname: string, companyKey?: string } }
        >(({ params: { nickname, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('user', `/nickname/${nickname}/profile`), companyKey),
          method: HTTPMethod.GET,
        })),
        getMySessions: valid<void>(() => ({
          url: injectBaseUrl('user', `/my-sessions`),
          method: HTTPMethod.GET,
        })),
        updateProfileData: valid<
          {
            params: { nickname: string, companyKey?: string },
            body: UpdateUserProfileDataPayloadDTO
          }, HTTPMethod.PUT
        >(({ params: { nickname, companyKey }, body }) => ({
          url: injectCompany(injectBaseUrl('user', `/nickname/${nickname}/profile-data`), companyKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        updateProfileImage: valid<
          { params: { nickname: string, companyKey?: string }, body: FormData },
          HTTPMethod.PUT
        >(({ params: { nickname, companyKey }, body }) => ({
          url: injectCompany(injectBaseUrl('user', `/nickname/${nickname}/profile-image`), companyKey),
          method: HTTPMethod.PUT,
          body,
        })),
        updatePreferences: valid<
          { params: { nickname: string, companyKey?: string }, body: UserSettingsType },
          HTTPMethod.PUT
        >(({ params: { nickname, companyKey }, body }) => ({
          url: injectCompany(injectBaseUrl('user', `/nickname/${nickname}/preferences`), companyKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        deleteSession: valid<
          { params: { sessionId: string } },
          HTTPMethod.DELETE
        >(({ params: { sessionId } }) => ({
          url: injectBaseUrl('user', `/session/${sessionId}`),
          method: HTTPMethod.DELETE,
        })),
      },
      problem: {
        getData: valid<
          { params: { problemKey: string } }
        >(({ params: { problemKey } }) => ({
          url: injectBaseUrl('problem', `/${problemKey}/data`),
          method: HTTPMethod.GET,
        })),
        getSummaryList: valid<
          { params: { page: number, size: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, size, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/summary-list'), page, size), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSummary: valid<{ params: { judge: Judge, key: string } }>(({ params: { judge, key } }) => ({
          url: injectBaseUrl('problem', `/${getProblemJudgeKey(judge, key)}/summary`),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<
          { params: { judge: Judge, key: string, companyKey: string } }
        >(({ params: { judge, key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('problem', `/${getProblemJudgeKey(judge, key)}/logs`), companyKey),
          method: HTTPMethod.GET,
        })),
      },
      image: {
        getPublicList: valid<void>(() => ({
          url: injectBaseUrl('image', '/public-list'),
          method: HTTPMethod.GET,
        })),
        publish: valid<{ body: FormData }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('image', '/publish'),
          method: HTTPMethod.POST,
          body,
        })),
      },
      note: {
        publish: valid<{ body: { source: string } }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('note', '/publish'),
          method: HTTPMethod.POST,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })),
        getPdf: valid<{ params: { sourceUrl: string } }>(({ params: { sourceUrl } }) => ({
          url: injectBaseUrl('note', `/pdf?sourceUrl=${sourceUrl}`),
          method: HTTPMethod.GET,
        })),
        createPdf: valid<{ body: { source: string, theme: Theme } }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('note', `/pdf`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      code: {
        run: valid<
          {
            body: {
              language: string,
              source: string,
              inputs: { key: string, source: string }[]
              timeLimit: number,
              memoryLimit: number,
            }
          },
          HTTPMethod.POST
        >(({ body }) => ({
          url: injectBaseUrl('code', '/run'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      company: {
        get: valid<
          { params: { companyKey: string } } | void
        >(({ params: { companyKey } } = { params: { companyKey: '' } }) => ({
          url: injectCompany(injectBaseUrl('company', ''), companyKey),
          method: HTTPMethod.GET,
        })),
        getPermissionList: valid<void>(() => ({
          url: injectBaseUrl('company', '/permission-list?'),
          method: HTTPMethod.GET,
        })),
        getResourceSpecifications: valid<
          { params: { companyKey: string } } | void
        >(({ params: { companyKey } } = { params: { companyKey: '' } }) => ({
          url: injectCompany(injectBaseUrl('company', '/resource-specifications'), companyKey),
          method: HTTPMethod.GET,
        })),
        getEmailData: valid<
          { params: { companyKey: string } } | void
        >(({ params: { companyKey } } = { params: { companyKey: '' } }) => ({
          url: injectCompany(injectBaseUrl('company', '/email-data'), companyKey),
          method: HTTPMethod.GET,
        })),
        getJudgeProblemTags: valid<
          { params: { companyKey?: string } } | void
        >(({ params: { companyKey } } = { params: { companyKey: '' } }) => ({
          url: injectCompany(injectBaseUrl('company', `/problem-tags-list`), companyKey),
          method: HTTPMethod.GET,
        })),
        updateImage: valid<
          { params?: { companyKey: string }, body: FormData },
          HTTPMethod.PUT
        >(({ params: { companyKey } = { companyKey: '' }, body }) => ({
          url: injectCompany(injectBaseUrl('company', `/image`), companyKey),
          method: HTTPMethod.PUT,
          body,
        })),
      },
      locale: {
        get: valid<{ params: { locale: Language, namespace: string } }>(({ params: { locale, namespace } }) => ({
          url: injectBaseUrl('locale', `/${locale}/${namespace}`),
          method: HTTPMethod.GET,
        })),
      },
      judge: {
        get: valid<{ params: { judge: Judge, companyKey: string } }>(({ params: { judge, companyKey } }) => ({
          url: injectBaseUrl('judge', `/${judge}/company/${companyKey}`),
          method: HTTPMethod.GET,
        })),
      },
      worksheet: {
        getList: valid<
          { params: { page: number, size: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, size, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('worksheet', '/list'), page, size), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
      },
    };
  }
  
  get ROUTES() {
    
    const _injectOrigin = (origin?: string) => (path: string) => {
      return `${origin ? origin : ''}${path}}`;
    };
    
    return {
      judge(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          problems: {
            list() {
              return injectOrigin(`/problems`);
            },
            view({ problemJudgeKey }: { problemJudgeKey: string }) {
              return injectOrigin(`/problems/${problemJudgeKey}`);
            },
            edit({ problemJudgeKey }: { problemJudgeKey: string }) {
              return injectOrigin(`/problems/${problemJudgeKey}/edit`);
            },
            new() {
              return injectOrigin(`/problems/new`);
            },
          },
        };
      },
      utils(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          note: {
            view: ({ sourceUrl, theme }: { sourceUrl: string, theme: Theme }) => ({
              url: injectOrigin(`/note?sourceUrl=${sourceUrl}&theme=${theme}`),
            }),
          },
        };
      },
    };
  }
  
  setSetting(serviceApiUrl: string, utilsUiUrl: string, tokenName: string) {
    this._SERVICE_API_URL = serviceApiUrl;
    this._UTILS_UI_URL = utilsUiUrl;
    this._TOKEN_NAME = tokenName;
  }
  
  setOnError(onError: (error: any) => void) {
    this._ON_ERROR = onError;
  }
}
