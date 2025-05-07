import {
  consoleWarn,
  ERROR,
  ErrorCode,
  ErrorResponseType,
  HTTPMethod,
  JUKI_FORWARDED_HOST,
  JUKI_SESSION_ID,
} from '@juki-team/commons';
import { jukiApiSocketManager } from '../settings';
import { AuthorizedRequestType } from '../types';

export const authorizedRequest = async <M extends HTTPMethod = HTTPMethod.GET, N extends Blob | string = string>(url: string, options?: AuthorizedRequestType<M>, safe?: boolean): Promise<N> => {
  
  const { method, body, signal, responseType, headers, cache, next } = options || {};
  
  const requestHeaders = new Headers(headers ?? {});
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set(JUKI_FORWARDED_HOST, window?.location?.host);
  
  if (!(body instanceof FormData)) {
    requestHeaders.set('content-type', 'application/json');
  }
  
  const token = options?.token || jukiApiSocketManager.getToken();
  
  if (token) {
    requestHeaders.set(JUKI_SESSION_ID, token);
  }
  
  try {
    const response = await fetch(url, {
      method: method ? method : HTTPMethod.GET,
      headers: requestHeaders,
      credentials: 'include',
      ...(body ? { body } : {}),
      ...(signal ? { signal } : {}),
      cache,
      // @ts-ignore
      next,
    });
    try {
      if (responseType === 'blob') {
        return await response.blob() as N;
      }
      return await response.text() as N;
    } catch (error) {
      consoleWarn('error on get data', { url, error, responseType });
    }
    if (responseType === 'blob') {
      return new Blob() as N;
    }
    return '' as N;
  } catch (error) {
    consoleWarn('error on fetch', { url, error });
    
    if (signal?.aborted) {
      if (responseType === 'blob') {
        return new Blob() as N;
      }
      return JSON.stringify({
        success: false,
        message: ERROR[ErrorCode.ERR9997].message,
        errors: [ { code: ErrorCode.ERR9997, detail: `[${method}] ${url} \n ${body}` } ],
      } as ErrorResponseType) as N;
    }
    if (safe === false) {
      throw error;
    }
    if (responseType === 'blob') {
      return new Blob() as N;
    }
    return JSON.stringify({
      success: false,
      message: ERROR[ErrorCode.ERR9998].message,
      errors: [ {
        code: ErrorCode.ERR9998,
        detail: `FETCH CATCH ERROR : ` + JSON.stringify({ method, url, body, error }),
      } ],
    } as ErrorResponseType) as N;
  }
};
