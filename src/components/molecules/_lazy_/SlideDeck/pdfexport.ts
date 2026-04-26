// https://github.com/McShelby/reveal-pdfexport/tree/master
import type { RevealApi, RevealPluginFactory } from 'reveal.js';
import { isBrowser } from '../../../helpers';

export function isPrintingPDF() {
  if (isBrowser()) {
    return /print-pdf/gi.test(window.location.search);
  }
  return false;
}

function togglePdfExport() {
  if (isBrowser() && typeof document !== 'undefined') {
    const urlDoc = new URL(document.URL);
    const queryDoc = new URLSearchParams(urlDoc.searchParams);
    if (isPrintingPDF()) {
      queryDoc.delete('print-pdf');
    } else {
      queryDoc.set('print-pdf', '');
    }
    urlDoc.search = queryDoc.toString() ? `?${queryDoc.toString()}` : '';
    window.location.href = urlDoc.toString();
  }
}

function installKeyBindings(reveal: RevealApi) {
  const shortcut = 'E';
  reveal.addKeyBinding(
    {
      keyCode: shortcut.toUpperCase().charCodeAt(0),
      key: shortcut.toUpperCase(),
      description: 'PDF export mode',
    },
    togglePdfExport,
  );
}

export const PdfExport: RevealPluginFactory = () => ({
  id: 'pdf-export',
  init(reveal) {
    installKeyBindings(reveal);
  },
});
