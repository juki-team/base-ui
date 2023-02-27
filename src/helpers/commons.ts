import { stringToArrayBuffer } from '@juki-team/commons';
import { Children, cloneElement, ReactNode } from 'react';
import { utils, write } from 'xlsx';
import { SearchParamsObjectType } from '../components';
import { settings } from '../config';
import { publishNote } from '../helpers/utils';
import { authorizedRequest } from '../services';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType, TriggerActionsType } from '../types';

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

export async function downloadBlobAsFile(data: Blob, fileName: string = 'file') {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
  const blobURL = window?.URL.createObjectURL(blob);
  downloadLink(blobURL, fileName);
}

export const downloadDataTableAsCsvFile = (data: (string | number)[][], fileName: string = 'file.csv') => {
  const blob = new Blob([data.map(e => e.join(',')).join('\n')], { type: 'text/csv' });
  const blobURL = window?.URL.createObjectURL(blob);
  downloadLink(blobURL, fileName);
};

export const downloadXlsxAsFile = async (data: (string | number)[][], fileName: string, sheetName: string) => {
  const workBook = utils.book_new();
  workBook.Props = {
    Title: fileName,
    Subject: fileName,
    Author: 'Juki Judge',
    CreatedDate: new Date(),
  };
  workBook.SheetNames.push(sheetName);
  workBook.Sheets[sheetName] = utils.aoa_to_sheet(data);
  const workBookOut = write(workBook, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([stringToArrayBuffer(workBookOut)], { type: 'application/octet-stream' });
  await downloadBlobAsFile(blob, fileName);
};

export const downloadJukiMarkdownAdPdf = async (source: string, fileName: string) => {
  const url = await publishNote(source);
  if (url) {
    const result = await authorizedRequest(
      settings.getAPI().note.pdf({ params: { sourceUrl: url } }).url, { responseType: 'blob' },
    );
    await downloadBlobAsFile(result, fileName);
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

export const getSearchParamsObject = (searchParams: URLSearchParams) => {
  const searchParamsObject: SearchParamsObjectType = {};
  searchParams.forEach((value, key) => {
    if (!searchParamsObject[key]) {
      searchParamsObject[key] = [];
    }
    searchParamsObject[key].push(value);
  });
  return searchParamsObject;
};

type classType = string | { [key: string]: boolean };

export const classNames = (c1: classType, c2?: classType, c3?: classType, c4?: classType, c5?: classType, c6?: classType, c7?: classType, c8?: classType, c9?: classType, c10?: classType, c11?: classType, c12?: classType, c13?: classType, c14?: classType, c15?: classType): string => {
  let classes = '';
  [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15].forEach(prop => {
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

export const openNewTab = (url: string) => {
  const newWindow = window?.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

export { consoleWarn } from '@juki-team/commons';
