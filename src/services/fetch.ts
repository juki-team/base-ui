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

export const cleanRequest = <T extends ContentResponseType<any> | ContentsResponseType<any>>(responseText: string): (ErrorResponseType | T) => {
  if (!isStringJson(responseText)) {
    // this occurs when the endpoint don't exits or server is down
    consoleWarn({ responseText });
    return {
      success: false,
      message: ERROR[ErrorCode.ERR9999].message,
      errors: [{ code: ErrorCode.ERR9999, detail: '', message: ERROR[ErrorCode.ERR9999].message }],
    };
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
      return {
        success: false,
        message: responseJson.message,
        errors: responseJson.errors,
      };
    } else if (responseJson.success === false && typeof responseJson.message === 'string' && typeof responseJson.errorCode === 'string') {
      return {
        success: false,
        message: responseJson.message,
        errors: [
          {
            code: ERROR[responseJson.errorCode as ErrorCode]?.value || ErrorCode.ERR500,
            detail: responseJson.message,
            message: responseJson.message,
          },
        ],
      };
    } else if (Object.keys(responseJson).length === 3 && typeof responseJson.total === 'number' && Array.isArray(responseJson.list)) { // V0
      return {
        success: true,
        message: '',
        meta: { page: 1, size: 1, totalElements: responseJson.total, sort: [] },
        contents: responseJson.list,
      } as ContentsResponseType<any> as T;
    } else if (Object.keys(responseJson).length === 2 && typeof responseJson.object === 'object') { // V0
      if (Array.isArray(responseJson.object.content) && typeof responseJson.object.size === 'number' && typeof responseJson.object.totalElements === 'number' && typeof responseJson.object.number === 'number') { // V0
        return {
          success: true,
          message: '',
          meta: {
            page: responseJson.object.number,
            size: responseJson.object.size,
            totalElements: responseJson.object.totalElements,
            sort: [],
          },
          contents: responseJson.object.content,
        } as ContentsResponseType<any> as T;
      }
      return {
        success: true,
        message: '',
        content: responseJson.object,
      } as T;
    } else if (Object.keys(responseJson).length === 1 && responseJson.success === true) {
      return { success: true, message: '', content: null } as T;
    }
    consoleWarn({ responseText });
    return {
      success: false,
      message: ERROR[ErrorCode.ERR9998].message,
      errors: [{ code: ErrorCode.ERR9998, detail: '', message: ERROR[ErrorCode.ERR9998].message }],
    };
  } else {
    consoleWarn({ responseText });
    if (Object.keys(responseJson).length === 3 && typeof responseJson.message === 'string' && typeof responseJson.errorCode === 'string') {
      return {
        success: false,
        message: responseJson.message,
        errors: [{ code: responseJson.errorCode, detail: '', message: responseJson.message }],
      };
    }
    return {
      success: false,
      message: ERROR[ErrorCode.ERR9998].message,
      errors: [{ code: ErrorCode.ERR9998, detail: '', message: ERROR[ErrorCode.ERR9998].message }],
    };
  }
};

export interface AuthorizedRequestType extends RequestInit {
  method?: HTTPMethod,
  body?: string | BodyInit,
  signal?: AbortSignal
}

export const authorizedRequest = async (url: string, options?: AuthorizedRequestType) => {
  const { method, body, signal } = options || {};
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Accept', 'application/json');
  if (!(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  
  return await fetch(url, {
    method: method ? method : HTTPMethod.GET,
    headers: requestHeaders,
    credentials: 'include',
    ...(body ? { body } : {}),
    ...(signal ? { signal } : {}),
  })
    .then((response: any) => {
      return response.text();
    })
    .catch((error) => {
      consoleWarn(error);
      if (signal?.aborted) {
        return JSON.stringify({
          success: false,
          message: ERROR[ErrorCode.ERR9997].message,
          errors: [{ code: ErrorCode.ERR9997, detail: `[${method}] ${url} \n ${body}` }],
        } as ErrorResponseType);
      }
      return JSON.stringify({
        success: false,
        message: ERROR[ErrorCode.ERR9998].message,
        errors: [{ code: ErrorCode.ERR9998, detail: `FETCH CATCH ERROR : ` + JSON.stringify({ method, url, body, error }) }],
      } as ErrorResponseType);
    });
};
