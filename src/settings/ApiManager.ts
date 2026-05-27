import type { OrderedExcalidrawElement } from '@excalidraw/excalidraw/element/types';
import type { AppState } from '@excalidraw/excalidraw/types';
import type {
  CodeEditorSubmissionDTO,
  CodeRunDTO,
  EntityMembersDTO,
  GroupByTimestampKey,
  JkmdSubmissionDTO,
  OrganizationStylesResponseDTO,
  QuizOptionsSubmissionDTO,
  QuizProblemSubmissionDTO,
  UpsertWorksheetDTO,
} from '@juki-team/commons/dto';
import {
  type FilesJukiPub,
  HTTPMethod,
  type Judge,
  type Language,
  type OrganizationPlan,
  type ProblemVerdict,
  type Theme,
} from '@juki-team/commons/enums';
import { getUserKey } from '@juki-team/commons/helpers';
import type { ClientId, CodeEditorFiles, JudgeLanguage, UserRoles, UserSettings } from '@juki-team/commons/types';
import type { ErrorInfo } from 'react';
import type { RowDataType } from '../components/molecules/_lazy_/DataGrid/types';
import type {
  AuthorizedRequestType,
  SignInPayloadDTO,
  SignUpPayloadDTO,
  UpdatePasswordPayloadDTO,
  UpdateUserProfileDataPayloadDTO,
} from '../components/types';
import { JUKI_SERVICE_V2_URL } from '../constants/settings';

const addQuery = (path: string) => {
  return !path.includes('?') ? `${path}?` : path;
};

const addAnd = (path: string) => {
  return path[path.length - 1] !== '?' ? `${path}&` : path;
};

const injectPage = (path: string, page: number, pageSize: number) => {
  return `${addAnd(addQuery(path))}page=${page}&pageSize=${pageSize}`;
};

const injectSort = (path: string, sortUrl: string | undefined) => {
  return sortUrl ? addAnd(addQuery(path)) + sortUrl : path;
};

const injectFilter = (path: string, filterUrl: string | undefined) => {
  return filterUrl ? addAnd(addQuery(path)) + filterUrl : path;
};

const injectOrganization = (path: string, organizationKey: string | undefined) => {
  return organizationKey ? `${addAnd(addQuery(path))}organizationKey=${organizationKey}` : path;
};

type ResponseAPI<M extends HTTPMethod = 'GET'> = { url: string } & AuthorizedRequestType<M>;

