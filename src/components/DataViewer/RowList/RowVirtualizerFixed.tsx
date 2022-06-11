import React from 'react';
import { VirtualItem } from 'react-virtual';
import { classNames } from '../../../helpers';
import { VirtualizedRowsFixed } from '../../Basic';
import { RowVirtualizerFixedProps, TableHeadersWithWidthType } from '../types';
import { renderField } from '../utils';

export const RowVirtualizerFixed = <T, >({ data, headers, rowHeight, scrollLeft }: RowVirtualizerFixedProps<T>) => {
  
  const renderHeader = (virtualRow: VirtualItem) => ({ field, index: columnIndex, width }: TableHeadersWithWidthType<T>) => (
    <div
      key={virtualRow.key + ',' + columnIndex}
      style={{ width: width + 'px' }}>
      {renderField(data, virtualRow.index, false)({ field, index: columnIndex })}
    </div>
  );
  
  return (
    <VirtualizedRowsFixed
      size={data.length}
      rowHeight={rowHeight}
      classNameContainer="jk-table-rows-container"
      classNameRows="jk-table-rows-box"
      classNameRow="jk-table-row"
      renderRow={(virtualRow) => (
        <>
          <div className={classNames('jk-table-row-sticky', { shadow: !!scrollLeft })} style={{ left: scrollLeft }}>
            {headers.filter(({ sticky }) => sticky).map(renderHeader(virtualRow))}
          </div>
          {headers.filter(({ sticky }) => !sticky).map(renderHeader(virtualRow))}
        </>
      )}
    />
  );
};

export * from '../types';
