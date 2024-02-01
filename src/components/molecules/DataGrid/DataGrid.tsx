import { HotTable, HotTableProps } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { registerRenderer, textRenderer } from 'handsontable/renderers';
import React from 'react';
import { utils } from 'xlsx';
import { CellStyleType } from '../../../modules';
import { DataGridProps } from './types';

registerAllModules();

export const DataGrid = ({ rows, cols, freeze, styles, autofilter, firstRowAsHeaders }: DataGridProps) => {
  const data: (string)[][] = [];
  const dataStyles: CellStyleType[][] = [];
  const cell: HotTableProps['cell'] = [];
  Object.entries(rows).forEach(([ i, rowData ]) => {
    const row = +i;
    data[row] = [] as string[];
    Object.entries(rowData.cells).forEach(([ j, cellData ]) => {
      const col = +j;
      data[row][col] = cellData.text as string;
      if (typeof cellData.style === 'number' && styles?.[cellData.style]) {
        if (!dataStyles[row]) {
          dataStyles[row] = [];
        }
        dataStyles[row][col] = styles?.[cellData.style];
        cell.push({ row, col, renderer: 'customStylesRenderer' })
      }
    })
  });
  
  const freezeCell = utils.decode_cell(freeze || '');
  const autofilterRange = utils.decode_range(autofilter?.ref || '');
  
  const removeColumnMenuButton: HotTableProps['afterGetColHeader'] = (col: number, TH) => {
    if (!(autofilterRange.s.c <= col && col <= autofilterRange.e.c)) {
      const button = TH.querySelector('.changeType');
      
      if (!button) {
        return;
      }
      
      button.parentElement?.removeChild(button);
    }
  };
  
  registerRenderer('customStylesRenderer', (instance, td, row, col, prop, value, cellProperties: any & {
    style: CellStyleType
  }) => {
    textRenderer(instance, td, row, col, prop, value, cellProperties);
    if (cellProperties.style?.font?.bold) {
      td.style.fontWeight = 'bold';
    }
    if (cellProperties.style?.color) {
      td.style.color = cellProperties.style?.color;
    }
    if (cellProperties.style?.bgcolor) {
      td.style.background = cellProperties.style?.bgcolor;
    }
  });
  
  let colHeaders = firstRowAsHeaders ? data[0] : true;
  
  return (
    <HotTable
      // set `HotTable`'s props here
      data={firstRowAsHeaders ? data.slice(1) : data}
      rowHeaders={true}
      colHeaders={colHeaders}
      licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      fixedColumnsStart={freezeCell.c !== -1 ? freezeCell.c : undefined}
      fixedRowsTop={freezeCell.r !== -1 ? freezeCell.r : undefined}
      filters={true}
      dropdownMenu={true}
      height="100%"
      width="100%"
      afterGetColHeader={removeColumnMenuButton}
      cell={cell}
      cells={function (row, col) {
        const cellProperties: { style: CellStyleType } = { style: {} };
        if (dataStyles?.[row]?.[col]) {
          cellProperties.style = dataStyles[row][col];
        }
        return cellProperties;
      }}
    />
  );
};
