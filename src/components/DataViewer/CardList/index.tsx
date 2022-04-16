import React, { useCallback, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { DataViewerCard } from './DataViewerCard';
import { CardRowVirtualizerFixedProps } from './types';

export const CardRowVirtualizerFixed = <T, >({
  headers,
  data,
  cardHeight,
  cardWidth,
  rowWidth,
}: CardRowVirtualizerFixedProps<T>) => {
  
  const parentRef = useRef<HTMLDivElement>(null);
  const cardsByRow = Math.floor(rowWidth / (cardWidth + 20));
  
  const rowVirtualizer = useVirtual({
    size: data.length / cardsByRow,
    parentRef,
    estimateSize: useCallback(() => cardHeight + 40, [cardHeight]),
    overscan: 5,
  });
  
  return (
    <div ref={parentRef} className="jk-list-card-rows-container">
      <div className="jk-list-card-rows-box" style={{ height: `${rowVirtualizer.totalSize}px` }}>
        {rowVirtualizer.virtualItems.map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
              padding: '20px 0px',
            }}
            className="jk-row jk-list-card-row"
          >
            {new Array(cardsByRow).fill('').map((_, index) => (
              <DataViewerCard
                key={virtualRow.index * cardsByRow + index}
                fake={virtualRow.index * cardsByRow + index >= data.length}
                cardWidth={cardWidth}
                headers={headers}
                data={data}
                index={virtualRow.index * cardsByRow + index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
