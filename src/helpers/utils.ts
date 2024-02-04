import { consoleWarn, ContentResponseType } from '@juki-team/commons';
import { Dispatch, SetStateAction } from 'react';
import { jukiSettings } from '../config';
import { authorizedRequest, cleanRequest } from './fetch';

export const openNewTab = (url: string) => {
  const newWindow = window?.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const publishNote = async (source: string) => {
  const { url, ...options } = jukiSettings.API.note.publish({ body: { source: source.trim() } });
  const request = cleanRequest<ContentResponseType<{ sourceUrl: string }>>(
    await authorizedRequest(url, options),
  );
  if (request?.success && request?.content.sourceUrl) {
    return request.content.sourceUrl;
  }
  consoleWarn('error on publish note', { request });
  return '';
};

export const handleShareMdPdf = (type: string, source: string, sourceUrl: string, setSourceUrl: Dispatch<SetStateAction<string>>) => async () => {
  let url = sourceUrl;
  if (!sourceUrl) {
    url = await publishNote(source);
    setSourceUrl(url);
  }
  if (url) {
    openNewTab((
      type === 'md-fullscreen'
        ? jukiSettings.API.note.viewFullscreen({ params: { sourceUrl: url } }).url
        : type === 'md'
          ? jukiSettings.API.note.view({ params: { sourceUrl: url } }).url
          : jukiSettings.API.note.pdf({ params: { sourceUrl: url } }).url
    ));
  } else {
    throw new Error('no url generated');
  }
};
