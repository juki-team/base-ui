import { HotTable, HotTableProps } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import { registerRenderer, textRenderer } from 'handsontable/renderers';
import { memo } from 'react';
import { utils } from 'xlsx';
import { classNames } from '../../../helpers';
import { CellStyleType, DataGridProps } from './types';
import './styles.scss';

registerAllModules();

const alignment: { [key: string]: string } = {
  'hleft': 'htLeft',
  'hcenter': 'htCenter',
  'hright': 'htRight',
  'hjustify': 'htJustify',
  'vtop': 'htTop',
  'vmiddle': 'htMiddle',
  'vbottom': 'htBottom',
};

function DataGridComponent({ rows, cols, freeze, styles, autofilter, firstRowAsHeaders }: DataGridProps) {
  const data: (string)[][] = [];
  const dataStyles: CellStyleType[][] = [];
  const cell: HotTableProps['cell'] = [];
  const colHeaders: true | string[] = firstRowAsHeaders ? [] : true;
  Object.entries(rows).forEach(([ i, rowData ]) => {
    let row = +i;
    if (firstRowAsHeaders) {
      if (row === 0) {
        (colHeaders as string[]).push(
          ...(Object.entries(rowData.cells).map(([ _, cellData ]) => cellData.text as string)),
        );
        return;
      }
      row -= 1;
    }
    data[row] = [] as string[];
    Object.entries(rowData.cells).forEach(([ j, cellData ]) => {
      const col = +j;
      data[row]![col] = cellData.text as string;
      if (typeof cellData.style === 'number' && styles?.[cellData.style]) {
        if (!dataStyles[row]) {
          dataStyles[row] = [];
        }
        dataStyles[row]![col] = styles[cellData.style]!;
        cell.push({
          row,
          col,
          renderer: 'customStylesRenderer',
          className: classNames(alignment[`h${styles[cellData.style]!.align}`], alignment[`v${styles[cellData.style]!.valign}`]),
        });
      }
    });
  });
  
  const colWidths: number[] = [];
  Object.entries(cols || {}).forEach(([ i, colProperty ]) => {
    if (typeof colProperty.width === 'number') {
      colWidths[+i] = colProperty.width;
    }
  });
  
  const freezeCell = utils.decode_cell(freeze || '');
  const autofilterRange = utils.decode_range(autofilter?.ref || '');
  if (firstRowAsHeaders) {
    if (freezeCell.r !== -1) {
      freezeCell.r -= 1;
    }
  }
  
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
  
  return (
    <HotTable
      // set `HotTable`'s props here
      data={data}
      rowHeaders={true}
      colHeaders={colHeaders}
      licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      fixedColumnsStart={freezeCell.c !== -1 ? freezeCell.c : undefined}
      fixedRowsTop={freezeCell.r !== -1 ? freezeCell.r : undefined}
      filters={true}
      dropdownMenu={true}
      height="100%"
      width="100%"
      style={{ width: '100%', height: '100%' }}
      afterGetColHeader={removeColumnMenuButton}
      cell={cell}
      cells={function (row, col) {
        const cellProperties: { style: CellStyleType } = { style: {} };
        if (dataStyles?.[row]?.[col]) {
          cellProperties.style = dataStyles[row][col];
        }
        return cellProperties;
      }}
      colWidths={colWidths.length ? colWidths : undefined}
    />
  );
}

const DataGrid = memo(DataGridComponent);

export default DataGrid;
