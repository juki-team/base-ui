import { cleanRequest, consoleWarn, ContentResponseType } from '@juki-team/commons';
import { jukiApiSocketManager } from '../settings';
import { authorizedRequest } from './fetch';

export const openNewTab = (url: string) => {
  const newWindow = window?.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const publishNote = async (source: string) => {
  const { url, ...options } = jukiApiSocketManager.API_V1.note.publish({ body: { source: source.trim() } });
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
