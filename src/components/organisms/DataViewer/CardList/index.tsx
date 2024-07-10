import { useVirtualizer } from '@tanstack/react-virtual';
import React, { Children, useCallback, useRef } from 'react';
import { classNames } from '../../../../helpers';
import { DataViewerCard } from './DataViewerCard';
import { CardRowVirtualizerFixedProps } from './types';

const gap = 16;

export const CardRowVirtualizerFixed = <T, >(props: CardRowVirtualizerFixedProps<T>) => {
  
  const {
    headers,
    data,
    cardHeight,
    cardWidth,
    rowWidth,
    getRecordStyle,
    onRecordClick,
    getRecordClassName,
    expandedCards,
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  const cardsByRow = Math.max(Math.floor((rowWidth - gap) / (cardWidth + gap)), 1);
  
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(data.length / cardsByRow),
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => cardHeight + 40, [ cardHeight ]),
    overscan: 2,
  });
  
  const scrollOffset = rowVirtualizer.scrollOffset ?? 0;
  const scrollOnTop = scrollOffset === 0;
  const scrollOnBottom = scrollOffset + (parentRef.current?.clientHeight || 0) >= rowVirtualizer.getTotalSize();
  
  let finalWidth = Math.min(cardWidth, rowWidth - gap - gap);
  if (expandedCards) {
    finalWidth = (rowWidth - ((cardsByRow + 1) * gap)) / cardsByRow;
  }
  
  return (
    <div
      ref={parentRef}
      className={
        classNames('jk-list-card-rows-container', { 'scroll-on-top': scrollOnTop, 'scroll-on-bottom': scrollOnBottom })
      }
    >
      <div className="jk-list-card-rows-box" style={{ height: `${rowVirtualizer.getTotalSize()}px`, zIndex: 0 }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className="jk-row jk-list-card-row"
          >
            {Children.toArray(new Array(cardsByRow).fill('').map((_, index) => {
              const cardIndex = virtualRow.index * cardsByRow + index;
              return (
                <DataViewerCard
                  key={virtualRow.index * cardsByRow + index}
                  fake={virtualRow.index * cardsByRow + index >= data.length}
                  cardWidth={finalWidth}
                  headers={headers}
                  data={data}
                  index={cardIndex}
                  cardClassName={getRecordClassName?.({
                    data,
                    index: cardIndex,
                    isCard: true,
                    isStickySection: false,
                  }) || ''}
                  cardStyle={getRecordStyle?.({
                    data,
                    index: cardIndex,
                    isCard: true,
                    isStickySection: false,
                  }) || {}}
                  onCardClick={() => onRecordClick?.({ data, index: cardIndex, isCard: true })}
                />
              );
            }))}
          </div>
        ))}
      </div>
    </div>
  );
};
