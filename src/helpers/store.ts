import { jukiApiManager } from '../settings';

export const isIFrame = (input: Element): input is HTMLIFrameElement =>
  input !== null && input.tagName === 'IFRAME';

export const localStorageCrossDomains = {
  setItem: (key: string, value: string) => {
    if (jukiApiManager.isQueryToken()) {
      return;
    }
    localStorage.setItem(key, value);
    const iframes = document.getElementsByClassName('juki-iframe-cross-domain');
    for (const iframe of iframes) {
      if (isIFrame(iframe) && iframe.contentWindow) {
        const window = (iframe as HTMLIFrameElement).contentWindow;
        window?.postMessage({ action: 'localStorage.setItem', key, value }, new URL(iframe.src).origin);
      }
    }
  },
  removeItem: (key: string) => {
    if (jukiApiManager.isQueryToken()) {
      return;
    }
    localStorage.removeItem(key);
    const iframes = document.getElementsByClassName('juki-iframe-cross-domain');
    for (const iframe of iframes) {
      if (isIFrame(iframe) && iframe.contentWindow) {
        const window = (iframe as HTMLIFrameElement).contentWindow;
        window?.postMessage({ action: 'localStorage.removeItem', key }, new URL(iframe.src).origin);
      }
    }
  },
};
