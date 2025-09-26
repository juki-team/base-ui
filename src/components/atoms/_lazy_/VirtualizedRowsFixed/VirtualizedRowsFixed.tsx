import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, useCallback, useRef } from 'react';
import type { VirtualizedRowsFixedProps } from './types';

export function VirtualizedRowsFixed(props: VirtualizedRowsFixedProps) {
  
  const {
    rowHeight,
    size,
    renderRow,
    classNameContainer,
    classNameRows,
    classNameRow,
    getRowKey,
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: size,
    estimateSize: useCallback(() => rowHeight, [ rowHeight ]),
    overscan: 5,
    getScrollElement: () => parentRef.current,
    getItemKey: getRowKey,
  });
  
  return (
    <div ref={parentRef} style={{ height: '100%', width: '100%', overflow: 'auto' }} className={classNameContainer}>
      <div
        className={classNameRows}
        style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
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
            {renderRow(virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(VirtualizedRowsFixed);
