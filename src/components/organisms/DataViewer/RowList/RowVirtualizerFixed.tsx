import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import React, {
  CSSProperties,
  Dispatch,
  ReactNode,
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

interface VirtualizedRowsFixedProps {
  rowHeight: number,
  rowClassName?: string,
  size: number,
  renderRow: (virtualItem: VirtualItem) => ReactNode,
  classNameRows?: string
  getRecordKey: (virtualItem: VirtualItem) => string,
  getRowStyle: (virtualItem: VirtualItem) => CSSProperties,
  getRowClassName: (virtualItem: VirtualItem) => string,
  parentRef: RefObject<HTMLDivElement>
  style: CSSProperties,
  recordHoveredIndex: number | null,
  setRecordHoveredIndex: Dispatch<SetStateAction<number | null>>,
  onRowClick: (virtualItem: VirtualItem) => void,
}

export const VirtualizedRowsFixed = ({
                                       rowHeight,
                                       size,
                                       renderRow,
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
                                     }: VirtualizedRowsFixedProps) => {
  
  const rowVirtualizer = useVirtualizer({
    count: size,
    estimateSize: useCallback(() => rowHeight, [ rowHeight ]),
    overscan: 5,
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
          {renderRow(virtualRow)}
        </div>
      ))}
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
  
  const renderRowField = (virtualRow: VirtualItem) => ({
                                                         field,
                                                         index: columnIndex,
                                                         width,
                                                       }: TableHeadersWithWidthType<T>) => {
    return (<div
        key={virtualRow.key + ',' + columnIndex}
        style={{ width: width + 'px' }}
      >
        {renderField(data, virtualRow.index, false)({ field, index: columnIndex })}
      </div>
    );
  }
  
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
        renderRow={(virtualRow) => headersSticky.map(renderRowField(virtualRow))}
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
          renderRow={(virtualRow) => headersNoSticky.map(renderRowField(virtualRow))}
          style={{ minWidth: headersNoSticky.reduce((sum, head) => sum + head.width, 0) }}
          onRowClick={(virtualItem) => onRecordClick?.({ data, index: virtualItem.index, isCard: false })}
          recordHoveredIndex={recordHoveredIndex}
          setRecordHoveredIndex={setRecordHoveredIndex}
        />
      </div>
    </div>
  );
};
