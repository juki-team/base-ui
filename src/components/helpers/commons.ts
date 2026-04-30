import { stringToArrayBuffer } from '@juki-team/commons/helpers';
import type { PropsWithChildren, ReactNode, RefObject } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { NODE_ENV } from '../../constants/settings';
import type { SheetDataType } from '../molecules/_lazy_/DataGrid/types';
import type { TriggerActionsType } from '../types';
import { getXLSX } from './xlsx';

export const getTextContent = (elem: ReactNode | ReactNode[]): string => {
  if (!elem) {
    return '';
  }
  if (typeof elem === 'string' || typeof elem === 'number') {
    return `${elem}`;
  }

  if (Array.isArray(elem)) {
    // Array of ReactNodes
    return elem.map(getTextContent).join('');
  }

  if (isValidElement<PropsWithChildren>(elem) && elem.props.children) {
    const children = elem.props.children;
    if (Array.isArray(children)) {
      return children.map(getTextContent).join('');
    }
    return getTextContent(children);
  }
  return '';
};

export function isBrowser() {
  return typeof window !== 'undefined';
}

export const downloadLink = (href: string, fileName: string) => {
  /*if (typeof window.navigator.msSaveBlob !== 'undefined') {
   // IE doesn't allow using a blob object directly as link href.
   // Workaround for "HTML7007: One or more blob URLs were
   // revoked by closing the blob for which they were created.
   // These URLs will no longer resolve as the data backing
   // the URL has been freed."
   window.navigator.msSaveBlob(blob, filename);
   return;
   }*/
  // Other browsers
  // Create a link pointing to the ObjectURL containing the blob
  if (typeof document !== 'undefined' && isBrowser()) {
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.setAttribute('href', href);
    tempLink.setAttribute('download', fileName);
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    // if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
    // }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      if (isBrowser()) {
        window.URL.revokeObjectURL(href);
      }
    }, 100);
  }
};

export function downloadBlobAsFile(data: Blob, fileName: string = 'file') {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  if (isBrowser()) {
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    const blobURL = window.URL.createObjectURL(blob);
    downloadLink(blobURL, fileName);
  }
}

export async function downloadUrlAsFile(url: string, filename: string) {
  if (typeof document !== 'undefined') {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const blob = await response.blob();
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = filename;
    a.dispatchEvent(new MouseEvent('click'));
    URL.revokeObjectURL(blobURL);
  }
}

export const downloadDataTableAsCsvFile = (data: (string | number)[][], fileName: string = 'file.csv') => {
  const blob = new Blob([data.map((e) => e.join(',')).join('\n')], { type: 'text/csv' });
  downloadBlobAsFile(blob, fileName);
};

