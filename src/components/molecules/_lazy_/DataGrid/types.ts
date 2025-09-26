export type ColPropertiesType = {
  width?: number,
}

export type CellMergeType = [ number, number ];

export type CellDataType = {
  text: string | number | Date | boolean,
  style?: number | number[],
  merge?: CellMergeType,
}

export type RowDataType = {
  cells: {
    [key: number]: CellDataType,
  },
  height?: number,
}

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
  align?: 'left' | 'center' | 'right' | 'justify' /*not supported by x-data-spreadsheet*/,
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

export type DataGridProps = Pick<SheetDataType, 'rows' | 'cols' | 'freeze' | 'styles' | 'autofilter'>
  & { firstRowAsHeaders?: boolean };