export class ApiManager {
  get apiV2() {
    const injectBaseUrl = (prefix: string, path: string) => {
      return `${JUKI_SERVICE_V2_URL}/${prefix}${path}`;
    };

    const valid = <T, M extends HTTPMethod = 'GET'>(callback: (props: T) => ResponseAPI<M>): ((props: T) => ResponseAPI<M>) => {
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
        signIn: valid<{ params?: { organizationKey: string }; body: SignInPayloadDTO }, 'POST'>(
          ({ params: { organizationKey } = {}, body }) => ({
            url: injectOrganization(injectBaseUrl('auth', '/sign-in'), organizationKey),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        signUp: valid<{ body: SignUpPayloadDTO }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('auth', '/sign-up'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        createUser: valid<{ params?: { organizationKey: string }; body: SignUpPayloadDTO & { overwrite: boolean } }, 'POST'>(
          ({ params: { organizationKey } = {}, body }) => ({
            url: injectOrganization(injectBaseUrl('auth', '/sign-up'), organizationKey),
            method: HTTPMethod.POST,
            body: JSON.stringify({ ...body, isGenerated: true }),
          }),
        ),
        signOut: valid<void, 'POST'>(() => ({
          url: injectBaseUrl('auth', '/sign-out'),
          method: HTTPMethod.POST,
        })),
        initiateResetPassword: valid<{ body: { email: string } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('auth', '/initiate-reset-password'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        updatePassword: valid<
          {
            params: { organizationKey: string; nickname: string };
            body: UpdatePasswordPayloadDTO;
          },
          'POST'
        >(({ params: { organizationKey, nickname }, body }) => ({
          url: injectBaseUrl('auth', `/user-key/${getUserKey(nickname, organizationKey)}/update-password`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        resetPassword: valid<{ params: { organizationKey: string; nickname: string } }, 'POST'>(
          ({ params: { organizationKey, nickname } }) => ({
            url: injectBaseUrl('auth', `/user-key/${getUserKey(nickname, organizationKey)}/reset-password`),
            method: HTTPMethod.POST,
          }),
        ),
        createSession: valid<{ params?: { organizationKey: string }; body: { nickname: string } }, 'POST'>(
          ({ params: { organizationKey } = {}, body }) => ({
            url: injectOrganization(injectBaseUrl('auth', '/create-session'), organizationKey),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
      },
      log: {
        error: valid<
          {
            body: {
              errorName: string;
              errorMessage: string;
              errorStack?: string;
              errorInfo: ErrorInfo | null;
              location: Location;
              visitorSessionId: string;
              data?: unknown;
            };
          },
          'POST'
        >(({ body }) => ({
          url: injectBaseUrl('log', `/error`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        info: valid<
          {
            body: {
              infoName: string;
              infoMessage: string;
              location: Location;
              visitorSessionId: string;
            };
          },
          'POST'
        >(({ body }) => ({
          url: injectBaseUrl('log', `/info`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      user: {
        getSummaryList: valid<{ params?: { organizationKey: string } }>(
          ({ params: { organizationKey } = { organizationKey: '' } } = {}) => ({
            url: injectOrganization(injectBaseUrl('user', `/summary-list`), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getSystemList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('user', '/system-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getSummary: valid<{ params: { nickname: string; organizationKey: string } }>(
          ({ params: { nickname, organizationKey } }) => ({
            url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/summary`),
            method: HTTPMethod.GET,
          }),
        ),
        getProfile: valid<{ params: { nickname: string; organizationKey: string } }>(
          ({ params: { nickname, organizationKey } }) => ({
            url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/profile`),
            method: HTTPMethod.GET,
          }),
        ),
        getLogs: valid<{ params: { nickname: string; organizationKey: string } }>(
          ({ params: { nickname, organizationKey } }) => ({
            url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/logs`),
            method: HTTPMethod.GET,
          }),
        ),
        getMySessions: valid<void>(() => ({
          url: injectBaseUrl('user', `/my-sessions`),
          method: HTTPMethod.GET,
        })),
        getAllOnlineUsers: valid<{ params: { filterUrl?: string; sortUrl?: string } }>(
          ({ params: { filterUrl, sortUrl } }) => ({
            url: injectSort(injectFilter(injectBaseUrl('user', `/all-online-users`), filterUrl), sortUrl),
            method: HTTPMethod.GET,
          }),
        ),
        getOnlineUsers: valid<{ params: { filterUrl?: string; sortUrl?: string } }>(({ params: { filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectBaseUrl('user', `/online-users`), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        deleteOldSessions: valid<void, 'POST'>(() => ({
          url: injectBaseUrl('user', `/delete-old-sessions`),
          method: HTTPMethod.POST,
        })),
        updateProfileData: valid<
          {
            params: { nickname: string; organizationKey: string };
            body: UpdateUserProfileDataPayloadDTO;
          },
          'PUT'
        >(({ params: { nickname, organizationKey }, body }) => ({
          url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/profile-data`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        updateProfileImage: valid<
          { params: { nickname: string; organizationKey: string }; body: { contentType: string } },
          'PUT'
        >(({ params: { nickname, organizationKey }, body }) => ({
          url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/profile-image`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        updatePreferences: valid<{ params: { nickname: string; organizationKey: string }; body: UserSettings }, 'PUT'>(
          ({ params: { nickname, organizationKey }, body }) => ({
            url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/preferences`),
            method: HTTPMethod.PUT,
            body: JSON.stringify(body),
          }),
        ),
        updateRoles: valid<{ params: { nickname: string; organizationKey: string }; body: UserRoles }, 'PUT'>(
          ({ params: { nickname, organizationKey }, body }) => ({
            url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/roles`),
            method: HTTPMethod.PUT,
            body: JSON.stringify(body),
          }),
        ),
        deleteSession: valid<{ params: { sessionId: string } }, 'DELETE'>(({ params: { sessionId } }) => ({
          url: injectBaseUrl('user', `/session/${sessionId}`),
          method: HTTPMethod.DELETE,
        })),
        checkData: valid<
          {
            params: { organizationKey: string };
            body: {
              users: {
                email: string;
                givenName: string;
                familyName: string;
                nickname: string;
                password: string;
              }[];
            };
          },
          'POST'
        >(({ params: { organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('user', `/check-data`), organizationKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        clientTrack: valid<
          {
            body: {
              clientId: ClientId;
              location: boolean;
              screenshot: boolean;
              device: boolean;
            };
          },
          'POST'
        >(({ body }) => ({
          url: injectBaseUrl('user', `/client-track`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      problem: {
        create: valid<void, 'POST'>(() => ({
          url: injectBaseUrl('problem', ''),
          method: HTTPMethod.POST,
        })),
        update: valid<{ params: { key: string } }, 'PUT'>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}`),
          method: HTTPMethod.PUT,
        })),
        delete: valid<{ params: { key: string } }, 'DELETE'>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}`),
          method: HTTPMethod.DELETE,
        })),
        getMetadata: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/metadata`),
          method: HTTPMethod.GET,
        })),
        getData: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
        getBasicSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('problem', '/basic-summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('problem', '/summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getSystemList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('problem', '/system-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getSummary: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/summary`),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/logs`),
          method: HTTPMethod.GET,
        })),
        getTestCases: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}/test-cases`),
          method: HTTPMethod.GET,
        })),
        submit: valid<{ params: { key: string }; body: { language: string; source: string } }, 'POST'>(
          ({ params: { key }, body }) => ({
            url: injectBaseUrl('problem', `/${key}/submit`),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        crawl: valid<{ body: { judgeKey: Judge; key: string } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('problem', `/crawl`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      contest: {
        getSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('contest', '/summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getSystemList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('contest', '/system-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getMetadata: valid<{ params: { key: string; organizationKey?: string } }>(({ params: { key, organizationKey } }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/metadata`), organizationKey),
          method: HTTPMethod.GET,
        })),
        getData: valid<{ params: { key: string; organizationKey?: string } }>(({ params: { key, organizationKey } }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/data`), organizationKey),
          method: HTTPMethod.GET,
        })),
        getDataEvents: valid<{ params: { key: string; organizationKey?: string } }>(({ params: { key, organizationKey } }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/data/events`), organizationKey),
          method: HTTPMethod.GET,
        })),
        getDataMembers: valid<{ params: { key: string; organizationKey?: string } }>(
          ({ params: { key, organizationKey } }) => ({
            url: injectOrganization(injectBaseUrl('contest', `/${key}/data/members`), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getDataClarifications: valid<{ params: { key: string; organizationKey?: string } }>(
          ({ params: { key, organizationKey } }) => ({
            url: injectOrganization(injectBaseUrl('contest', `/${key}/data/clarifications`), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getScoreboard: valid<{ params: { key: string; unfrozen: boolean; organizationKey?: string; official: boolean } }>(
          ({ params: { key, unfrozen, organizationKey, official } }) => ({
            url: injectOrganization(
              injectBaseUrl(
                'contest',
                `/${key}/data/scoreboard${unfrozen ? '?state=unfrozen' : ''}${official ? `${unfrozen ? '&' : '?'}official=true` : ''}`,
              ),
              organizationKey,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getLogs: valid<{ params: { key: string; organizationKey?: string } }>(({ params: { key, organizationKey } }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/logs`), organizationKey),
          method: HTTPMethod.GET,
        })),
        submit: valid<
          {
            params: { key: string; problemKey: string; organizationKey?: string };
            body: { language: string; source: string };
          },
          'POST'
        >(({ params: { key, problemKey, organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/problem/${problemKey}/submit`), organizationKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        recalculateScoreboard: valid<{ params: { key: string; organizationKey?: string; official: boolean } }, 'POST'>(
          ({ params: { key, organizationKey, official } }) => ({
            url: injectOrganization(
              injectBaseUrl('contest', `/${key}/recalculate-scoreboard${official ? '?official=true' : ''}`),
              organizationKey,
            ),
            method: HTTPMethod.POST,
          }),
        ),
        recalculatePrerequisites: valid<{ params: { key: string; organizationKey?: string } }, 'POST'>(
          ({ params: { key, organizationKey } }) => ({
            url: injectOrganization(injectBaseUrl('contest', `/${key}/recalculate-prerequisites`), organizationKey),
            method: HTTPMethod.POST,
          }),
        ),
        problem: {
          rejudge: valid<{ params: { key: string; problemKey: string; organizationKey?: string } }, 'POST'>(
            ({ params: { key, problemKey, organizationKey } }) => ({
              url: injectOrganization(injectBaseUrl('contest', `/${key}/problem/${problemKey}/rejudge`), organizationKey),
              method: HTTPMethod.POST,
            }),
          ),
          retrieve: valid<{ params: { key: string; problemKey: string; organizationKey?: string } }, 'POST'>(
            ({ params: { key, problemKey, organizationKey } }) => ({
              url: injectOrganization(injectBaseUrl('contest', `/${key}/problem/${problemKey}/retrieve`), organizationKey),
              method: HTTPMethod.POST,
            }),
          ),
        },
        retrieve: valid<{ params: { key: string; organizationKey?: string } }, 'POST'>(
          ({ params: { key, organizationKey } }) => ({
            url: injectOrganization(injectBaseUrl('contest', `/${key}/retrieve`), organizationKey),
            method: HTTPMethod.POST,
          }),
        ),
        editGlobal: valid<
          {
            params: { key: string; organizationKey?: string };
            body: {
              name: string;
              problems: {
                [key: string]: {
                  key: string;
                  index: string;
                  points: number;
                  color: string;
                  startsAt: number;
                  endsAt: number;
                };
              };
              tags: string[];
            };
          },
          'PUT'
        >(({ params: { key, organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/global`), organizationKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        createGlobal: valid<
          {
            params: { organizationKey?: string };
            body: {
              name: string;
              problems: {
                [key: string]: {
                  key: string;
                  index: string;
                  points: number;
                  color: string;
                  startsAt: number;
                  endsAt: number;
                };
              };
              tags: string[];
            };
          },
          'POST'
        >(({ params: { organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/global`), organizationKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        unlinkSubmissions: valid<{ params: { key: string; organizationKey?: string } }, 'POST'>(
          ({ params: { key, organizationKey } }) => ({
            url: injectOrganization(injectBaseUrl('contest', `/${key}/unlink-submissions`), organizationKey),
            method: HTTPMethod.POST,
          }),
        ),
      },
      submission: {
        getSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('submission', '/summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getSystemList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('submission', '/system-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getExportSummaryList: valid<{
          params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string; withSourceCodes?: boolean };
        }>(({ params: { page, pageSize, filterUrl, sortUrl, withSourceCodes } }) => ({
          url: injectSort(
            injectFilter(
              injectPage(
                injectBaseUrl('submission', `/summary-list-export${withSourceCodes ? '?withSourceCodes=true' : ''}`),
                page,
                pageSize,
              ),
              filterUrl,
            ),
            sortUrl,
          ),
          method: HTTPMethod.GET,
        })),
        getData: valid<{ params: { id: string } }>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/data`),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<{ params: { id: string } }>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/logs`),
          method: HTTPMethod.GET,
        })),
        rejudge: valid<{ params: { id: string } }, 'POST'>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/rejudge`),
          method: HTTPMethod.POST,
        })),
        retrieve: valid<{ params: { id: string } }, 'POST'>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/retrieve`),
          method: HTTPMethod.POST,
        })),
        judge: valid<{ params: { id: string }; body: { verdict: ProblemVerdict } }, 'POST'>(({ params: { id }, body }) => ({
          url: injectBaseUrl('submission', `/${id}/judge`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        archive: valid<{ params: { id: string } }, 'POST'>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/archive`),
          method: HTTPMethod.POST,
        })),
        release: valid<{ params: { id: string } }, 'POST'>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/release`),
          method: HTTPMethod.POST,
        })),
      },
      image: {
        getPublicList: valid<void>(() => ({
          url: injectBaseUrl('image', '/public-list'),
          method: HTTPMethod.GET,
        })),
        publish: valid<{ body: { contentType: string; isPublic: boolean } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('image', '/publish'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      file: {
        publish: valid<{ body: { contentType: string; folder: FilesJukiPub } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('file', '/publish'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      note: {
        publish: valid<{ body: { source: string } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('note', '/publish'),
          method: HTTPMethod.POST,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })),
        getPdf: valid<{ params: { sourceUrl: string } }>(({ params: { sourceUrl } }) => ({
          url: injectBaseUrl('note', `/pdf?sourceUrl=${sourceUrl}`),
          method: HTTPMethod.GET,
        })),
        createPdf: valid<{ body: { source: string; theme: Theme } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('note', `/pdf`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      code: {
        run: valid<{ body: CodeRunDTO }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('code', '/run'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      ia: {
        chatCompletions: valid<{ body: { content: string; connectionId: string } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('ia', '/chat/completions'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      organization: {
        get: valid<{ params?: { organizationKey: string } }>(
          ({ params: { organizationKey } = { organizationKey: '' } } = {}) => ({
            url: injectOrganization(injectBaseUrl('organization', ''), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getPermissionList: valid<void>(() => ({
          url: injectBaseUrl('organization', '/permission-list'),
          method: HTTPMethod.GET,
        })),
        getJudgeList: valid<{
          params?: { organizationKey: string };
        }>(({ params: { organizationKey } = { organizationKey: '' } } = {}) => ({
          url: injectOrganization(injectBaseUrl('organization', '/judge-list'), organizationKey),
          method: HTTPMethod.GET,
        })),
        // biome-ignore lint/suspicious/noConfusingVoidType: void here is the standard TS pattern to allow calling the API method with no arguments (valid<T> wraps a function whose props is typed as T)
        getTrustedCompaniesList: valid<{ params?: { organizationKey: string } } | void>(
          ({ params: { organizationKey } = { organizationKey: '' } } = {}) => ({
            url: injectOrganization(injectBaseUrl('organization', '/trusted-organizations-list'), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getResourceSpecifications: valid<{ params?: { organizationKey: string } }>(
          ({ params: { organizationKey } = { organizationKey: '' } } = {}) => ({
            url: injectOrganization(injectBaseUrl('organization', '/resource-specifications'), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getEmailData: valid<{ params?: { organizationKey: string } }>(
          ({ params: { organizationKey } = { organizationKey: '' } } = {}) => ({
            url: injectOrganization(injectBaseUrl('organization', '/email-data'), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        updateImage: valid<{ params?: { organizationKey: string }; body: { logoType: string; contentType: string } }, 'PUT'>(
          ({ params: { organizationKey } = { organizationKey: '' }, body }) => ({
            url: injectOrganization(injectBaseUrl('organization', `/image`), organizationKey),
            method: HTTPMethod.PUT,
            body: JSON.stringify(body),
          }),
        ),
        updateData: valid<
          {
            params: { organizationKey: string };
            body: {
              name?: string;
              emailTemplate?: string;
              contactEmails?: string[];
              mainEmail?: string;
              contactTelegram?: string;
              contactCellPhoneNumber?: string;
              contactEmail?: string;
              styles?: OrganizationStylesResponseDTO;
            };
          },
          'PATCH'
        >(({ params: { organizationKey } = { organizationKey: '' }, body }) => ({
          url: injectOrganization(injectBaseUrl('organization', ''), organizationKey),
          method: HTTPMethod.PATCH,
          body: JSON.stringify(body),
        })),
        updateSensitiveData: valid<
          {
            params: { organizationKey: string };
            body: {
              managerUserNickname?: string;
              systemAdminUserNickname?: string;
              hosts?: string[];
              judgeKeys?: string[];
              trustedOrganizationsKeys?: string[];
              startTimestamp?: number;
              plan?: OrganizationPlan;
            };
          },
          'PATCH'
        >(({ params: { organizationKey } = { organizationKey: '' }, body }) => ({
          url: injectOrganization(injectBaseUrl('organization', '/sensitive-data'), organizationKey),
          method: HTTPMethod.PATCH,
          body: JSON.stringify(body),
        })),
      },
      locale: {
        get: valid<{ params: { locale: Language; namespace: string } }>(({ params: { locale, namespace } }) => ({
          url: injectBaseUrl('locale', `/${locale}/${namespace}`),
          method: HTTPMethod.GET,
        })),
      },
      judge: {
        getData: valid<{ params: { key: string | Judge } }>(({ params: { key } }) => ({
          url: injectBaseUrl('judge', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
        // biome-ignore lint/suspicious/noConfusingVoidType: void here is the standard TS pattern to allow calling the API method with no arguments
        getSummaryList: valid<{ params?: { filterUrl?: string; sortUrl?: string } } | void>(
          ({ params: { filterUrl, sortUrl } = { filterUrl: '', sortUrl: '' } } = {}) => ({
            url: injectSort(injectFilter(injectBaseUrl('judge', '/summary-list'), filterUrl), sortUrl),
            method: HTTPMethod.GET,
          }),
        ),
        // biome-ignore lint/suspicious/noConfusingVoidType: void here is the standard TS pattern to allow calling the API method with no arguments
        getSystemList: valid<{ params?: { filterUrl?: string; sortUrl?: string } } | void>(
          ({ params: { filterUrl, sortUrl } = { filterUrl: '', sortUrl: '' } } = {}) => ({
            url: injectSort(injectFilter(injectBaseUrl('judge', '/system-list'), filterUrl), sortUrl),
            method: HTTPMethod.GET,
          }),
        ),
        crawlLanguages: valid<{ params: { key: string } }, 'POST'>(({ params: { key } }) => ({
          url: injectBaseUrl('judge', `/${key}/crawl-languages`),
          method: HTTPMethod.POST,
        })),
        patch: valid<
          {
            params: { key: string };
            body: {
              languages?: JudgeLanguage[];
              problemTags?: string[];
              name?: string;
              isExternal?: boolean;
              isSubmitSupported?: boolean;
              url?: string;
              logo?: string;
              logoSize?: [number, number];
            };
          },
          'PATCH'
        >(({ params: { key }, body: { languages, name, problemTags, isExternal, isSubmitSupported, url, logo, logoSize } }) => {
          const body: {
            languages?: JudgeLanguage[];
            problemTags?: string[];
            name?: string;
            isExternal?: boolean;
            isSubmitSupported?: boolean;
            url?: string;
            logo?: string;
            logoSize?: [number, number];
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
        getData: valid<{ params: { key: string; organizationKey?: string } }>(({ params: { key, organizationKey } }) => ({
          url: injectOrganization(injectBaseUrl('worksheet', `/${key}/data`), organizationKey),
          method: HTTPMethod.GET,
        })),
        update: valid<{ params: { key: string }; body: UpsertWorksheetDTO }, 'PUT'>(({ params: { key }, body }) => ({
          url: injectBaseUrl('worksheet', `/${key}`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        getList: valid<{
          params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string };
        }>(({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
          url: injectSort(injectFilter(injectPage(injectBaseUrl('worksheet', '/list'), page, pageSize), filterUrl), sortUrl),
          method: HTTPMethod.GET,
        })),
        getSubmissionsUser: valid<{ params: { key: string; userKey: string; secondaryKey?: string } }>(
          ({ params: { key, userKey, secondaryKey } }) => ({
            url: injectBaseUrl(
              'worksheet',
              `/${key}/submissions/user/${userKey}${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        submitJkMd: valid<
          {
            params: { worksheetKey: string; secondaryKey?: string };
            body: JkmdSubmissionDTO;
          },
          'POST'
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl(
            'worksheet',
            `/${worksheetKey}/submit/jk-md${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`,
          ),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        submitCodeEditor: valid<
          {
            params: { worksheetKey: string; secondaryKey?: string };
            body: CodeEditorSubmissionDTO;
          },
          'POST'
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl(
            'worksheet',
            `/${worksheetKey}/submit/code-editor${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`,
          ),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        submitQuizProblem: valid<
          {
            params: { worksheetKey: string; secondaryKey?: string };
            body: QuizProblemSubmissionDTO;
          },
          'POST'
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl(
            'worksheet',
            `/${worksheetKey}/submit/quiz-problem${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`,
          ),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        submitQuizOptions: valid<
          {
            params: { worksheetKey: string; secondaryKey?: string };
            body: QuizOptionsSubmissionDTO;
          },
          'POST'
        >(({ params: { worksheetKey, secondaryKey }, body }) => ({
          url: injectBaseUrl(
            'worksheet',
            `/${worksheetKey}/submit/quiz-options${secondaryKey ? `?secondaryKey=${secondaryKey}` : ''}`,
          ),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      system: {
        services: {
          checkAndStart: valid<void, 'POST'>(() => ({
            url: injectBaseUrl('sys', '/services/check-and-start'),
            method: HTTPMethod.POST,
          })),
          check: valid<void, 'POST'>(() => ({
            url: injectBaseUrl('sys', '/services/check'),
            method: HTTPMethod.POST,
          })),
          clean: valid<void, 'POST'>(() => ({
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
        post: valid<{ params: { key: string }; body: { content: string } }, 'POST'>(({ params: { key }, body }) => ({
          url: injectBaseUrl('comment', `/${key}`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        reply: valid<{ params: { key: string; id: string }; body: { content: string } }, 'POST'>(
          ({ params: { key, id }, body }) => ({
            url: injectBaseUrl('comment', `/${key}/${id}/reply`),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        react: valid<{ params: { key: string; id: string }; body: { emoji: string } }, 'POST'>(
          ({ params: { key, id }, body }) => ({
            url: injectBaseUrl('comment', `/${key}/${id}/react`),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        hide: valid<{ params: { key: string; id: string } }, 'POST'>(({ params: { key, id } }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/hide`),
          method: HTTPMethod.POST,
        })),
        unhide: valid<{ params: { key: string; id: string } }, 'POST'>(({ params: { key, id } }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/unhide`),
          method: HTTPMethod.POST,
        })),
      },
      class: {
        viewAssignmentMyWorksheetSubmitCodeEditor: valid<
          {
            params: { classKey: string; cycleId: string; sessionId: string; assignmentId: string };
            body: CodeEditorSubmissionDTO;
          },
          'POST'
        >(({ params: { classKey, cycleId, sessionId, assignmentId }, body }) => ({
          url: injectBaseUrl(
            'class',
            `/${classKey}/cycle/${cycleId}/session/${sessionId}/assignment/${assignmentId}/worksheet/submit-code-editor`,
          ),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      documentTemplate: {
        create: valid<{ body: { name: string } }, 'POST'>(({ body }) => ({
          url: injectBaseUrl('document-template', ''),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        getSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('document-template', '/summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        getData: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('document-template', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
        updateData: valid<
          {
            params: { key: string; organizationKey?: string };
            body: {
              name: string;
              templates: { id: string; name: string; template: string }[];
              files: { id: string; name: string; data: RowDataType[] }[];
            };
          },
          'PUT'
        >(({ params: { key, organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('document-template', `/${key}`), organizationKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
      },
      statistics: {
        getorganizationStats: valid<{
          params: {
            organizationKey?: string;
            startTimestamp: number;
            endTimestamp: number;
            groupBy: GroupByTimestampKey[];
          };
        }>(({ params: { organizationKey, startTimestamp, endTimestamp, groupBy } }) => ({
          url: injectOrganization(
            injectBaseUrl(
              'statistics',
              `/organization?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&groupBy=${groupBy.join(',')}`,
            ),
            organizationKey,
          ),
          method: HTTPMethod.GET,
        })),
        getProblemStats: valid<{
          params: { organizationKey?: string; problemKey: string; startTimestamp: number; endTimestamp: number };
        }>(({ params: { organizationKey, problemKey, startTimestamp, endTimestamp } }) => ({
          url: injectOrganization(
            injectBaseUrl('statistics', `/problem/${problemKey}?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`),
            organizationKey,
          ),
          method: HTTPMethod.GET,
        })),
        getUsersTracksStats: valid<{
          params: {
            organizationKeys: string;
            startTimestamp: number;
            endTimestamp: number;
            groupBy: GroupByTimestampKey[];
          };
        }>(({ params: { organizationKeys, startTimestamp, endTimestamp, groupBy } }) => ({
          url: injectBaseUrl(
            'statistics',
            `/users-tracks?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&groupBy=${groupBy.join(',')}${organizationKeys ? `&organizationKeys=${organizationKeys}` : ''}`,
          ),
          method: HTTPMethod.GET,
        })),
      },
      excalidraw: {
        getSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('excalidraw', '/summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        create: valid<
          {
            body: {
              name: string;
              tags: string[];
              elements: OrderedExcalidrawElement[];
              appsState: AppState;
              members: EntityMembersDTO;
            };
          },
          'POST'
        >(({ body }) => ({
          url: injectBaseUrl('excalidraw', ''),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        updateData: valid<
          {
            params: { key: string };
            body: {
              name: string;
              tags: string[];
              elements: OrderedExcalidrawElement[];
              appsState: AppState;
              members: EntityMembersDTO;
            };
          },
          'PUT'
        >(({ params: { key }, body }) => ({
          url: injectBaseUrl('excalidraw', `/${key}/data`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        getMetadata: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('excalidraw', `/${key}/metadata`),
          method: HTTPMethod.GET,
        })),
        getData: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('excalidraw', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
      },
      mermaid: {
        getSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('mermaid', '/summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        create: valid<
          {
            body: {
              name: string;
              tags: string[];
              files: CodeEditorFiles<'MERMAID'>;
              members: EntityMembersDTO;
            };
          },
          'POST'
        >(({ body }) => ({
          url: injectBaseUrl('mermaid', ''),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        updateData: valid<
          {
            params: { key: string };
            body: {
              name: string;
              tags: string[];
              files: CodeEditorFiles<'MERMAID'>;
              members: EntityMembersDTO;
            };
          },
          'PUT'
        >(({ params: { key }, body }) => ({
          url: injectBaseUrl('mermaid', `/${key}/data`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        getMetadata: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('mermaid', `/${key}/metadata`),
          method: HTTPMethod.GET,
        })),
        getData: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('mermaid', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
      },
      markdown: {
        getSummaryList: valid<{ params: { page: number; pageSize: number; filterUrl?: string; sortUrl?: string } }>(
          ({ params: { page, pageSize, filterUrl, sortUrl } }) => ({
            url: injectSort(
              injectFilter(injectPage(injectBaseUrl('markdown', '/summary-list'), page, pageSize), filterUrl),
              sortUrl,
            ),
            method: HTTPMethod.GET,
          }),
        ),
        create: valid<
          {
            body: {
              name: string;
              tags: string[];
              files: CodeEditorFiles<'MERMAID'>;
              members: EntityMembersDTO;
            };
          },
          'POST'
        >(({ body }) => ({
          url: injectBaseUrl('markdown', ''),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        updateData: valid<
          {
            params: { key: string };
            body: {
              name: string;
              tags: string[];
              files: CodeEditorFiles<'MARKDOWN'>;
              members: EntityMembersDTO;
            };
          },
          'PUT'
        >(({ params: { key }, body }) => ({
          url: injectBaseUrl('markdown', `/${key}/data`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        getMetadata: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('markdown', `/${key}/metadata`),
          method: HTTPMethod.GET,
        })),
        getData: valid<{ params: { key: string } }>(({ params: { key } }) => ({
          url: injectBaseUrl('markdown', `/${key}/data`),
          method: HTTPMethod.GET,
        })),
      },
      export: {
        websiteToPdf: valid<
          {
            params: {
              url: string;
              headerTemplate?: string;
              footerTemplate?: string;
              format?: string;
              margin?: { top: string; bottom: string; left: string; right: string };
            };
          },
          'POST'
        >(({ params: { url, headerTemplate, footerTemplate, margin, format } }) => ({
          url: injectBaseUrl('export', '/website-to-pdf'),
          method: HTTPMethod.POST,
          body: JSON.stringify({ url, headerTemplate, footerTemplate, margin, format }),
        })),
        problem: {
          statementToPdf: valid<
            {
              params: {
                key: string;
                language: Language;
              };
            },
            'POST'
          >(({ params: { key, language } }) => ({
            url: injectBaseUrl('export', '/problem/statement-to-pdf'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ key, language }),
          })),
          statementToPng: valid<
            {
              params: {
                key: string;
                token: string;
                language: Language;
              };
            },
            'POST'
          >(({ params: { key, token, language } }) => ({
            url: injectBaseUrl('export', '/problem/statement-to-png'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ key, token, language }),
          })),
        },
        contest: {
          problems: {
            statementsToPdf: valid<
              {
                params: {
                  key: string;
                  language: Language;
                };
              },
              'POST'
            >(({ params: { key, language } }) => ({
              url: injectBaseUrl('export', '/contest/problems/statements-to-pdf'),
              method: HTTPMethod.POST,
              body: JSON.stringify({ key, language }),
            })),
          },
        },
      },
      webScraping: {
        codeforces: {
          problemStatement: valid<
            {
              params: {
                contestId: string;
                index: string;
              };
            },
            'POST'
          >(({ params: { contestId, index } }) => ({
            url: injectBaseUrl('web-scraping', '/codeforces/problem-statement'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ contestId, index }),
          })),
        },
        patito: {
          problemStatement: valid<
            {
              params: {
                id: string;
              };
            },
            'POST'
          >(({ params: { id } }) => ({
            url: injectBaseUrl('web-scraping', '/patito/problem-statement'),
            method: HTTPMethod.POST,
            body: JSON.stringify({ id }),
          })),
        },
      },
      websocket: {
        auth: valid<void, 'POST'>(() => ({
          url: injectBaseUrl('websocket', '/auth'),
          method: HTTPMethod.POST,
        })),
      },
    };
  }
}
