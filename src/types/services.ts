import { HTTPMethod } from '@juki-team/commons';

interface NextFetchRequestConfig {
  revalidate?: number | false,
  tags?: string[],
}

export interface AuthorizedRequestType<Method extends HTTPMethod = HTTPMethod.GET, > extends RequestInit {
  method: Method,
  body?: string | BodyInit,
  responseType?: 'text' | 'blob',
  token?: string,
  next?: NextFetchRequestConfig,
}
