import { useVirtualizer } from '@tanstack/react-virtual';
import React, {
  Children,
  CSSProperties,
  Dispatch,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SCROLL_WIDTH } from '../../../../constants';
import { classNames } from '../../../../helpers';
import { RowVirtualizerFixedProps, TableHeadersWithWidthType } from '../types';

interface VirtualizedRowsFixedProps<T> {
  rowHeight: number,
  rowClassName?: string,
  size: number,
  classNameRows?: string
  getRecordKey?: (index: number) => string,
  getRowStyle: (index: number) => CSSProperties,
  getRowClassName: (index: number) => string,
  parentRef: RefObject<HTMLDivElement>
  style: CSSProperties,
  recordHoveredIndex: number | null,
  setRecordHoveredIndex: Dispatch<SetStateAction<number | null>>,
  onRowClick: (index: number) => void,
  headers: TableHeadersWithWidthType<T>[],
  data: T[],
}

export const RowListVirtualizedRowsFixed = <T, >(props: VirtualizedRowsFixedProps<T>) => {
  
  const {
    rowHeight,
    size,
    classNameRows,
    rowClassName,
    getRecordKey,
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
    getItemKey: getRecordKey,
  });
  
  const [ _, setRender ] = useState(Date.now());
  
  useEffect(() => setRender(Date.now()), [ size ]);
  
  return (
    
    <div
      className={classNameRows}
      style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative', ...style }}
    >
      {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              ...getRowStyle(virtualRow.index),
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className={classNames(rowClassName || '', getRowClassName(virtualRow.index), { 'hovered': recordHoveredIndex === virtualRow.index })}
            onMouseEnter={() => setRecordHoveredIndex(virtualRow.index)}
            onMouseLeave={() => setRecordHoveredIndex(null)}
            onClick={() => onRowClick(virtualRow.index)}
          >
            {/*<div>Row {virtualRow.index}</div>*/}
            {Children.toArray(headers.map(({ Field, index: columnIndex, width }) => (
              <div
                key={virtualRow.key + '_' + columnIndex}
                style={{ width: width + 'px' }}
                data-testid={virtualRow.key + '_' + columnIndex}
              >
                <Field
                  record={data[virtualRow.index]}
                  columnIndex={columnIndex}
                  recordIndex={virtualRow.index}
                  isCard={false}
                />
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
    scroll,
    setScroll,
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
        const scrollLeft = currentTarget.scrollLeft || 0;
        const scrollTop = currentTarget.scrollTop || 0;
        setScroll({
          bottom: currentTarget.scrollHeight - currentTarget.clientHeight - scrollTop,
          top: scrollTop,
          left: scrollLeft,
          right: currentTarget.scrollWidth - currentTarget.clientWidth - scrollLeft,
        });
      }}
    >
      <RowListVirtualizedRowsFixed
        size={data.length}
        rowHeight={rowHeight}
        classNameRows={classNames('jk-table-rows-box sticky', { 'elevation-1': !!scroll.left })}
        rowClassName="jk-table-row"
        parentRef={parentRef}
        getRecordKey={getRecordKey ? (index) => getRecordKey({
          data,
          index,
        }) : undefined}
        getRowClassName={(index) => getRecordClassName?.({
          data,
          index,
          isCard: false,
          isStickySection: true,
        }) || ''}
        getRowStyle={(index) => getRecordStyle?.({
          data,
          index,
          isCard: false,
          isStickySection: true,
        }) || {}}
        headers={headersSticky}
        data={data}
        style={{ minWidth: headersStickyWidth }}
        onRowClick={index => onRecordClick?.({ data, index, isCard: false })}
        recordHoveredIndex={recordHoveredIndex}
        setRecordHoveredIndex={setRecordHoveredIndex}
      />
      <div style={{ width: `calc(100% - ${headersStickyWidth}px - ${SCROLL_WIDTH - SCROLL_WIDTH}px)` }}>
        <RowListVirtualizedRowsFixed
          size={data.length}
          rowHeight={rowHeight}
          classNameRows="jk-table-rows-box"
          rowClassName="jk-table-row"
          parentRef={parentRef}
          getRecordKey={getRecordKey ? (index) => getRecordKey({
            data,
            index,
          }) : undefined}
          getRowClassName={(index) => getRecordClassName?.({
            data,
            index,
            isCard: false,
            isStickySection: false,
          }) || ''}
          getRowStyle={(index) => getRecordStyle?.({
            data,
            index,
            isCard: false,
            isStickySection: false,
          }) || {}}
          headers={headersNoSticky}
          data={data}
          style={{ minWidth: headersNoSticky.reduce((sum, head) => sum + head.width, 0) }}
          onRowClick={index => onRecordClick?.({ data, index, isCard: false })}
          recordHoveredIndex={recordHoveredIndex}
          setRecordHoveredIndex={setRecordHoveredIndex}
        />
      </div>
    </div>
  );
};
// , (prevProps, nextProps) => {
//   // rowHeight: number,
//   //   scrollLeft: number,
//   // recordHoveredIndex
//   return prevProps.data === nextProps.data && prevProps.headers === nextProps.headers;
// });
