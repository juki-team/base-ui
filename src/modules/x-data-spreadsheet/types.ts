export interface Options {
  mode?: 'edit' | 'read';
  showToolbar?: boolean;
  showGrid?: boolean;
  showContextmenu?: boolean;
  showBottomBar?: boolean;
  view?: {
    height: () => number;
    width: () => number;
  };
  row?: {
    len: number;
    height: number;
  };
  col?: {
    len: number;
    width: number;
    indexWidth: number;
    minWidth: number;
  };
  style?: {
    bgcolor: string;
    align: 'left' | 'center' | 'right';
    valign: 'top' | 'middle' | 'bottom';
    textwrap: boolean;
    strike: boolean;
    underline: boolean;
    color: string;
    font: {
      name: 'Helvetica';
      size: number;
      bold: boolean;
      italic: false;
    };
  };
}

export type CELL_SELECTED = 'cell-selected';
export type CELLS_SELECTED = 'cells-selected';
export type CELL_EDITED = 'cell-edited';

export type CellMerge = [ number, number ];

export interface ColProperties {
  width?: number;
}

/**
 * Data for representing a cell
 */
export interface CellData {
  text: string | number | Date | boolean;
  style?: number | number[];
  merge?: CellMerge;
}

/**
 * Data for representing a row
 */
export interface RowData {
  cells: {
    [key: number]: CellData;
  },
  height?: number,
}

/**
 * Data for representing a sheet
 */
export interface SheetData {
  name: string,
  freeze?: string,
  styles?: CellStyle[],
  merges?: string[],
  cols?: {
    len?: number,
    [key: number]: ColProperties,
  },
  rows: {
    [key: number]: RowData,
    // len: number,
  };
  autofilter?: { ref: string, filters: [] },
}

/**
 * Data for representing a spreadsheet
 */
export interface SpreadsheetData {
  [index: number]: SheetData;
}

export interface CellStyle {
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
  font?: {
    bold?: boolean;
  }
  bgcolor?: string;
  textwrap?: boolean;
  color?: string;
  border?: {
    top?: string[];
    right?: string[];
    bottom?: string[];
    left?: string[];
  };
}
