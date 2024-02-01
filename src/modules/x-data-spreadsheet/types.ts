export type SpreadsheetOptionsType = {
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

export type CellMergeType = [ number, number ];

export type ColPropertiesType = {
  width?: number,
}

/**
 * Data for representing a cell
 */
export type CellDataType = {
  text: string | number | Date | boolean,
  style?: number | number[],
  merge?: CellMergeType,
}

/**
 * Data for representing a row
 */
export type RowDataType = {
  cells: {
    [key: number]: CellDataType,
  },
  height?: number,
}

/**
 * Data for representing a sheet
 */
export type SheetDataType = {
  name: string,
  freeze?: string,
  styles?: CellStyleType[],
  merges?: string[],
  cols?: {
    // len?: number,
    [key: number]: ColPropertiesType,
  },
  rows: {
    [key: number]: RowDataType,
    // len: number,
  };
  autofilter?: { ref: string, filters: [] },
}

export type CellStyleType = {
  align?: 'left' | 'center' | 'right',
  valign?: 'top' | 'middle' | 'bottom',
  font?: {
    bold?: boolean,
  }
  bgcolor?: string,
  textwrap?: boolean,
  color?: string,
  border?: {
    top?: string[],
    right?: string[],
    bottom?: string[],
    left?: string[],
  };
}
