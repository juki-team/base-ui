import React, { ReactNode, useCallback, useRef } from 'react';
import { useVirtual, VirtualItem } from 'react-virtual';

export const VirtualizedRowsFixed = ({
  rowHeight,
  size,
  renderRow,
  classNameContainer,
  classNameRows,
  classNameRow,
}: {
  rowHeight: number, size: number, renderRow: (virtualItem: VirtualItem) => ReactNode, classNameContainer?: string,
  classNameRows?: string
  classNameRow?: string,
}) => {
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const { virtualItems, totalSize } = useVirtual({
    size,
    parentRef,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
  });
  
  return (
    <div ref={parentRef} style={{ height: '100%', width: '100%', overflow: 'auto' }} className={classNameContainer}>
      <div className={classNameRows} style={{ height: `${totalSize}px`, width: '100%', position: 'relative' }}>
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
            className={classNameRow}
          >
            {renderRow(virtualRow)}
          </div>
        ))}
      </div>
    </div>
  );
};