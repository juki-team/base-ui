import {
  cleanRequest,
  consoleError,
  consoleInfo,
  consoleWarn,
  ContentResponseType,
  type ContentsResponseType,
  ERROR,
  ErrorCode,
  ErrorResponseType,
  HEADER_JUKI_FORWARDED_HOST,
  HEADER_JUKI_METADATA,
  HEADER_JUKI_VISITOR_SESSION_ID,
  HTTPMethod,
  isObjectJson,
  JkError,
  Status,
  Theme,
} from '@juki-team/commons';
import type { ErrorInfo } from 'react';
import { JUKI_TOKEN_NAME } from '../../constants/settings';
import { QueryParamKey } from '../../enums';
import { jukiApiManager } from '../../settings';
import { AuthorizedRequestType } from '../types';
import { downloadBlobAsFile, downloadUrlAsFile, isBrowser } from './commons';

// const UUID_WITHOUT_DASHES = /^[0-9A-F]{32}$/i;
// const UUID_WITH_DASHES = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
const validate = (representation: string) => {
  return representation.length === 24 && checkForHexRegExp.test(representation);
// return UUID_WITHOUT_DASHES.test(representation) || UUID_WITH_DASHES.test(representation)
};

export function getQuerySessionId(): string {
  let queryToken = '';
  if (isBrowser()) {
    queryToken = (new URLSearchParams(window.location.search)).get(QueryParamKey.TOKEN) ?? '';
  }
  return validate(queryToken) ? queryToken : '';
}

export function getVisitorSessionId(): string {
  if (typeof localStorage !== 'undefined') {
    return getQuerySessionId() || localStorage.getItem(JUKI_TOKEN_NAME) || '';
  }
  return getQuerySessionId() || '';
}

export const authorizedRequest = async <M extends Exclude<HTTPMethod, HTTPMethod.GET> = HTTPMethod.POST, N extends Blob | string = string>(url: string, options?: AuthorizedRequestType<M>, safe?: boolean): Promise<N> => {
  return _authorizedRequest(url, options, safe);
};

export const getAuthorizedRequest = async <N extends Blob | string = string>(url: string, options?: Omit<AuthorizedRequestType, 'method'>, safe?: boolean): Promise<N> => {
  return _authorizedRequest(url, options, safe);
};

const _authorizedRequest = async <M extends HTTPMethod = HTTPMethod.GET, N extends Blob | string = string>(url: string, options?: Partial<AuthorizedRequestType<M>>, safe?: boolean): Promise<N> => {
  
  const { method = HTTPMethod.GET, body, signal, responseType, headers, cache, next } = options || {};
  
  const requestHeaders = new Headers(headers ?? {});
  requestHeaders.set('accept', 'application/json');
  
  if (!(body instanceof FormData)) {
    requestHeaders.set('content-type', 'application/json');
  }
  if (isBrowser()) {
    requestHeaders.set(HEADER_JUKI_FORWARDED_HOST, window.location?.host);
  }
  
  const visitorSessionId = getVisitorSessionId();
  if (visitorSessionId) {
    requestHeaders.set(HEADER_JUKI_VISITOR_SESSION_ID, visitorSessionId);
  }
  
  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      credentials: 'include',
      ...(body ? { body } : {}),
      ...(signal ? { signal } : {}),
      cache,
      next,
    } as RequestInit);
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

export const getHeaders = (jukiVisitorSessionId: string): HeadersInit => ({
  origin: isBrowser() ? window.location.origin : 'https://juki.app',
  referer: isBrowser() ? window.location.origin + '/' : 'https://juki.app/',
  [HEADER_JUKI_VISITOR_SESSION_ID]: jukiVisitorSessionId,
  [HEADER_JUKI_FORWARDED_HOST]: 'juki.app',
});

export const getMetaHeaders = (): HeadersInit => ({
  origin: isBrowser() ? window.location.origin : 'https://juki.app',
  referer: isBrowser() ? window.location.origin + '/' : 'https://juki.app/',
  [HEADER_JUKI_METADATA]: 'true',
  [HEADER_JUKI_FORWARDED_HOST]: 'juki.app',
});

// Customs:

export const publishNote = async (source: string) => {
  const { url, ...options } = jukiApiManager.API_V2.note.publish({ body: { source: source.trim() } });
  const request = cleanRequest<ContentResponseType<{ sourceUrl: string }>>(
    await authorizedRequest(url, options),
  );
  if (request?.success && request?.content.sourceUrl) {
    return request.content.sourceUrl;
  }
  consoleWarn('error on publish note', { request });
  return '';
};

