import { cleanRequest, consoleWarn, ContentResponseType, HTTPMethod, Status } from '@juki-team/commons';
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

export const handleUploadImage = async (image: Blob, isPublic: boolean) => {
  try {
    const { url, ...options } = jukiApiSocketManager.API_V1.image.publish({
      body: {
        contentType: image.type,
        isPublic,
      },
    });
    const response = cleanRequest<ContentResponseType<{ imageUrl: string, signedUrl: string }>>(
      await authorizedRequest(url, options),
    );
    
    if (!response.success) {
      throw response;
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
