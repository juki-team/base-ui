import { consoleWarn, ContentResponseType } from '@juki-team/commons';
import { Dispatch, SetStateAction } from 'react';
import { settings } from '../config';
import { authorizedRequest, cleanRequest } from '../services';
import { openNewTab } from './commons';

export const publishNote = async (source: string) => {
  const request = cleanRequest<ContentResponseType<{ sourceUrl: string }>>(await authorizedRequest(...settings.JUKI_API.POST_PUBLIC_NOTE(JSON.stringify({ source: source.trim() }))));
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
    openNewTab(...(
      type === 'md-fullscreen'
        ? settings.JUKI_API.GET_PUBLIC_NOTE_MARKDOWN_FULLSCREEN(url)
        : type === 'md'
          ? settings.JUKI_API.GET_PUBLIC_NOTE_MARKDOWN(url)
          : settings.JUKI_API.GET_PUBLIC_NOTE_PDF(url)
    ));
  } else {
    throw new Error('no url generated');
  }
};
