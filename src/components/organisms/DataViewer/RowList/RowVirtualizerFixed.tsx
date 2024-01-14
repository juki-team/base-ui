import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import React, {
  Children,
  CSSProperties,
  Dispatch,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useRef,
} from 'react';
import { SCROLL_WIDTH } from '../../../../constants';
import { classNames } from '../../../../helpers';
import { RowVirtualizerFixedProps, TableHeadersWithWidthType } from '../types';
import { renderField } from '../utils';

interface VirtualizedRowsFixedProps<T> {
  rowHeight: number,
  rowClassName?: string,
  size: number,
  classNameRows?: string
  getRecordKey: (virtualItem: VirtualItem) => string,
  getRowStyle: (virtualItem: VirtualItem) => CSSProperties,
  getRowClassName: (virtualItem: VirtualItem) => string,
  parentRef: RefObject<HTMLDivElement>
  style: CSSProperties,
  recordHoveredIndex: number | null,
  setRecordHoveredIndex: Dispatch<SetStateAction<number | null>>,
  onRowClick: (virtualItem: VirtualItem) => void,
  headers: TableHeadersWithWidthType<T>[],
  data: T[],
}

export const VirtualizedRowsFixed = <T, >(props: VirtualizedRowsFixedProps<T>) => {
  
  const {
    rowHeight,
    size,
    classNameRows,
    rowClassName,
    getRecordKey = (virtualItem) => virtualItem.index.toString(),
    parentRef,
    style,
    recordHoveredIndex,
    setRecordHoveredIndex,
    onRowClick,
    getRowClassName,
    getRowStyle,
    headers,
    data,
  } = props;
  
  const rowVirtualizer = useVirtualizer({
    count: size,
    estimateSize: useCallback(() => rowHeight, [ rowHeight ]),
    overscan: 2,
    getScrollElement: () => parentRef.current,
  });
  
  return (
    
    <div
      className={classNameRows}
      style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative', ...style }}
    >
      {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={getRecordKey(virtualRow)}
            style={{
              ...getRowStyle(virtualRow),
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className={classNames(rowClassName || '', getRowClassName(virtualRow), { 'hovered': recordHoveredIndex === virtualRow.index })}
            onMouseEnter={() => setRecordHoveredIndex(virtualRow.index)}
            onMouseLeave={() => setRecordHoveredIndex(null)}
            onClick={() => onRowClick(virtualRow)}
          >
            {Children.toArray(headers.map(({ field, index: columnIndex, width }) => (
              <div
                key={getRecordKey(virtualRow) + '_' + columnIndex}
                style={{ width: width + 'px' }}
                data-testid={getRecordKey(virtualRow) + '_' + columnIndex}
              >
                {renderField(data, virtualRow.index, false)({ field, index: columnIndex })}
              </div>
            )))}
          </div>
        ),
      )}
    </div>
  );
};

export const RowVirtualizerFixed = <T, >(props: RowVirtualizerFixedProps<T>) => {
  
  const {
    data,
    headers,
    rowHeight,
    scrollLeft,
    setScrollLeft,
    setScrollTop,
    getRecordStyle,
    getRecordClassName,
    getRecordKey,
    onRecordClick,
    setRecordHoveredIndex,
    recordHoveredIndex,
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const headersNoSticky = headers.filter(({ sticky }) => !sticky);
  const headersSticky = headers.filter(({ sticky }) => sticky);
  const headersStickyWidth = headersSticky.reduce((sum, head) => sum + head.width, 0);
  
  return (
    <div
      ref={parentRef}
      style={{ height: '100%', overflow: 'auto' }}
      className={classNames('jk-table-rows-container')}
      onScroll={({ currentTarget }: SyntheticEvent<HTMLDivElement>) => {
        setScrollLeft(currentTarget.scrollLeft || 0);
        setScrollTop(currentTarget.scrollTop || 0);
      }}
    >
      <VirtualizedRowsFixed
        size={data.length}
        rowHeight={rowHeight}
        classNameRows={classNames('jk-table-rows-box sticky', { 'elevation-1': !!scrollLeft })}
        rowClassName="jk-table-row"
        parentRef={parentRef}
        getRecordKey={(virtualItem) => getRecordKey?.({
          data,
          index: virtualItem.index,
        }) ?? virtualItem.index.toString()}
        getRowClassName={(virtualItem) => getRecordClassName?.({
          data,
          index: virtualItem.index,
          isCard: false,
          isStickySection: true,
        }) || ''}
        getRowStyle={(virtualItem) => getRecordStyle?.({
          data,
          index: virtualItem.index,
          isCard: false,
          isStickySection: true,
        }) || {}}
        headers={headersSticky}
        data={data}
        style={{ minWidth: headersStickyWidth }}
        onRowClick={(virtualItem) => onRecordClick?.({ data, index: virtualItem.index, isCard: false })}
        recordHoveredIndex={recordHoveredIndex}
        setRecordHoveredIndex={setRecordHoveredIndex}
      />
      <div style={{ width: `calc(100% - ${headersStickyWidth}px - ${SCROLL_WIDTH - SCROLL_WIDTH}px)` }}>
        <VirtualizedRowsFixed
          size={data.length}
          rowHeight={rowHeight}
          classNameRows="jk-table-rows-box"
          rowClassName="jk-table-row"
          parentRef={parentRef}
          getRecordKey={(virtualItem) => getRecordKey?.({
            data,
            index: virtualItem.index,
          }) ?? virtualItem.index.toString()}
          getRowClassName={(virtualItem) => getRecordClassName?.({
            data,
            index: virtualItem.index,
            isCard: false,
            isStickySection: false,
          }) || ''}
          getRowStyle={(virtualItem) => getRecordStyle?.({
            data,
            index: virtualItem.index,
            isCard: false,
            isStickySection: false,
          }) || {}}
          headers={headersNoSticky}
          data={data}
          style={{ minWidth: headersNoSticky.reduce((sum, head) => sum + head.width, 0) }}
          onRowClick={(virtualItem) => onRecordClick?.({ data, index: virtualItem.index, isCard: false })}
          recordHoveredIndex={recordHoveredIndex}
          setRecordHoveredIndex={setRecordHoveredIndex}
        />
      </div>
    </div>
  );
};
