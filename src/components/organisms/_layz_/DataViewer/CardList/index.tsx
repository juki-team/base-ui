import { useVirtualizer } from '@tanstack/react-virtual';
import { type SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';
import { classNames } from '../../../../helpers';
import { DataViewerCard, getCardSections } from './DataViewerCard';
import type { CardRowVirtualizerFixedProps } from './types';

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
    onRecordHover,
    // onRecordRender,
    getRecordClassName,
    expandedCards,
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  const [ borderTop, setBorderTop ] = useState(false);
  const [ borderBottom, setBorderBottom ] = useState(false);
  const sections = useMemo(() => getCardSections(headers), [headers]);
  const cardsByRow = Math.max(Math.floor((rowWidth - gap) / (cardWidth + gap)), 1);
  
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(data.length / cardsByRow),
    getScrollElement: useCallback(() => parentRef.current, []),
    estimateSize: useCallback(() => cardHeight + 40, [ cardHeight ]),
    overscan: 2,
  });
  
  // const onRecordRenderRef = useRef(onRecordRender);
  // onRecordRenderRef.current = onRecordRender;
  // useEffect(() => {
  //   rowVirtualizer.getVirtualItems().map((virtualRow) => (
  //     onRecordRenderRef.current?.({ data, index: virtualRow.index, isCard: false })
  //   ));
  // }, [ data, rowVirtualizer ]);
  
  let finalWidth = Math.min(cardWidth, rowWidth - gap - gap);
  if (expandedCards) {
    finalWidth = (rowWidth - ((cardsByRow + 1) * gap)) / cardsByRow;
  }
  
  return (
    <div
      ref={parentRef}
      className={
        classNames('jk-list-card-rows-container', { 'scroll-on-top': !borderTop, 'scroll-on-bottom': !borderBottom })
      }
      onScroll={({ currentTarget }: SyntheticEvent<HTMLDivElement>) => {
        const scrollTop = currentTarget.scrollTop || 0;
        setBorderBottom(!!(currentTarget.scrollHeight - currentTarget.clientHeight - scrollTop));
        setBorderTop(!!scrollTop);
      }}
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
            {Array.from({ length: cardsByRow }, (_, index) => {
              const cardIndex = virtualRow.index * cardsByRow + index;
              return (
                <DataViewerCard<T>
                  key={cardIndex}
                  fake={cardIndex >= data.length}
                  cardWidth={finalWidth}
                  sections={sections}
                  data={data}
                  index={cardIndex}
                  getRecordClassName={getRecordClassName}
                  getRecordStyle={getRecordStyle}
                  onRecordClick={onRecordClick}
                  onRecordHover={onRecordHover}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