export const sheetDataToWorkBook = async (sheets: SheetDataType[], fileName: string = 'file.xlsx') => {
  const { utils } = await getXLSX();
  const workBook = utils.book_new();
  workBook.Props = {
    Title: fileName,
    Subject: fileName,
    Author: 'Juki',
    CreatedDate: new Date(),
  };
  for (const { name, autofilter, cols, rows, styles } of sheets) {
    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    workBook.SheetNames.push(name);
    const sheet: NonNullable<(typeof workBook.Sheets)[string]> = {};
    workBook.Sheets[name] = sheet;
    const sheetRows: NonNullable<(typeof sheet)['!rows']> = [];
    sheet['!rows'] = sheetRows;
    for (const [i, rowData] of Object.entries(rows)) {
      const R = +i;
      if (rowData.height) {
        sheetRows[R] = { hpx: rowData.height };
      }
      for (const [j, cellData] of Object.entries(rowData.cells)) {
        const C = +j;
        if (range.s.r > R) range.s.r = R;
        if (range.s.c > C) range.s.c = C;
        if (range.e.r < R) range.e.r = R;
        if (range.e.c < C) range.e.c = C;
        type CellStyle = {
          fill?: { fgColor: { rgb: string } };
          font?: { color?: { rgb: string }; bold?: boolean };
          alignment?: { wrapText?: boolean; horizontal?: string; vertical?: string };
        };
        const cell: { v: string | number | boolean | Date; t: string; z?: string; s?: CellStyle } = {
          v: cellData.text,
          t: 's',
        };
        if (cell.v == null) continue;
        const cellRef = utils.encode_cell({ c: C, r: R });

        if (typeof cell.v === 'number') {
          cell.t = 'n';
        } else if (typeof cell.v === 'boolean') {
          cell.t = 'b';
        } else if (cell.v instanceof Date) {
          // cell.t = 'n';
          // cell.z = SSF._table[14];
          // cell.v = datenum(cell.v);
        } else {
          // cell.v = `'${cell.v}`;
        }
        cell.s = {};
        if (typeof cell.v === 'string' && cell.v.includes('\n')) {
          cell.s.alignment = { wrapText: true };
        }

        const cellStyle = typeof cellData.style === 'number' ? styles?.[cellData.style] : undefined;
        if (cellStyle) {
          const { bgcolor, color, font, align, valign } = cellStyle;
          if (typeof bgcolor === 'string') {
            cell.s.fill = { fgColor: { rgb: bgcolor.replace('#', '') } };
          }
          if (typeof color === 'string') {
            if (!cell.s.font) {
              cell.s.font = {};
            }
            cell.s.font.color = { rgb: color.replace('#', '') };
          }
          if (font?.bold) {
            if (!cell.s.font) {
              cell.s.font = {};
            }
            cell.s.font.bold = true;
          }
          if (typeof align === 'string') {
            if (!cell.s.alignment) {
              cell.s.alignment = {};
            }
            cell.s.alignment.horizontal = align;
          }
          if (typeof valign === 'string') {
            if (!cell.s.alignment) {
              cell.s.alignment = {};
            }
            cell.s.alignment.vertical = valign;
          }
        }
        sheet[cellRef] = cell;
      }
    }
    if (range.s.c < 10000000) {
      sheet['!ref'] = utils.encode_range(range);
    }
    if (autofilter?.ref) {
      sheet['!autofilter'] = { ref: autofilter?.ref };
    }

    const sheetCols: NonNullable<(typeof sheet)['!cols']> = sheet['!cols'] ?? [];
    sheet['!cols'] = sheetCols;
    for (const [i, property] of Object.entries(cols || {})) {
      const index = +i;
      const colDef = sheetCols[index] ?? {};
      sheetCols[index] = colDef;
      if (property.width) {
        colDef.wpx = property.width;
      }
    }
  }
  return workBook;
};

export const downloadSheetDataAsXlsxFile = async (sheets: SheetDataType[], fileName: string = 'file.xlsx') => {
  const workBook = await sheetDataToWorkBook(sheets, fileName);
  const { write } = await getXLSX();
  const workBookOut = write(workBook, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([stringToArrayBuffer(workBookOut)], { type: 'application/octet-stream' });
  downloadBlobAsFile(blob, fileName);
};

export const renderChildrenWithProps = <P extends object>(children: ReactNode | ((props: P) => ReactNode), props: P) => {
  if (typeof children === 'function') {
    // return renderChildrenWithProps(renderReactNodeOrFunctionP1(children, props), props);
    return children(props);
  }
  return Children.map(children, (child) => {
    return child && isValidElement(child) ? cloneElement(child, props) : child;
  });
};

type ClassType = string | { [key: string]: boolean };

export const classNames = (
  c1?: ClassType,
  c2?: ClassType,
  c3?: ClassType,
  c4?: ClassType,
  c5?: ClassType,
  c6?: ClassType,
  c7?: ClassType,
  c8?: ClassType,
  c9?: ClassType,
  c10?: ClassType,
  c11?: ClassType,
  c12?: ClassType,
  c13?: ClassType,
  c14?: ClassType,
  c15?: ClassType,
): string => {
  let classes = '';
  for (const prop of [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15]) {
    if (prop) {
      if (typeof prop === 'string') {
        classes += (classes ? ' ' : '') + prop;
      } else {
        for (const propKey in prop) {
          if (prop[propKey]) {
            classes += (classes ? ' ' : '') + propKey;
          }
        }
      }
    }
  }
  return classes;
};

export const isTrigger = (trigger: TriggerActionsType | TriggerActionsType[], value: TriggerActionsType) => {
  return trigger === value || (Array.isArray(trigger) && trigger.includes(value));
};

export function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

export const isOverflowed = (ref: RefObject<HTMLElement | null>) => {
  return (ref.current?.scrollWidth ?? 0) > (ref.current?.clientWidth ?? 0);
};

export function isDev() {
  return NODE_ENV !== 'production';
}

export const openNewTab = (url: string) => {
  if (isBrowser()) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  }
};

export const normalizeFolderPath = (path: string): string => {
  return path.trim().replace(/\/+/g, '/').replace(/^\/+/, '').replace(/\/+$/, '');
};
