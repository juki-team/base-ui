import { OrderedExcalidrawElement } from '@excalidraw/excalidraw/element/types';
import { AppState } from '@excalidraw/excalidraw/types';
import {
  CodeEditorFiles,
  CodeEditorSubmissionDto,
  CodeLanguage,
  CodeRunDto,
  EntityMembersDto,
  FilesJukiPub,
  getUserKey,
  GroupByTimestampKey,
  HTTPMethod,
  JkmdSubmissionDto,
  Judge,
  JudgeLanguage,
  Language,
  OrganizationPlan,
  OrganizationStyles,
  ProblemVerdict,
  QuizOptionsSubmissionDto,
  QuizProblemSubmissionDto,
  Theme,
  UpsertWorksheetDto,
  UserRoles,
  UserSettings,
} from '@juki-team/commons';
import type { ErrorInfo } from 'react';
import { RowDataType } from '../components/molecules/_lazy_/DataGrid/types';
import {
  AuthorizedRequestType,
  SignInPayloadDto,
  SignUpPayloadDto,
  UpdatePasswordPayloadDto,
  UpdateUserProfileDataPayloadDto,
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

const injectOrganization = (path: string, organizationKey: string | undefined) => {
  return organizationKey ? addAnd(addQuery(path)) + `companyKey=${organizationKey}` : path;
};

type ResponseAPI<M extends HTTPMethod = HTTPMethod.GET> = { url: string } & AuthorizedRequestType<M>;

export class ApiManager {
  get API_V2() {
    const injectBaseUrl = (prefix: string, path: string) => {
      return `${JUKI_SERVICE_V2_URL}/${prefix}${path}`;
    };

    const valid = <T, M extends HTTPMethod = HTTPMethod.GET>(
      callback: (props: T) => ResponseAPI<M>,
    ): ((props: T) => ResponseAPI<M>) => {
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
        signIn: valid<{ params?: { organizationKey: string }; body: SignInPayloadDto }, HTTPMethod.POST>(
          ({ params: { organizationKey } = {}, body }) => ({
            url: injectOrganization(injectBaseUrl('auth', '/sign-in'), organizationKey),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        signUp: valid<{ body: SignUpPayloadDto }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('auth', '/sign-up'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        createUser: valid<
          { params?: { organizationKey: string }; body: SignUpPayloadDto & { overwrite: boolean } },
          HTTPMethod.POST
        >(({ params: { organizationKey } = {}, body }) => ({
          url: injectOrganization(injectBaseUrl('auth', '/sign-up'), organizationKey),
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
        updatePassword: valid<
          {
            params: { organizationKey: string; nickname: string };
            body: UpdatePasswordPayloadDto;
          },
          HTTPMethod.POST
        >(({ params: { organizationKey, nickname }, body }) => ({
          url: injectBaseUrl('auth', `/user-key/${getUserKey(nickname, organizationKey)}/update-password`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        resetPassword: valid<{ params: { organizationKey: string; nickname: string } }, HTTPMethod.POST>(
          ({ params: { organizationKey, nickname } }) => ({
            url: injectBaseUrl('auth', `/user-key/${getUserKey(nickname, organizationKey)}/reset-password`),
            method: HTTPMethod.POST,
          }),
        ),
        createSession: valid<{ params?: { organizationKey: string }; body: { nickname: string } }, HTTPMethod.POST>(
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
          HTTPMethod.POST
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
          HTTPMethod.POST
        >(({ body }) => ({
          url: injectBaseUrl('log', `/info`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      user: {
        getSummaryList: valid<{ params: { organizationKey: string } } | void>(
          ({ params: { organizationKey } = { organizationKey: '' } } = { params: { organizationKey: '' } }) => ({
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
        getSummary: valid<{ params: { nickname: string; organizationKey: string } }>(({ params: { nickname, organizationKey } }) => ({
          url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/summary`),
          method: HTTPMethod.GET,
        })),
        getProfile: valid<{ params: { nickname: string; organizationKey: string } }>(({ params: { nickname, organizationKey } }) => ({
          url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/profile`),
          method: HTTPMethod.GET,
        })),
        getLogs: valid<{ params: { nickname: string; organizationKey: string } }>(({ params: { nickname, organizationKey } }) => ({
          url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/logs`),
          method: HTTPMethod.GET,
        })),
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
        deleteOldSessions: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('user', `/delete-old-sessions`),
          method: HTTPMethod.POST,
        })),
        updateProfileData: valid<
          {
            params: { nickname: string; organizationKey: string };
            body: UpdateUserProfileDataPayloadDto;
          },
          HTTPMethod.PUT
        >(({ params: { nickname, organizationKey }, body }) => ({
          url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/profile-data`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        updateProfileImage: valid<
          { params: { nickname: string; organizationKey: string }; body: { contentType: string } },
          HTTPMethod.PUT
        >(({ params: { nickname, organizationKey }, body }) => ({
          url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/profile-image`),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
        updatePreferences: valid<{ params: { nickname: string; organizationKey: string }; body: UserSettings }, HTTPMethod.PUT>(
          ({ params: { nickname, organizationKey }, body }) => ({
            url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/preferences`),
            method: HTTPMethod.PUT,
            body: JSON.stringify(body),
          }),
        ),
        updateRoles: valid<{ params: { nickname: string; organizationKey: string }; body: UserRoles }, HTTPMethod.PUT>(
          ({ params: { nickname, organizationKey }, body }) => ({
            url: injectBaseUrl('user', `/user-key/${getUserKey(nickname, organizationKey)}/roles`),
            method: HTTPMethod.PUT,
            body: JSON.stringify(body),
          }),
        ),
        deleteSession: valid<{ params: { sessionId: string } }, HTTPMethod.DELETE>(({ params: { sessionId } }) => ({
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
          HTTPMethod.POST
        >(({ params: { organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('user', `/check-data`), organizationKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      problem: {
        create: valid<void, HTTPMethod.POST>(() => ({
          url: injectBaseUrl('problem', ''),
          method: HTTPMethod.POST,
        })),
        update: valid<{ params: { key: string } }, HTTPMethod.PUT>(({ params: { key } }) => ({
          url: injectBaseUrl('problem', `/${key}`),
          method: HTTPMethod.PUT,
        })),
        delete: valid<{ params: { key: string } }, HTTPMethod.DELETE>(({ params: { key } }) => ({
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
        submit: valid<{ params: { key: string }; body: { language: string; source: string } }, HTTPMethod.POST>(
          ({ params: { key }, body }) => ({
            url: injectBaseUrl('problem', `/${key}/submit`),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        crawl: valid<{ body: { judgeKey: Judge; key: string } }, HTTPMethod.POST>(({ body }) => ({
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
        getDataMembers: valid<{ params: { key: string; organizationKey?: string } }>(({ params: { key, organizationKey } }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/data/members`), organizationKey),
          method: HTTPMethod.GET,
        })),
        getDataClarifications: valid<{ params: { key: string; organizationKey?: string } }>(({ params: { key, organizationKey } }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/data/clarifications`), organizationKey),
          method: HTTPMethod.GET,
        })),
        getScoreboard: valid<{ params: { key: string; unfrozen: boolean; organizationKey?: string; official: boolean } }>(
          ({ params: { key, unfrozen, organizationKey, official } }) => ({
            url: injectOrganization(
              injectBaseUrl(
                'contest',
                `/${key}/data/scoreboard${unfrozen ? '?state=unfrozen' : ''}${official ? (unfrozen ? '&' : '?') + 'official=true' : ''}`,
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
          HTTPMethod.POST
        >(({ params: { key, problemKey, organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/${key}/problem/${problemKey}/submit`), organizationKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        recalculateScoreboard: valid<{ params: { key: string; organizationKey?: string; official: boolean } }, HTTPMethod.POST>(
          ({ params: { key, organizationKey, official } }) => ({
            url: injectOrganization(
              injectBaseUrl('contest', `/${key}/recalculate-scoreboard${official ? '?official=true' : ''}`),
              organizationKey,
            ),
            method: HTTPMethod.POST,
          }),
        ),
        recalculatePrerequisites: valid<{ params: { key: string; organizationKey?: string } }, HTTPMethod.POST>(
          ({ params: { key, organizationKey } }) => ({
            url: injectOrganization(injectBaseUrl('contest', `/${key}/recalculate-prerequisites`), organizationKey),
            method: HTTPMethod.POST,
          }),
        ),
        problem: {
          rejudge: valid<{ params: { key: string; problemKey: string; organizationKey?: string } }, HTTPMethod.POST>(
            ({ params: { key, problemKey, organizationKey } }) => ({
              url: injectOrganization(injectBaseUrl('contest', `/${key}/problem/${problemKey}/rejudge`), organizationKey),
              method: HTTPMethod.POST,
            }),
          ),
          retrieve: valid<{ params: { key: string; problemKey: string; organizationKey?: string } }, HTTPMethod.POST>(
            ({ params: { key, problemKey, organizationKey } }) => ({
              url: injectOrganization(injectBaseUrl('contest', `/${key}/problem/${problemKey}/retrieve`), organizationKey),
              method: HTTPMethod.POST,
            }),
          ),
        },
        retrieve: valid<{ params: { key: string; organizationKey?: string } }, HTTPMethod.POST>(
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
          HTTPMethod.PUT
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
          HTTPMethod.POST
        >(({ params: { organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('contest', `/global`), organizationKey),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        unlinkSubmissions: valid<{ params: { key: string; organizationKey?: string } }, HTTPMethod.POST>(
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
        rejudge: valid<{ params: { id: string } }, HTTPMethod.POST>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/rejudge`),
          method: HTTPMethod.POST,
        })),
        retrieve: valid<{ params: { id: string } }, HTTPMethod.POST>(({ params: { id } }) => ({
          url: injectBaseUrl('submission', `/${id}/retrieve`),
          method: HTTPMethod.POST,
        })),
        judge: valid<{ params: { id: string }; body: { verdict: ProblemVerdict } }, HTTPMethod.POST>(
          ({ params: { id }, body }) => ({
            url: injectBaseUrl('submission', `/${id}/judge`),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
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
        publish: valid<{ body: { contentType: string; isPublic: boolean } }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('image', '/publish'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      file: {
        publish: valid<{ body: { contentType: string; folder: FilesJukiPub } }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('file', '/publish'),
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
        createPdf: valid<{ body: { source: string; theme: Theme } }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('note', `/pdf`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      code: {
        run: valid<{ body: CodeRunDto }, HTTPMethod.POST>(({ body }) => ({
          url: injectBaseUrl('code', '/run'),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
      },
      organization: {
        get: valid<{ params: { organizationKey: string } } | void>(
          ({ params: { organizationKey } } = { params: { organizationKey: '' } }) => ({
            url: injectOrganization(injectBaseUrl('company', ''), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getPermissionList: valid<void>(() => ({
          url: injectBaseUrl('company', '/permission-list'),
          method: HTTPMethod.GET,
        })),
        getJudgeList: valid<{
          params: { organizationKey: string };
        } | void>(({ params: { organizationKey } } = { params: { organizationKey: '' } }) => ({
          url: injectOrganization(injectBaseUrl('company', '/judge-list'), organizationKey),
          method: HTTPMethod.GET,
        })),
        getTrustedOrganizationsList: valid<{
          params: { organizationKey: string };
        } | void>(({ params: { organizationKey } } = { params: { organizationKey: '' } }) => ({
          url: injectOrganization(injectBaseUrl('company', '/trusted-companies-list'), organizationKey),
          method: HTTPMethod.GET,
        })),
        getResourceSpecifications: valid<{ params: { organizationKey: string } } | void>(
          ({ params: { organizationKey } } = { params: { organizationKey: '' } }) => ({
            url: injectOrganization(injectBaseUrl('company', '/resource-specifications'), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        getEmailData: valid<{ params: { organizationKey: string } } | void>(
          ({ params: { organizationKey } } = { params: { organizationKey: '' } }) => ({
            url: injectOrganization(injectBaseUrl('company', '/email-data'), organizationKey),
            method: HTTPMethod.GET,
          }),
        ),
        updateImage: valid<
          { params?: { organizationKey: string }; body: { logoType: string; contentType: string } },
          HTTPMethod.PUT
        >(({ params: { organizationKey } = { organizationKey: '' }, body }) => ({
          url: injectOrganization(injectBaseUrl('company', `/image`), organizationKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
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
              styles?: OrganizationStyles;
            };
          },
          HTTPMethod.PATCH
        >(({ params: { organizationKey } = { organizationKey: '' }, body }) => ({
          url: injectOrganization(injectBaseUrl('company', ''), organizationKey),
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
              startsAt?: number;
              plan?: OrganizationPlan;
            };
          },
          HTTPMethod.PATCH
        >(({ params: { organizationKey } = { organizationKey: '' }, body }) => ({
          url: injectOrganization(injectBaseUrl('company', '/sensitive-data'), organizationKey),
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
        getSummaryList: valid<{ params?: { filterUrl?: string; sortUrl?: string } } | void>(
          ({ params: { filterUrl, sortUrl } = { filterUrl: '', sortUrl: '' } } = {}) => ({
            url: injectSort(injectFilter(injectBaseUrl('judge', '/summary-list'), filterUrl), sortUrl),
            method: HTTPMethod.GET,
          }),
        ),
        getSystemList: valid<{ params?: { filterUrl?: string; sortUrl?: string } } | void>(
          ({ params: { filterUrl, sortUrl } = { filterUrl: '', sortUrl: '' } } = {}) => ({
            url: injectSort(injectFilter(injectBaseUrl('judge', '/system-list'), filterUrl), sortUrl),
            method: HTTPMethod.GET,
          }),
        ),
        crawlLanguages: valid<{ params: { key: string } }, HTTPMethod.POST>(({ params: { key } }) => ({
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
          HTTPMethod.PATCH
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
        update: valid<{ params: { key: string }; body: UpsertWorksheetDto }, HTTPMethod.PUT>(({ params: { key }, body }) => ({
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
            body: JkmdSubmissionDto;
          },
          HTTPMethod.POST
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
            body: CodeEditorSubmissionDto;
          },
          HTTPMethod.POST
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
            body: QuizProblemSubmissionDto;
          },
          HTTPMethod.POST
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
            body: QuizOptionsSubmissionDto;
          },
          HTTPMethod.POST
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
        post: valid<{ params: { key: string }; body: { content: string } }, HTTPMethod.POST>(({ params: { key }, body }) => ({
          url: injectBaseUrl('comment', `/${key}`),
          method: HTTPMethod.POST,
          body: JSON.stringify(body),
        })),
        reply: valid<{ params: { key: string; id: string }; body: { content: string } }, HTTPMethod.POST>(
          ({ params: { key, id }, body }) => ({
            url: injectBaseUrl('comment', `/${key}/${id}/reply`),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        react: valid<{ params: { key: string; id: string }; body: { emoji: string } }, HTTPMethod.POST>(
          ({ params: { key, id }, body }) => ({
            url: injectBaseUrl('comment', `/${key}/${id}/react`),
            method: HTTPMethod.POST,
            body: JSON.stringify(body),
          }),
        ),
        hide: valid<{ params: { key: string; id: string } }, HTTPMethod.POST>(({ params: { key, id } }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/hide`),
          method: HTTPMethod.POST,
        })),
        unhide: valid<{ params: { key: string; id: string } }, HTTPMethod.POST>(({ params: { key, id } }) => ({
          url: injectBaseUrl('comment', `/${key}/${id}/unhide`),
          method: HTTPMethod.POST,
        })),
      },
      class: {
        viewAssignmentMyWorksheetSubmitCodeEditor: valid<
          {
            params: { classKey: string; cycleId: string; sessionId: string; assignmentId: string };
            body: CodeEditorSubmissionDto;
          },
          HTTPMethod.POST
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
        create: valid<{ body: { name: string } }, HTTPMethod.POST>(({ body }) => ({
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
          HTTPMethod.PUT
        >(({ params: { key, organizationKey }, body }) => ({
          url: injectOrganization(injectBaseUrl('document-template', `/${key}`), organizationKey),
          method: HTTPMethod.PUT,
          body: JSON.stringify(body),
        })),
      },
      statistics: {
        getOrganizationStats: valid<{
          params: {
            organizationKey?: string;
            startsAt: number;
            endsAt: number;
            groupBy: GroupByTimestampKey[];
          };
        }>(({ params: { organizationKey, startsAt, endsAt, groupBy } }) => ({
          url: injectOrganization(
            injectBaseUrl(
              'statistics',
              `/company?startsAt=${startsAt}&endsAt=${endsAt}&groupBy=${groupBy.join(',')}`,
            ),
            organizationKey,
          ),
          method: HTTPMethod.GET,
        })),
        getProblemStats: valid<{
          params: { organizationKey?: string; problemKey: string; startsAt: number; endsAt: number };
        }>(({ params: { organizationKey, problemKey, startsAt, endsAt } }) => ({
          url: injectOrganization(
            injectBaseUrl('statistics', `/problem/${problemKey}?startsAt=${startsAt}&endsAt=${endsAt}`),
            organizationKey,
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
              members: EntityMembersDto;
            };
          },
          HTTPMethod.POST
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
              members: EntityMembersDto;
            };
          },
          HTTPMethod.PUT
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
              files: CodeEditorFiles<CodeLanguage.MERMAID>;
              members: EntityMembersDto;
            };
          },
          HTTPMethod.POST
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
              files: CodeEditorFiles<CodeLanguage.MERMAID>;
              members: EntityMembersDto;
            };
          },
          HTTPMethod.PUT
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
              files: CodeEditorFiles<CodeLanguage.MERMAID>;
              members: EntityMembersDto;
            };
          },
          HTTPMethod.POST
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
              files: CodeEditorFiles<CodeLanguage.MARKDOWN>;
              members: EntityMembersDto;
            };
          },
          HTTPMethod.PUT
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
          HTTPMethod.POST
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
            HTTPMethod.POST
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
            HTTPMethod.POST
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
              HTTPMethod.POST
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
            HTTPMethod.POST
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
            HTTPMethod.POST
          >(({ params: { id } }) => ({
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
