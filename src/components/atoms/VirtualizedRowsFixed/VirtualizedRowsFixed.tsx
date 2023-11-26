import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useRef } from 'react';
import { VirtualizedRowsFixedProps } from './types';

export const VirtualizedRowsFixed = (props: VirtualizedRowsFixedProps) => {
  
  const {
    rowHeight,
    size,
    renderRow,
    classNameContainer,
    classNameRows,
    classNameRow,
    getRowKey = (virtualItem) => virtualItem.index.toString(),
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: size,
    estimateSize: useCallback(() => rowHeight, [ rowHeight ]),
    overscan: 5,
    getScrollElement: () => parentRef.current,
  });
  
  return (
    <div ref={parentRef} style={{ height: '100%', width: '100%', overflow: 'auto' }} className={classNameContainer}>
      <div
        className={classNameRows}
        style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}
      >
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
    </div>
  );
};
