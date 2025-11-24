// https://github.com/McShelby/reveal-pdfexport/tree/master
import Reveal from 'reveal.js';
import { isBrowser } from '../../../helpers';

export function isPrintingPDF() {
  if (isBrowser()) {
    return (/print-pdf/gi).test(window.location.search);
  }
  return false;
}

function togglePdfExport() {
  if (isBrowser() && typeof document !== 'undefined') {
    const url_doc = new URL(document.URL);
    const query_doc = new URLSearchParams(url_doc.searchParams);
    if (isPrintingPDF()) {
      query_doc.delete('print-pdf');
    } else {
      query_doc.set('print-pdf', '');
    }
    url_doc.search = (query_doc.toString() ? '?' + query_doc.toString() : '');
    window.location.href = url_doc.toString();
  }
}

function installKeyBindings(reveal: Reveal.Api) {
  const shortcut = 'E';
  reveal.addKeyBinding({
    keyCode: shortcut.toUpperCase().charCodeAt(0),
    key: shortcut.toUpperCase(),
    description: 'PDF export mode',
  }, togglePdfExport);
}

export const PdfExport: Reveal.PluginFunction = () => ({
  id: 'pdf-export',
  init(reveal) {
    installKeyBindings(reveal);
  },
});
