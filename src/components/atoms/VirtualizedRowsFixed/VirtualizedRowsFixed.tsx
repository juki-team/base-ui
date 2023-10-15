import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import React, { ReactNode, useCallback, useRef } from 'react';

export interface VirtualizedRowsFixedProps {
  rowHeight: number,
  size: number,
  renderRow: (virtualItem: VirtualItem) => ReactNode,
  classNameContainer?: string,
  classNameRows?: string
  classNameRow?: string,
  getRowKey?: (virtualItem: VirtualItem) => string,
}

export const VirtualizedRowsFixed = ({
  rowHeight,
  size,
  renderRow,
  classNameContainer,
  classNameRows,
  classNameRow,
  getRowKey = (virtualItem) => virtualItem.index.toString(),
}: VirtualizedRowsFixedProps) => {
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: size,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
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
