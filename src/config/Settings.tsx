import {
  consoleWarn,
  HTTPMethod,
  Judge,
  JudgeLanguageType,
  Language,
  Theme,
  UserSettingsType,
} from '@juki-team/commons';
import { ErrorInfo } from 'react';
import {
  AuthorizedRequestType,
  ContestTab,
  ProblemTab,
  ProfileTab,
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
        getSummaryList: valid<
          { params: { page: number, size: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, size, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/summary-list'), page, size), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSystemList: valid<
          { params: { page: number, size: number, filterUrl?: string, sortUrl?: string } }
        >(({ params: { page, size, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('problem', '/system-list'), page, size), filterUrl), sortUrl),
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
        getData: valid<
          { params: { key: string } }
        >(({ params: { key } }) => ({
          url: injectBaseUrl('contest', `/${key}/data`),
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
        getJudgeList: valid<void>(() => ({
          url: injectBaseUrl('company', '/judge-list'),
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
        getList: valid<void>(() => ({
          url: injectBaseUrl('judge', `/list`),
          method: HTTPMethod.GET,
        })),
        crawlLanguages: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('judge', '/crawl-languages'),
          method: HTTPMethod.POST,
        })),
        patch: valid<{
          params: { key: string },
          body: { languages?: JudgeLanguageType[], problemTags?: string[], name?: string }
        }, HTTPMethod.PATCH>(({ params: { key }, body: { languages, name, problemTags } }) => {
          const body: any = {};
          if (languages) {
            body.languages = languages;
          }
          if (name) {
            body.name = name;
          }
          if (problemTags) {
            body.problemTags = problemTags;
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
      return `${origin ? origin : ''}${path}`;
    };
    
    return {
      root(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return injectOrigin(`/problems`);
      },
      profiles(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          view({ nickname, tab = ProfileTab.OVERVIEW }: { nickname: string, tab?: ProfileTab }) {
            return injectOrigin(`/profiles/${nickname}?tab=${tab}`);
          },
        };
      },
      problems(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          list() {
            return injectOrigin(`/problems`);
          },
          view({ key, tab = ProblemTab.STATEMENT }: { key: string, tab?: ProblemTab }) {
            return injectOrigin(`/problems/${key}?tab=${tab}`);
          },
          edit({ key }: { key: string }) {
            return injectOrigin(`/problems/${key}/edit`);
          },
          new() {
            return injectOrigin(`/problems/new`);
          },
        };
      },
      contests(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          list() {
            return injectOrigin(`/contests`);
          },
          view({ key, tab = ContestTab.OVERVIEW, subTab }: { key: string, tab?: ContestTab, subTab?: string }) {
            return injectOrigin(`/contests/${key}?tab=${tab}${subTab ? '&subTab=' + subTab : ''}`);
          },
          edit({ key }: { key: string }) {
            return injectOrigin(`/contests/${key}/edit`);
          },
          new() {
            return injectOrigin(`/contests/new`);
          },
        };
      },
      worksheets(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          list() {
            return injectOrigin(`/worksheets`);
          },
          view({ key, page = 1 }: { key: string, page?: number }) {
            return injectOrigin(`/worksheets/${key}?page=${page}`);
          },
          edit({ key }: { key: string }) {
            return injectOrigin(`/worksheets/${key}/edit`);
          },
          new() {
            return injectOrigin(`/worksheets/new`);
          },
        };
      },
      classes(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          list() {
            return injectOrigin(`/classes`);
          },
          view({ key }: { key: string }) {
            return injectOrigin(`/classes/${key}`);
          },
          cycleView({ key, cycleId }: { key: string, cycleId: string }) {
            return injectOrigin(`/classes/${key}/cycle/${cycleId}`);
          },
          edit({ key }: { key: string }) {
            return injectOrigin(`/classes/${key}/edit`);
          },
          new() {
            return injectOrigin(`/classes/new`);
          },
        };
      },
      courses(origin?: string) {
        const injectOrigin = _injectOrigin(origin);
        return {
          list() {
            return injectOrigin(`/courses`);
          },
          view({ key }: { key: string }) {
            return injectOrigin(`/courses/${key}`);
          },
          lessonView({ key, lessonIndex, lessonPage = 1 }: { key: string, lessonIndex: number, lessonPage?: number }) {
            return injectOrigin(`/courses/${key}/lessons/${lessonIndex}?page=${lessonPage}`);
          },
          edit({ key }: { key: string }) {
            return injectOrigin(`/courses/${key}/edit`);
          },
          new() {
            return injectOrigin(`/courses/new`);
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
