import { consoleInfo } from '@juki-team/commons';

let XLSXInstance: typeof import('xlsx') | null = null; // Variable para almacenar el módulo cargado

export const getXLSX = async () => {
  if (!XLSXInstance) {
    consoleInfo('loading XLSX...');
    XLSXInstance = await import('xlsx');
  }
  
  return XLSXInstance;
};
