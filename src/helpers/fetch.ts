import {
  consoleWarn,
  ContentResponseType,
  ContentsResponseType,
  ERROR,
  ErrorCode,
  ErrorResponseType,
  HTTPMethod,
  isStringJson,
} from '@juki-team/commons';
import { jukiSettings } from '../config';
import { AuthorizedRequestType } from '../types'

export const cleanRequest = <T extends ContentResponseType<any> | ContentsResponseType<any>>(responseText: string): (ErrorResponseType | T) => {
  if (!isStringJson(responseText)) {
    // this occurs when the endpoint don't exits or server is down
    const response: ErrorResponseType = {
      success: false,
      message: ERROR[ErrorCode.ERR9999].message,
      errors: [ { code: ErrorCode.ERR9999, detail: '', message: ERROR[ErrorCode.ERR9999].message } ],
    };
    jukiSettings.reportError({ message: 'success false on cleaning request', responseText, response });
    return response;
  }
  const responseJson = JSON.parse(responseText);
  if (typeof responseJson.success === 'boolean') {
    if (responseJson.success === true && typeof responseJson.message === 'string' && responseJson.content) { // V1
      return {
        success: true,
        message: responseJson.message,
        content: responseJson.content,
      } as T;
    } else if (responseJson.success === true && typeof responseJson.message === 'string' && Array.isArray(responseJson.contents) && responseJson.meta) { // V1
      return {
        success: true,
        message: responseJson.message,
        contents: responseJson.contents,
        meta: responseJson.meta,
      } as T;
    } else if (responseJson.success === false && typeof responseJson.message === 'string' && Array.isArray(responseJson.errors)) { // V1
      const response: ErrorResponseType = {
        success: false,
        message: responseJson.message,
        errors: responseJson.errors,
      };
      jukiSettings.reportError({ message: 'success false on cleaning request', responseText, response });
      return response;
    }
  }
  const response: ErrorResponseType = {
    success: false,
    message: ERROR[ErrorCode.ERR9998].message,
    errors: [ { code: ErrorCode.ERR9998, detail: '', message: ERROR[ErrorCode.ERR9998].message } ],
  };
  jukiSettings.reportError({ message: 'success false on cleaning request', responseText, response });
  return response;
};

export const authorizedRequest = async (url: string, options?: AuthorizedRequestType) => {
  
  const { method, body, signal, responseType } = options || {};
  
  const requestHeaders = new Headers();
  requestHeaders.set('Accept', 'application/json');
  
  if (!(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  
  const token = options?.token || localStorage.getItem(jukiSettings.TOKEN_NAME);
  
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }
  
  return await fetch(url, {
    method: method ? method : HTTPMethod.GET,
    headers: requestHeaders,
    credentials: 'include',
    ...(body ? { body } : {}),
    ...(signal ? { signal } : {}),
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
