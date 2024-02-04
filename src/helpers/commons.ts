import { stringToArrayBuffer } from '@juki-team/commons';
import { Children, cloneElement, MutableRefObject, ReactNode } from 'react';
import { utils } from 'xlsx';
import { write } from 'xlsx-js-style';
import { jukiSettings } from '../config';
import { SheetDataType } from '../modules';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType, TriggerActionsType } from '../types';
import { authorizedRequest } from './fetch';
import { publishNote } from './utils';

export const getTextContent = (elem: ReactNode): string => {
  if (!elem) {
    return '';
  }
  if (typeof elem === 'string' || typeof elem === 'number') {
    return elem + '';
  }
  
  if (elem instanceof Array) { // Array of ReactNodes
    return elem.map(getTextContent).join('');
  }
  
  if (typeof elem === 'object' && 'props' in elem) {
    const children = elem.props.children;
    if (children instanceof Array) {
      return children.map(getTextContent).join('');
    }
    return getTextContent(children);
  }
  return '';
};

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
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.setAttribute('href', href);
  tempLink.setAttribute('download', fileName);
  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window?.URL.revokeObjectURL(href);
  }, 100);
};

export function downloadBlobAsFile(data: Blob, fileName: string = 'file') {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const blob = new Blob([ data ], { type: data.type || 'application/octet-stream' });
  const blobURL = window?.URL.createObjectURL(blob);
  downloadLink(blobURL, fileName);
}

export const downloadDataTableAsCsvFile = (data: (string | number)[][], fileName: string = 'file.csv') => {
  const blob = new Blob([ data.map(e => e.join(',')).join('\n') ], { type: 'text/csv' });
  downloadBlobAsFile(blob, fileName);
};

export const sheetDataToWorkBook = (sheets: SheetDataType[], fileName: string = 'file.xlsx') => {
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
    workBook.Sheets[name] = {};
    workBook.Sheets[name]['!rows'] = [];
    Object.entries(rows).forEach(([ i, rowData ]) => {
      const R = +i;
      if (rowData.height) {
        workBook.Sheets[name]['!rows']![R] = { hpx: rowData.height };
      }
      Object.entries(rowData.cells).forEach(([ i, cellData ]) => {
        const C = +i;
        if (range.s.r > R) range.s.r = R;
        if (range.s.c > C) range.s.c = C;
        if (range.e.r < R) range.e.r = R;
        if (range.e.c < C) range.e.c = C;
        const cell: { v: string | number | boolean | Date, t: string, z?: string, s?: any } = {
          v: cellData.text,
          t: 's',
        };
        if (cell.v == null) return;
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
        
        if (typeof cellData.style === 'number' && styles?.[cellData.style]) {
          const bgcolor = styles[cellData.style].bgcolor;
          if (typeof bgcolor === 'string') {
            cell.s.fill = { fgColor: { rgb: bgcolor.replace('#', '') } };
          }
          const color = styles[cellData.style].color;
          if (typeof color === 'string') {
            if (!cell.s.font) {
              cell.s.font = {};
            }
            cell.s.font.color = { rgb: color.replace('#', '') };
          }
          if (styles[cellData.style].font?.bold) {
            if (!cell.s.font) {
              cell.s.font = {};
            }
            cell.s.font.bold = true;
          }
          const alignment = styles[cellData.style].align;
          if (typeof alignment === 'string') {
            if (!cell.s.alignment) {
              cell.s.alignment = {};
            }
            cell.s.alignment.horizontal = alignment;
          }
          const alignmentVertical = styles[cellData.style].valign;
          if (typeof alignmentVertical === 'string') {
            if (!cell.s.alignment) {
              cell.s.alignment = {};
            }
            cell.s.alignment.vertical = alignmentVertical;
          }
        }
        workBook.Sheets[name][cellRef] = cell;
      });
    });
    if (range.s.c < 10000000) {
      workBook.Sheets[name]['!ref'] = utils.encode_range(range);
    }
    if (autofilter?.ref) {
      workBook.Sheets[name]['!autofilter'] = { ref: autofilter?.ref }
    }
    
    if (!workBook.Sheets[name]['!cols']) {
      workBook.Sheets[name]['!cols'] = [];
    }
    // const c = cols || { len: 0 };
    // const { .columns } = c;
    Object.entries(cols || {}).forEach(([ i, property ]) => {
      const index = +i;
      if (!workBook.Sheets[name]['!cols']![index]) {
        workBook.Sheets[name]['!cols']![index] = {};
      }
      if (property.width) {
        workBook.Sheets[name]['!cols']![index].wpx = property.width;
      }
    });
  }
  return workBook;
}

export const downloadSheetDataAsXlsxFile = (sheets: SheetDataType[], fileName: string = 'file.xlsx') => {
  const workBook = sheetDataToWorkBook(sheets, fileName);
  const workBookOut = write(workBook, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([ stringToArrayBuffer(workBookOut) ], { type: 'application/octet-stream' });
  downloadBlobAsFile(blob, fileName);
};

export const downloadJukiMarkdownAdPdf = async (source: string, fileName: string) => {
  const url = await publishNote(source);
  if (url) {
    const result = await authorizedRequest(
      jukiSettings.API.note.pdf({ params: { sourceUrl: url } }).url, { responseType: 'blob' },
    );
    downloadBlobAsFile(result, fileName);
  } else {
    throw new Error('no url generated');
  }
};

export const renderChildrenWithProps = (children: any, props: any) => {
  if (typeof children === 'function') {
    // return renderChildrenWithProps(renderReactNodeOrFunctionP1(children, props), props);
    return (children(props));
  }
  return Children.map(children, (child) => {
    return !!child ? cloneElement(child, props) : child;
  });
};

export const renderReactNodeOrFunction = (content: ReactNodeOrFunctionType) => {
  return typeof content === 'function' ? content() : content;
};

export const renderReactNodeOrFunctionP1 = <T, >(content: ReactNodeOrFunctionP1Type<T>, prop1: T) => {
  return typeof content === 'function' ? content(prop1) : content;
};

type classType = string | { [key: string]: boolean };

export const classNames = (c1?: classType, c2?: classType, c3?: classType, c4?: classType, c5?: classType, c6?: classType, c7?: classType, c8?: classType, c9?: classType, c10?: classType, c11?: classType, c12?: classType, c13?: classType, c14?: classType, c15?: classType): string => {
  let classes = '';
  [ c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15 ].forEach(prop => {
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
  });
  return classes;
};

export const isTrigger = (trigger: TriggerActionsType | TriggerActionsType[], value: TriggerActionsType) => {
  return (trigger === value || (Array.isArray(trigger) && trigger.includes(value)));
};

export function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

export const isOverflowed = (ref: MutableRefObject<any>) => {
  return ref.current?.scrollWidth > ref.current?.clientWidth;
};
