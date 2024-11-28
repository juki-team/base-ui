import { HTTPMethod } from '@juki-team/commons';

export interface AuthorizedRequestType<Method extends HTTPMethod = HTTPMethod.GET, > extends RequestInit {
  method: Method,
  body?: string | BodyInit,
  signal?: AbortSignal,
  responseType?: 'text' | 'blob',
  token?: string,
  headers?: Headers,
}
