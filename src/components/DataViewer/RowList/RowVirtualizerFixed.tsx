import React, { useCallback, useRef } from 'react';
import { useVirtual, VirtualItem } from 'react-virtual';
import { classNames } from '../../../helpers';
import { RowVirtualizerFixedProps, TableHeadersWithWidthType } from '../types';
import { renderField } from '../utils';

export const RowVirtualizerFixed = <T, >({ data, headers, rowHeight, scrollLeft }: RowVirtualizerFixedProps<T>) => {
  
  const parentRef = useRef<HTMLDivElement>(null);
  const { virtualItems, totalSize } = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
  });
  
  const renderHeader = (virtualRow: VirtualItem) => ({ field, index: columnIndex, width }: TableHeadersWithWidthType<T>) => (
    <div
      key={virtualRow.key + ',' + columnIndex}
      style={{ width: width + 'px' }}>
      {renderField(data, virtualRow.index, false)({ field, index: columnIndex })}
    </div>
  );
  
  return (
    <div ref={parentRef} className="jk-table-rows-container">
      <div className="jk-table-rows-box" style={{ height: `${totalSize}px` }}>
        {virtualItems.map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className="jk-table-row"
          >
            <div className={classNames('jk-table-row-sticky', { shadow: !!scrollLeft })} style={{ left: scrollLeft }}>
              {headers.filter(({ sticky }) => sticky).map(renderHeader(virtualRow))}
            </div>
            {headers.filter(({ sticky }) => !sticky).map(renderHeader(virtualRow))}
          </div>
        ))}
      </div>
    </div>
  );
};

export * from '../types';
