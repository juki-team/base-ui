import {
  CodeEditorSubmissionDTO,
  CodeRunDTO,
  CompanyPlan,
  HTTPMethod,
  JkmdSubmissionDTO,
  Judge,
  JudgeLanguageType,
  Language,
  ProblemVerdict,
  QuizOptionsSubmissionDTO,
  QuizProblemSubmissionDTO,
  Theme,
  UpsertWorksheetDTO,
  UserSettingsType,
} from '@juki-team/commons';
import type { ErrorInfo } from 'react';
import {
  AuthorizedRequestType,
  SignInPayloadDTO,
  SignUpPayloadDTO,
  UpdatePasswordPayloadDTO,
  UpdateUserProfileDataPayloadDTO,
} from '../components/types';
import { JUKI_SERVICE_V2_URL } from '../constants/settings';

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

export class ApiManager {
  
  get API_V2() {
    
    const injectBaseUrl = (prefix: string, path: string) => {
      return `${JUKI_SERVICE_V2_URL}/${prefix}${path}`;
    };
    
    const valid = <T, M extends HTTPMethod = HTTPMethod.GET>(callback: (props: T) => ResponseAPI<M>): ((props: T) => ResponseAPI<M>) => {
      if (JUKI_SERVICE_V2_URL) {
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
          { params?: { companyKey: string }, body: SignUpPayloadDTO & { overwrite: boolean } },
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
        createSession: valid<
          { params?: { companyKey: string }, body: { nickname: string } },
          HTTPMethod.POST
        >(({ params: { companyKey } = {}, body }) => ({
          url: injectCompany(injectBaseUrl('auth', '/create-session'), companyKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      log: {
        error: valid<
          {
            body: {
              errorName: string,
              errorMessage: string,
              errorStack?: string,
              errorInfo: ErrorInfo | null,
              location: Location,
              visitorSessionId: string,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data?: any,
            }
          },
          HTTPMethod.POST
        >(({ body }) => ({
          url: injectBaseUrl('log', `/error`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        info: valid<
          {
            body: {
              infoName: string,
              infoMessage: string,
              location: Location,
              visitorSessionId: string
            }
          },
          HTTPMethod.POST
        >(({ body }) => ({
          url: injectBaseUrl('log', `/info`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
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
        getAllOnlineUsers: valid<
          { params: { filterUrl?: string, sortUrl?: string } }
        >(({ params: { filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectBaseUrl('user', `/all-online-users`), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getOnlineUsers: valid<
          { params: { filterUrl?: string, sortUrl?: string } }
        >(({ params: { filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectBaseUrl('user', `/online-users`), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        deleteOldSessions: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('user', `/delete-old-sessions`),
          method: HTTPMethod.POST,
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
          { params: { nickname: string, companyKey?: string }, body: { contentType: string } },
          HTTPMethod.PUT
        >(({ params: { nickname, companyKey }, body }) => ({
          url: injectCompany(injectBaseUrl('user', `/nickname/${nickname}/profile-image`), companyKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
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
        getMetadata: valid<
          { params: { key: string } }
        >(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/metadata`),
          method: HTTPMethod.GET,
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
        crawl: valid<
          { body: { judgeKey: Judge, key: string } }, HTTPMethod.POST
        >(({ body }) => ({
          url: injectBaseUrl('problem', `/crawl`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
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
        getMetadata: valid<
          { params: { key: string, companyKey?: string } }
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/metadata`), companyKey),
          method: HTTPMethod.GET,
        })),
        getData: valid<
          { params: { key: string, companyKey?: string } }
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/data`), companyKey),
          method: HTTPMethod.GET,
        })),
        getDataEvents: valid<
          { params: { key: string, companyKey?: string } }
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/data/events`), companyKey),
          method: HTTPMethod.GET,
        })),
        getDataMembers: valid<
          { params: { key: string, companyKey?: string } }
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/data/members`), companyKey),
          method: HTTPMethod.GET,
        })),
        getDataClarifications: valid<
          { params: { key: string, companyKey?: string } }
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/data/clarifications`), companyKey),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<
          { params: { key: string, companyKey?: string } }
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/logs`), companyKey),
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
        recalculatePrerequisites: valid<
          { params: { key: string, companyKey?: string }, }, HTTPMethod.POST
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/recalculate-prerequisites`), companyKey),
          method: HTTPMethod.POST,
        })),
        problem: {
          rejudge: valid<
            { params: { key: string, problemKey: string, companyKey?: string, }, }, HTTPMethod.POST
          >(({ params: { key, problemKey, companyKey } }) => ({
            url: injectCompany(injectBaseUrl('contest', `/${key}/problem/${problemKey}/rejudge`), companyKey),
            method: HTTPMethod.POST,
          })),
          retrieve: valid<
            { params: { key: string, problemKey: string, companyKey?: string, }, }, HTTPMethod.POST
          >(({ params: { key, problemKey, companyKey } }) => ({
            url: injectCompany(injectBaseUrl('contest', `/${key}/problem/${problemKey}/retrieve`), companyKey),
            method: HTTPMethod.POST,
          })),
        },
        retrieve: valid<
          { params: { key: string, companyKey?: string, }, }, HTTPMethod.POST
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/retrieve`), companyKey),
          method: HTTPMethod.POST,
        })),
        editGlobal: valid<
          {
            params: { key: string, companyKey?: string },
            body: {
              name: string,
              problems: {
                [key: string]: {
                  key: string,
                  index: string,
                  points: number,
                  color: string,
                  startTimestamp: number,
                  endTimestamp: number
                }
              }
              tags: string[],
            }
          }, HTTPMethod.PUT
        >(({ params: { key, companyKey }, body }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/global`), companyKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        createGlobal: valid<
          {
            params: { companyKey?: string },
            body: {
              name: string,
              problems: {
                [key: string]: {
                  key: string,
                  index: string,
                  points: number,
                  color: string,
                  startTimestamp: number,
                  endTimestamp: number
                }
              }
              tags: string[],
            }
          }, HTTPMethod.POST
        >(({ params: { companyKey }, body }) => ({
          url: injectCompany(injectBaseUrl('contest', `/global`), companyKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        unlinkSubmissions: valid<
          { params: { key: string, companyKey?: string }, }, HTTPMethod.POST
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('contest', `/${key}/unlink-submissions`), companyKey),
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
          {
            params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string, withSourceCodes?: boolean }
          }
        >(({ params: { page, pageSize, filterUrl, sortUrl, withSourceCodes } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('submission', `/summary-list-export${withSourceCodes ? '?withSourceCodes=true' : ''}`), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
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
        retrieve: valid<{ params: { id: string } }, HTTPMethod.POST>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/retrieve`),
          method: HTTPMethod.POST,
        })),
        judge: valid<
          { params: { id: string }, body: { verdict: ProblemVerdict } }, HTTPMethod.POST
        >(({ params: { id }, body }) => ({
          url: injectBaseUrl('submission', `/${id}/judge`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        archive: valid<{ params: { id: string } }, HTTPMethod.POST>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/archive`),
          method: HTTPMethod.POST,
        })),
        release: valid<{ params: { id: string } }, HTTPMethod.POST>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/release`),
          method: HTTPMethod.POST,
        })),
      },
      image: {
        getPublicList: valid<void>(() => ({
          url: injectBaseUrl('image', '/public-list'),
          method: HTTPMethod.GET,
        })),
        publish: valid<{ body: { contentType: string, isPublic: boolean } }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('image', '/publish'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
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
        run: valid<{ body: CodeRunDTO }, HTTPMethod.POST
        >(({ body }) => ({
          url: injectBaseUrl('code', '/run'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      ia: {
        chatCompletions: valid<{ body: { content: string, connectionId: string } }, HTTPMethod.POST
        >(({ body }) => ({
          url: injectBaseUrl('ia', '/chat/completions'),
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
          { params?: { companyKey: string }, body: { logoType: string, contentType: string } },
          HTTPMethod.PUT
        >(({ params: { companyKey } = { companyKey: '' }, body }) => ({
          url: injectCompany(injectBaseUrl('company', `/image`), companyKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
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
        crawlLanguages: valid<{ params: { key: string } }, HTTPMethod.POST>(({ params: { key } }) => ({
          url: injectBaseUrl('judge', `/${key}/crawl-languages`),
          method: HTTPMethod.POST,
        })),
        patch: valid<{
          params: { key: string },
          body: {
            languages?: JudgeLanguageType[],
            problemTags?: string[],
            name?: string,
            isExternal?: boolean,
            isSubmitSupported?: boolean,
            url?: string,
            logo?: string,
            logoSize?: [ number, number ]
          }
        }, HTTPMethod.PATCH>(({
                                params: { key },
                                body: {
                                  languages,
                                  name,
                                  problemTags,
                                  isExternal,
                                  isSubmitSupported,
                                  url,
                                  logo,
                                  logoSize,
                                },
                              }) => {
          const body: {
            languages?: JudgeLanguageType[],
            problemTags?: string[],
            name?: string,
            isExternal?: boolean,
            isSubmitSupported?: boolean,
            url?: string,
            logo?: string,
            logoSize?: [ number, number ]
          } = {};
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
          if (typeof isSubmitSupported === 'boolean') {
            body.isSubmitSupported = isSubmitSupported;
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
        getData: valid<
          { params: { key: string, companyKey?: string } }
        >(({ params: { key, companyKey } }) => ({
          url: injectCompany(injectBaseUrl('worksheet', `/${key}/data`), companyKey),
          method: HTTPMethod.GET,
        })),
        update: valid<
          { params: { key: string, }, body: UpsertWorksheetDTO },
          HTTPMethod.PUT
        >(({ params: { key }, body }) => ({
          url: injectBaseUrl('worksheet', `/${key}`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        getList: valid<
          {
            params: { page: number, pageSize: number, filterUrl?: string, sortUrl?: string }
          }
        >(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('worksheet', '/list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSubmissionsUser: valid<
          { params: { key: string, userKey: string, secondaryKey?: string } }
        >(({ params: { key, userKey, secondaryKey } }) => ({
          url: injectBaseUrl('worksheet', `/${key}/submissions/user/${userKey}${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`),
          method: HTTPMethod.GET,
        })),
        submitJkMd: valid<
          {
            params: { worksheetKey: string, secondaryKey?: string },
            body: JkmdSubmissionDTO
          },
          HTTPMethod.POST
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl('worksheet', `/${worksheetKey}/submit/jk-md${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        submitCodeEditor: valid<
          {
            params: { worksheetKey: string, secondaryKey?: string },
            body: CodeEditorSubmissionDTO
          },
          HTTPMethod.POST
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl('worksheet', `/${worksheetKey}/submit/code-editor${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        submitQuizProblem: valid<
          {
            params: { worksheetKey: string, secondaryKey?: string },
            body: QuizProblemSubmissionDTO
          },
          HTTPMethod.POST
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl('worksheet', `/${worksheetKey}/submit/quiz-problem${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        submitQuizOptions: valid<
          {
            params: { worksheetKey: string, secondaryKey?: string },
            body: QuizOptionsSubmissionDTO
          },
          HTTPMethod.POST
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl('worksheet', `/${worksheetKey}/submit/quiz-options${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      system: {
        services: {
          checkAndStart: valid<void, HTTPMethod.POST>(() => ({
            url: injectBaseUrl('sys', '/services/check-and-start'),
            method: HTTPMethod.POST,
          })),
          check: valid<void, HTTPMethod.POST>(() => ({
            url: injectBaseUrl('sys', '/services/check'),
            method: HTTPMethod.POST,
          })),
          clean: valid<void, HTTPMethod.POST>(() => ({
            url: injectBaseUrl('sys', '/services/clean'),
            method: HTTPMethod.POST,
          })),
        },
      },
      comment: {
        get: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('comment', `/${key}`),
          method: HTTPMethod.GET,
        })),
        post: valid<
          { params: { key: string }, body: { content: string } },
          HTTPMethod.POST
        >(({ params: { key }, body }) => ({
          url: injectBaseUrl('comment', `/${key}`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        reply: valid<
          { params: { key: string, id: string }, body: { content: string } },
          HTTPMethod.POST
        >(({ params: { key, id }, body }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/reply`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        react: valid<
          { params: { key: string, id: string }, body: { emoji: string } },
          HTTPMethod.POST
        >(({ params: { key, id }, body }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/react`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        hide: valid<
          { params: { key: string, id: string } },
          HTTPMethod.POST
        >(({ params: { key, id } }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/hide`),
          method: HTTPMethod.POST,
        })),
        unhide: valid<
          { params: { key: string, id: string } },
          HTTPMethod.POST
        >(({ params: { key, id } }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/unhide`),
          method: HTTPMethod.POST,
        })),
      },
      class: {
        viewAssignmentMyWorksheetSubmitCodeEditor: valid<
          {
            params: { classKey: string, cycleId: string, sessionId: string, assignmentId: string },
            body: CodeEditorSubmissionDTO
          },
          HTTPMethod.POST
        >(({ params: { classKey, cycleId, sessionId, assignmentId }, body }) => ({
          url: injectBaseUrl('class', `/${classKey}/cycle/${cycleId}/session/${sessionId}/assignment/${assignmentId}/worksheet/submit-code-editor`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      statistics: {
        getCompanyStats: valid<
          { params: { companyKey?: string, startTimestamp: number, endTimestamp: number } }
        >(({ params: { companyKey, startTimestamp, endTimestamp } }) => ({
          url: injectCompany(injectBaseUrl('statistics', `/company?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`), companyKey),
          method: HTTPMethod.GET,
        })),
        getProblemStats: valid<
          { params: { companyKey?: string, problemKey: string, startTimestamp: number, endTimestamp: number } }
        >(({ params: { companyKey, problemKey, startTimestamp, endTimestamp } }) => ({
          url: injectCompany(injectBaseUrl('statistics', `/problem/${problemKey}?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`), companyKey),
          method: HTTPMethod.GET,
        })),
        getUsersTracksStats: valid<
          { params: { companyKeys: string, startTimestamp: number, endTimestamp: number, groupBy: number[] } }
        >(({ params: { companyKeys, startTimestamp, endTimestamp, groupBy } }) => ({
          url: injectBaseUrl('statistics', `/users-tracks?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&groupBy=${groupBy.join(',')}${companyKeys ? `&companyKeys=${companyKeys}` : ''}`),
          method: HTTPMethod.GET,
        })),
      },
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
              language: Language,
            }
          }, HTTPMethod.POST>(({ params: { key, language } }) => ({
            url: injectBaseUrl('export', '/problem/statement-to-pdf'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ key, language }),
          })),
          statementToPng: valid<{
            params: {
              key: string,
              token: string,
              language: Language,
            }
          }, HTTPMethod.POST>(({ params: { key, token, language } }) => ({
            url: injectBaseUrl('export', '/problem/statement-to-png'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ key, token, language }),
          })),
        },
        contest: {
          problems: {
            statementsToPdf: valid<{
              params: {
                key: string,
                language: Language,
              }
            }, HTTPMethod.POST>(({ params: { key, language } }) => ({
              url: injectBaseUrl('export', '/contest/problems/statements-to-pdf'),
              method: HTTPMethod.POST,
              body: JSON.stringify({ key, language }),
            })),
          },
        },
      },
      webScraping: {
        codeforces: {
          problemStatement: valid<{
            params: {
              contestId: string,
              index: string,
            }
          }, HTTPMethod.POST>(({ params: { contestId, index } }) => ({
            url: injectBaseUrl('web-scraping', '/codeforces/problem-statement'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ contestId, index }),
          })),
        },
        patito: {
          problemStatement: valid<{
            params: {
              id: string,
            }
          }, HTTPMethod.POST>(({ params: { id } }) => ({
            url: injectBaseUrl('web-scraping', '/patito/problem-statement'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ id }),
          })),
        },
      },
      websocket: {
        auth: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('websocket', '/auth'),
          method: HTTPMethod.POST,
        })),
      },
    };
  }
}
