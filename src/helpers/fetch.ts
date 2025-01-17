import { consoleWarn, ERROR, ErrorCode, ErrorResponseType, HTTPMethod } from '@juki-team/commons';
import { jukiApiSocketManager } from '../settings';
import { AuthorizedRequestType } from '../types';

export const authorizedRequest = async <M extends HTTPMethod = HTTPMethod.GET, >(url: string, options?: AuthorizedRequestType<M>, safe?: boolean) => {
  
  const { method, body, signal, responseType, headers, cache, next } = options || {};
  
  const requestHeaders = new Headers(headers ?? {});
  requestHeaders.set('Accept', 'application/json');
  
  if (!(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  
  const token = options?.token || jukiApiSocketManager.getToken();
  
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }
  
  return await fetch(url, {
    method: method ? method : HTTPMethod.GET,
    headers: requestHeaders,
    credentials: 'include',
    ...(body ? { body } : {}),
    ...(signal ? { signal } : {}),
    cache,
    // @ts-ignore
    next,
  })
    .then((response: any) => {
      if (responseType === 'blob') {
        return response.blob();
      }
      return response.text();
    })
    .catch((error) => {
      
      consoleWarn('error on fetch', { url, error });
      
      if (signal?.aborted) {
        return JSON.stringify({
          success: false,
          message: ERROR[ErrorCode.ERR9997].message,
          errors: [ { code: ErrorCode.ERR9997, detail: `[${method}] ${url} \n ${body}` } ],
        } as ErrorResponseType);
      }
      if (safe === false) {
        throw error;
      }
      return JSON.stringify({
        success: false,
        message: ERROR[ErrorCode.ERR9998].message,
        errors: [ {
          code: ErrorCode.ERR9998,
          detail: `FETCH CATCH ERROR : ` + JSON.stringify({ method, url, body, error }),
        } ],
      } as ErrorResponseType);
    });
};