// export const handleShareMdPdf = (type: 'md' | 'pdf', source: string, sourceUrl: string, setSourceUrl: Dispatch<SetStateAction<string>>, theme: Theme) => async () => {
//   let url = sourceUrl;
//   if (!sourceUrl) {
//     url = await publishNote(source);
//     setSourceUrl(url);
//   }
//   if (url) {
//     openNewTab((
//       type === 'md'
//         ? jukiAppRotes.UTILS.utils(jukiSettings.UTILS_UI_URL).note.view({ sourceUrl: url, theme }).url
//         : jukiApiManager.V1.note.getPdf({ params: { sourceUrl: url } }).url
//     ));
//   } else {
//     throw new Error('no url generated');
//   }
// };

export const handleUploadImage = async (image: Blob, isPublic: boolean): Promise<{
  status: Status.ERROR,
  message: string,
  content: null
} | {
  status: Status.SUCCESS,
  message: string,
  content: { imageUrl: string, signedUrl: string }
}> => {
  try {
    const { url, ...options } = jukiApiManager.API_V2.image.publish({
      body: {
        contentType: image.type,
        isPublic,
      },
    });
    const response = cleanRequest<ContentResponseType<{ imageUrl: string, signedUrl: string }>>(
      await authorizedRequest(url, options),
    );
    
    if (!response.success) {
      console.error('response not success on handleUploadImage', { response });
      return { status: Status.ERROR, message: 'Ups, please try again', content: null };
    }
    
    await fetch(response.content.signedUrl, {
      method: HTTPMethod.PUT,
      headers: {
        'Content-Type': image.type,
      },
      body: image,
    });
    return { status: Status.SUCCESS, message: 'image uploaded successfully', content: response.content };
  } catch (error) {
    console.error(error);
    return { status: Status.ERROR, message: 'Ups, please try again', content: null };
  }
};

export const downloadWebsiteAsPdf = async (websiteUrl: string, name: string, exportOptions?: {
  headerTemplate?: string,
  footerTemplate?: string,
  margin?: { top: string, bottom: string, left: string, right: string }
  format?: string,
}) => {
  const { url, ...options } = jukiApiManager.API_V2.export.websiteToPdf({
    params: {
      url: websiteUrl,
      footerTemplate: exportOptions?.footerTemplate?.split('\n').join(''),
      headerTemplate: exportOptions?.headerTemplate?.split('\n').join(''),
      format: exportOptions?.format,
      margin: exportOptions?.margin,
    },
  });
  const response = cleanRequest<ContentResponseType<{ urlExportedPDF: string }>>(
    await authorizedRequest(url, options),
  );
  
  if (response.success) {
    await downloadUrlAsFile('https://' + response.content.urlExportedPDF, name);
  } else {
    throw new Error('error on download pdf');
  }
};

export const downloadJukiMarkdownAsPdf = async (source: string, theme: Theme, fileName: string) => {
  const { url, ...options } = jukiApiManager.API_V2.note.createPdf({ body: { source, theme } });
  const result = await authorizedRequest(
    url, { responseType: 'blob', ...options },
  );
  if (typeof result === 'string') {
    if (isObjectJson(result)) {
      const response = JSON.parse(result) as ErrorResponseType;
      if (response.errors.length) {
        throw new JkError(response.errors[0]!.code, { message: response.errors[0]!.detail });
      }
    }
    throw new JkError(ErrorCode.ERR9997, { message: 'error generating the pdf' });
  }
  downloadBlobAsFile(result, fileName);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const safeReportError = async (error: Error, errorInfo: ErrorInfo | null, data?: Record<string, any>) => {
  const visitorSessionId = getVisitorSessionId();
  const location = isBrowser() ? window.location : new Location();
  consoleError('Error to report', { error, errorInfo, location, visitorSessionId, data });
  try {
    const { url, ...options } = jukiApiManager.API_V2.log.error({
      body: {
        location,
        visitorSessionId,
        errorName: error?.name || '',
        errorMessage: error?.message || '',
        errorStack: error?.stack || '',
        errorInfo,
        data: { error, ...(data || {}) },
      },
    });
    const response = cleanRequest<ContentsResponseType<true>>(await authorizedRequest(url, options));
    if (response.success) {
      consoleInfo('Error reported');
    } else {
      consoleError('Error reported failed', { error, errorInfo, location, visitorSessionId, response });
    }
  } catch (errorOnLog) {
    consoleError('error on log error', { error, errorInfo, location, visitorSessionId, errorOnLog });
  }
};
