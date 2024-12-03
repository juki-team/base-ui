import {
  CompanyPlan,
  HTTPMethod,
  Judge,
  JudgeLanguageType,
  Language,
  ProblemVerdict,
  Theme,
  UserSettingsType,
} from '@juki-team/commons';
import { ErrorInfo } from 'react';
import {
  AuthorizedRequestType,
  QueryParamKey,
  SignInPayloadDTO,
  SignUpPayloadDTO,
  UpdatePasswordPayloadDTO,
  UpdateUserProfileDataPayloadDTO,
} from '../types';
import { jukiApiSocketManager } from './index';
import { SocketIo } from './SocketIo';

const addQuery = (path: string) => {
  return !path.includes('?') ? path + '?' : path;
};

const addAnd = (path: string) => {
  return path[path.length - 1] !== '?' ? path + '&' : path;
};

const injectPage = (path: string, page: number, pageSize: number) => {
  return addAnd(addQuery(path)) + `page=${page}&pageSize=${pageSize}`;
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

// const UUID_WITHOUT_DASHES = /^[0-9A-F]{32}$/i;
// const UUID_WITH_DASHES = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

const validate = (representation: string) => {
  return representation.length === 24 && checkForHexRegExp.test(representation);
  // return UUID_WITHOUT_DASHES.test(representation) || UUID_WITH_DASHES.test(representation)
};

const getQueryToken = () => {
  let queryToken = '';
  if (typeof window !== 'undefined') {
    queryToken = (new URLSearchParams(window.location.search)).get(QueryParamKey.TOKEN) ?? '';
  }
  return validate(queryToken) ? queryToken : null;
};

export class ApiSocketManager {
  private _SERVICE_API_URL = '';
  
  get SERVICE_API_URL(): string {
    return this._SERVICE_API_URL;
  }
  
  private _SERVICE_API_V2_URL = '';
  
  get SERVICE_API_V2_URL(): string {
    return this._SERVICE_API_V2_URL;
  }
  
  private _TOKEN_NAME = '';
  
  get TOKEN_NAME(): string {
    return this._TOKEN_NAME;
  }
  
  private _SOCKET_SERVICE_URL = '';
  
  get SOCKET_SERVICE_URL(): string {
    return this._SOCKET_SERVICE_URL;
  }
  
  private _SOCKET = new SocketIo('');
  
  get SOCKET(): SocketIo {
    return this._SOCKET;
  }
  
  get API_V2() {
    
    const injectBaseUrl = (prefix: string, path: string) => {
      return `${this._SERVICE_API_V2_URL}/${prefix}${path}`;
    };
    
    const valid = <T, M extends HTTPMethod = HTTPMethod.GET>(callback: (props: T) => ResponseAPI<M>): ((props: T) => ResponseAPI<M>) => {
      if (this._SERVICE_API_V2_URL) {
        return callback;
      }
      return () => ({ url: '', method: HTTPMethod.GET as M });
    };
    
    return {
      export: {
        websiteToPdf: valid<{
          params: {
            url: string,
            headerTemplate?: string,
            footerTemplate?: string,
            format?: string,
            margin?: { top: string, bottom: string, left: string, right: string }
          }
        }, HTTPMethod.POST>(({ params: { url, headerTemplate, footerTemplate, margin, format } }) => ({
          url: injectBaseUrl('export', '/website-to-pdf'),
          method: HTTPMethod.POST,
          body: JSON.stringify({ url, headerTemplate, footerTemplate, margin, format }),
        })),
        problem: {
          statementToPdf: valid<{
            params: {
              key: string,
              token: string,
            }
          }, HTTPMethod.POST>(({ params: { key, token } }) => ({
            url: injectBaseUrl('export', '/problem/statement-to-pdf'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ key, token }),
          })),
        },
        contest: {
          problems: {
            statementsToPdf: valid<{
              params: {
                key: string,
                token: string,
              }
            }, HTTPMethod.POST>(({ params: { key, token } }) => ({
              url: injectBaseUrl('export', '/contest/problems/statements-to-pdf'),
              method: HTTPMethod.POST,
              body: JSON.stringify({ key, token }),
            })),
          },
        },
      },
    };
  }
  
  get API_V1() {
    
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
        updatePassword: valid<{
          params: { companyKey?: string, nickname: string },
          body: UpdatePasswordPayloadDTO
        }, HTTPMethod.POST>(({ params: { companyKey, nickname }, body }) => ({
          url: injectCompany(injectBaseUrl('auth', `/nickname/${nickname}/update-password`), companyKey),
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
        getSystemList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('user', '/system-list'), page, pageSize), filterUrl), sortUrl),
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
        getLogs: valid<
          { params: { nickname: string, companyKey?: string } }
        >(({ params: { nickname, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('user', `/nickname/${nickname}/logs`), companyKey),
          method: HTTPMethod.GET,
        })),
      },
      problem: {
        create: valid<
          void,
          HTTPMethod.POST
        >(() => ({
          url: injectBaseUrl('problem', ''),
          method: HTTPMethod.POST,
        })),
        update: valid<
          { params: { key: string } },
          HTTPMethod.PUT
        >(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}`),
          method: HTTPMethod.PUT,
        })),
        delete: valid<
          { params: { key: string } },
          HTTPMethod.DELETE
        >(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}`),
          method: HTTPMethod.DELETE,
        })),
        getData: valid<
          { params: { key: string } }
        >(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
        getBasicSummaryList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/basic-summary-list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSummaryList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/summary-list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSystemList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/system-list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSummary: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/summary`),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<
          { params: { key: string, } }
        >(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/logs`),
          method: HTTPMethod.GET,
        })),
        getTestCases: valid<
          { params: { key: string, } }
        >(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/test-cases`),
          method: HTTPMethod.GET,
        })),
        submit: valid<
          { params: { key: string }, body: { language: string, source: string } }, HTTPMethod.POST
        >(({ params: { key }, body }) => ({
          url: injectBaseUrl('problem', `/${key}/submit`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        reCrawl: valid<
          { params: { key: string } }, HTTPMethod.POST
        >(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/re-crawl`),
          method: HTTPMethod.POST,
        })),
      },
      contest: {
        getSummaryList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('contest', '/summary-list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSystemList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('contest', '/system-list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getData: valid<
          { params: { key: string } }
        >(({ params: { key } }) => ({
          url: injectBaseUrl('contest', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<
          { params: { key: string, } }
        >(({ params: { key } }) => ({
          url: injectBaseUrl('contest', `/${key}/logs`),
          method: HTTPMethod.GET,
        })),
        submit: valid<
          {
            params: { key: string, problemKey: string, companyKey?: string },
            body: { language: string, source: string }
          }, HTTPMethod.POST
        >(({ params: { key, problemKey, companyKey }, body }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/problem/${problemKey}/submit`), companyKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        recalculateScoreboard: valid<
          { params: { key: string, companyKey?: string }, }, HTTPMethod.POST
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/recalculate-scoreboard`), companyKey),
          method: HTTPMethod.POST,
        })),
      },
      submission: {
        getSummaryList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('submission', '/summary-list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSystemList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('submission', '/system-list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getExportSummaryList: valid<
          { params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('submission', '/summary-list-export'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
          responseType: 'blob',
        })),
        getData: valid<
          { params: { id: string } }
        >(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/data`),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<
          { params: { id: string, } }
        >(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/logs`),
          method: HTTPMethod.GET,
        })),
        rejudge: valid<{ params: { id: string } }, HTTPMethod.POST>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/rejudge`),
          method: HTTPMethod.POST,
        })),
        judge: valid<{ params: { id: string }, body: { verdict: ProblemVerdict } }, HTTPMethod.POST>(({
                                                                                                        params: { id },
                                                                                                        body,
                                                                                                      }) => ({
          url: injectBaseUrl('submission', `/${id}/judge`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
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
          url: injectBaseUrl('company', '/permission-list'),
          method: HTTPMethod.GET,
        })),
        getJudgeList: valid<{
          params: { companyKey: string }
        } | void>(({ params: { companyKey } } = { params: { companyKey: '' } }) => ({
          url: injectCompany(injectBaseUrl('company', '/judge-list'), companyKey),
          method: HTTPMethod.GET,
        })),
        getStats: valid<
          { params: { companyKey: string } } | void
        >(({ params: { companyKey } } = { params: { companyKey: '' } }) => ({
          url: injectCompany(injectBaseUrl('company', '/stats'), companyKey),
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
        updateImage: valid<
          { params?: { companyKey: string }, body: FormData },
          HTTPMethod.PUT
        >(({ params: { companyKey } = { companyKey: '' }, body }) => ({
          url: injectCompany(injectBaseUrl('company', `/image`), companyKey),
          method: HTTPMethod.PUT,
          body,
        })),
        updateData: valid<
          {
            params: { companyKey: string },
            body: {
              name?: string, emailTemplate?: string,
              contactEmails?: string[],
              mainEmail?: string,
              contactTelegram?: string,
              contactCellPhoneNumber?: string,
              contactEmail?: string
            }
          },
          HTTPMethod.PATCH
        >(({ params: { companyKey } = { companyKey: '' }, body }) => ({
          url: injectCompany(injectBaseUrl('company', ''), companyKey),
          method: HTTPMethod.PATCH,
          body: JSON.stringify(body),
        })),
        updateSensitiveData: valid<
          {
            params: { companyKey: string },
            body: {
              managerUserNickname?: string,
              systemAdminUserNickname?: string,
              hosts?: string[],
              judgeKeys?: string[],
              startTimestamp?: number,
              plan?: CompanyPlan,
            }
          },
          HTTPMethod.PATCH
        >(({ params: { companyKey } = { companyKey: '' }, body }) => ({
          url: injectCompany(injectBaseUrl('company', '/sensitive-data'), companyKey),
          method: HTTPMethod.PATCH,
          body: JSON.stringify(body),
        })),
      },
      locale: {
        get: valid<{ params: { locale: Language, namespace: string } }>(({ params: { locale, namespace } }) => ({
          url: injectBaseUrl('locale', `/${locale}/${namespace}`),
          method: HTTPMethod.GET,
        })),
      },
      judge: {
        getData: valid<{ params: { key: string | Judge } }>(({ params: { key } }) => ({
          url: injectBaseUrl('judge', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
        getSummaryList: valid<
          { params?: { filterUrl?: string, sortUrl?: string } } | void
        >(({ params: { filterUrl, sortUrl } = { filterUrl: '', sortUrl: '' } } = {}) => ({
          url: injectSort(injectFilter(injectBaseUrl('judge', '/summary-list'), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSystemList: valid<
          { params?: { filterUrl?: string, sortUrl?: string } } | void
        >(({ params: { filterUrl, sortUrl } = { filterUrl: '', sortUrl: '' } } = {}) => ({
          url: injectSort(injectFilter(injectBaseUrl('judge', '/system-list'), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        crawlLanguages: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('judge', '/crawl-languages'),
          method: HTTPMethod.POST,
        })),
        patch: valid<{
          params: { key: string },
          body: {
            languages?: JudgeLanguageType[],
            problemTags?: string[],
            name?: string,
            isExternal?: boolean,
            url?: string,
            logo?: string,
            logoSize?: [ number, number ]
          }
        }, HTTPMethod.PATCH>(({
                                params: { key },
                                body: { languages, name, problemTags, isExternal, url, logo, logoSize },
                              }) => {
          const body: any = {};
          if (languages) {
            body.languages = languages;
          }
          if (typeof name === 'string') {
            body.name = name;
          }
          if (problemTags) {
            body.problemTags = problemTags;
          }
          if (typeof isExternal === 'boolean') {
            body.isExternal = isExternal;
          }
          if (typeof url === 'string') {
            body.url = url;
          }
          if (typeof logo === 'string') {
            body.logo = logo;
          }
          if (logoSize) {
            body.logoSize = logoSize;
          }
          return {
            url: injectBaseUrl('judge', `/${key}`),
            method: HTTPMethod.PATCH,
            body: JSON.stringify(body),
          };
        }),
      },
      worksheet: {
        getList: valid<
          {
            params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string }
          }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('worksheet', '/list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
      },
      system: {
        runnerServicesWakeUp: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('sys', '/runner-services-wake-up'),
          method: HTTPMethod.POST,
        })),
      },
    };
  }
  
  getToken(): string {
    if (typeof localStorage !== 'undefined') {
      return getQueryToken() || localStorage.getItem(jukiApiSocketManager.TOKEN_NAME) || '';
    }
    return getQueryToken() || '';
  }
  
  isQueryToken(): boolean {
    return typeof getQueryToken() === 'string';
  }
  
  setApiSettings(serviceApiUrl: string, serviceApiV2Url: string, tokenName: string) {
    this._SERVICE_API_URL = serviceApiUrl;
    this._SERVICE_API_V2_URL = serviceApiV2Url;
    this._TOKEN_NAME = tokenName;
  }
  
  setSocketSettings(socketServiceUrl: string) {
    this._SOCKET?.stop();
    
    this._SOCKET_SERVICE_URL = socketServiceUrl;
    this._SOCKET = new SocketIo(socketServiceUrl);
  }
}
