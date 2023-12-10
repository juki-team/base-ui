import { HTTPMethod } from '@juki-team/commons';

export interface AuthorizedRequestType extends RequestInit {
  method?: HTTPMethod,
  body?: string | BodyInit,
  signal?: AbortSignal,
  responseType?: 'text' | 'blob',
  token?: string,
}
