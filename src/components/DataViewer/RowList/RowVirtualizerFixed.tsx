import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import React, { CSSProperties, ReactNode, RefObject, SyntheticEvent, useCallback, useRef } from 'react';
import { SCROLL_WIDTH } from '../../../constants';
import { classNames } from '../../../helpers';
// import { classNames } from '../../../helpers';
import { RowVirtualizerFixedProps, TableHeadersWithWidthType } from '../types';
import { renderField } from '../utils';

interface VirtualizedRowsFixedProps {
  rowHeight: number,
  size: number,
  renderRow: (virtualItem: VirtualItem) => ReactNode,
  classNameRows?: string
  classNameRow?: string,
  getRowKey?: (virtualItem: VirtualItem) => string,
  parentRef: RefObject<HTMLDivElement>
  style: CSSProperties,
}

export const VirtualizedRowsFixed = ({
  rowHeight,
  size,
  renderRow,
  classNameRows,
  classNameRow,
  getRowKey = (virtualItem) => virtualItem.index.toString(),
  parentRef,
  style,
}: VirtualizedRowsFixedProps) => {
  
  const rowVirtualizer = useVirtualizer({
    count: size,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
    getScrollElement: () => parentRef.current,
  });
  
  return (
    
    <div className={classNameRows} style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative', ...style }}>
      {rowVirtualizer.getVirtualItems().map(virtualRow => (
        <div
          key={getRowKey(virtualRow)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }}
          className={classNameRow}
        >
          {renderRow(virtualRow)}
        </div>
      ))}
    </div>
  );
};

export const RowVirtualizerFixed = <T, >({
  data,
  headers,
  rowHeight,
  scrollLeft,
  setScrollLeft,
  getRowKey,
}: RowVirtualizerFixedProps<T>) => {
  
  const renderRowField = (virtualRow: VirtualItem) => ({ field, index: columnIndex, width }: TableHeadersWithWidthType<T>) => (
    <div
      key={virtualRow.key + ',' + columnIndex}
      style={{ width: width + 'px' }}>
      {renderField(data, virtualRow.index, false)({ field, index: columnIndex })}
    </div>
  );
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const headersNoSticky = headers.filter(({ sticky }) => !sticky);
  const headersSticky = headers.filter(({ sticky }) => sticky);
  const headersStickyWidth = headersSticky.reduce((sum, head) => sum + head.width, 0);
  
  return (
    <div
      ref={parentRef}
      style={{ height: '100%', overflow: 'auto' }}
      className={classNames('jk-table-rows-container')}
      onScroll={({ currentTarget }: SyntheticEvent<HTMLDivElement>) => setScrollLeft(currentTarget.scrollLeft || 0)}
    >
      <VirtualizedRowsFixed
        size={data.length}
        rowHeight={rowHeight}
        classNameRows={classNames('jk-table-rows-box sticky', { 'jk-shadow': !!scrollLeft })}
        classNameRow="jk-table-row"
        parentRef={parentRef}
        getRowKey={(virtualItem) => getRowKey?.(data, virtualItem.index) ?? virtualItem.index.toString()}
        renderRow={(virtualRow) => headersSticky.map(renderRowField(virtualRow))}
        style={{ minWidth: headersStickyWidth }}
      />
      <div style={{ width: `calc(100% - ${headersStickyWidth}px - ${SCROLL_WIDTH - SCROLL_WIDTH}px)` }}>
        <VirtualizedRowsFixed
          size={data.length}
          rowHeight={rowHeight}
          classNameRows="jk-table-rows-box"
          classNameRow="jk-table-row"
          parentRef={parentRef}
          getRowKey={(virtualItem) => getRowKey?.(data, virtualItem.index) ?? virtualItem.index.toString()}
          renderRow={(virtualRow) => headersNoSticky.map(renderRowField(virtualRow))}
          style={{ minWidth: headersNoSticky.reduce((sum, head) => sum + head.width, 0) }}
        />
      </div>
    </div>
  );
};

export * from '../types';
