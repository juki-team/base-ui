import { consoleWarn, ContentResponseType } from '@juki-team/commons';
import { Dispatch, SetStateAction } from 'react';
import { settings } from '../config';
import { authorizedRequest, cleanRequest } from '../services';

export const openNewTab = (url: string) => {
  const newWindow = window?.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const publishNote = async (source: string) => {
  const { url, ...options } = settings.getAPI().note.publish({ body: { source: source.trim() } });
  const request = cleanRequest<ContentResponseType<{ sourceUrl: string }>>(
    await authorizedRequest(url, options),
  );
  if (request?.success && request?.content.sourceUrl) {
    return request.content.sourceUrl;
  }
  consoleWarn({ message: 'error on publish note', request });
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
        ? settings.getAPI().note.viewFullscreen({ params: { sourceUrl: url } }).url
        : type === 'md'
          ? settings.getAPI().note.view({ params: { sourceUrl: url } }).url
          : settings.getAPI().note.pdf({ params: { sourceUrl: url } }).url
    ));
  } else {
    throw new Error('no url generated');
  }
};
