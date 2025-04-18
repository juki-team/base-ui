import { useVirtualizer } from '@tanstack/react-virtual';
import React, { Children, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../../helpers';
import { DataViewerTableHeadersType, RowVirtualizerFixedProps } from '../types';
import { TableHead } from './TableHead';

export const RowVirtualizerFixed = <T, >(props: RowVirtualizerFixedProps<T>) => {
  
  const {
    data,
    headers,
    rowHeight,
    getRecordStyle,
    getRecordClassName,
    getRecordKey,
    onRecordClick,
    onRecordHover,
    onRecordRender,
    gap,
    loading,
    setHeaders,
    groups,
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const [ borderRight, setBorderRight ] = useState(false);
  const [ borderLeft, setBorderLeft ] = useState(false);
  const [ borderBottom, setBorderBottom ] = useState(false);
  const [ borderTop, setBorderTop ] = useState(false);
  const { height: headerHeight = 0, ref: headerRef } = useResizeDetector();
  
  const headersStickyWidth = headers.reduce((sum, head) => sum + (head.sticky && head.visible ? head.width : 0), 0);
  const headersWidth = headers.reduce((sum, head) => sum + (head.visible ? head.width : 0), 0);
  const getItemKey = getRecordKey ? (index: number) => getRecordKey({ data, index }) : undefined;
  
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    estimateSize: useCallback(() => rowHeight + gap * 2, [ rowHeight, gap ]),
    overscan: 10,
    getScrollElement: () => parentRef.current,
    getItemKey,
  });
  const onRecordRenderRef = useRef(onRecordRender);
  onRecordRenderRef.current = onRecordRender;
  useEffect(() => {
    rowVirtualizer.getVirtualItems().map((virtualRow) => (
      onRecordRenderRef.current?.({ data, index: virtualRow.index, isCard: false })
    ));
  }, [ data, rowVirtualizer ]);
  
  const getRowClassName = (index: number) => getRecordClassName?.({
    data,
    index,
    isCard: false,
    isStickySection: true,
  }) || '';
  
  const getRowStyle = (index: number) => getRecordStyle?.({
    data,
    index,
    isCard: false,
    isStickySection: false,
  }) || {};
  
  const topHeaders: DataViewerTableHeadersType<T>[] = [];
  const rightBorders: number[] = [];
  let index = 0;
  for (const header of headers) {
    if (header.visible) {
      const group = groups.find(group => group.key === header.group);
      if (group) {
        if (topHeaders[topHeaders.length - 1]?.group === group.key) {
          topHeaders[topHeaders.length - 1].width += header.width;
          topHeaders[topHeaders.length - 1].sticky &&= header.sticky;
        } else {
          if (!rightBorders.length || topHeaders[topHeaders.length - 1]?.head === '') {
            rightBorders.push(index - 1);
          }
          rightBorders.push(index);
          topHeaders.push({ ...header });
        }
        rightBorders[rightBorders.length - 1] = index;
        topHeaders[topHeaders.length - 1].head = group.label;
      } else {
        topHeaders.push({ ...header, head: '' });
      }
      index++;
    }
  }
  
  return (
    <div
      ref={parentRef}
      style={{ height: '100%', overflow: 'auto' }}
      className={classNames('jk-table-rows-container')}
      onScroll={({ currentTarget }: SyntheticEvent<HTMLDivElement>) => {
        const scrollLeft = currentTarget.scrollLeft || 0;
        const scrollTop = currentTarget.scrollTop || 0;
        const scrollRight = !!(currentTarget.scrollWidth - currentTarget.clientWidth - scrollLeft);
        const scrollBottom = !!(currentTarget.scrollHeight - currentTarget.clientHeight - scrollTop);
        if (scrollRight !== borderRight) {
          setBorderRight(scrollRight);
        }
        if (scrollBottom !== borderBottom) {
          setBorderBottom(scrollBottom);
        }
        if (!!scrollTop !== borderTop) {
          setBorderTop(!!scrollTop);
        }
        if (!!scrollLeft !== borderLeft) {
          setBorderLeft(!!scrollLeft);
        }
        // setScrollLeft(scrollLeft);
      }}
    >
      <TableHead
        headers={headers}
        setHeaders={setHeaders}
        loading={loading}
        gap={gap}
        headerRef={headerRef}
        topHeaders={topHeaders}
        rightBorders={rightBorders}
      />
      {borderTop && (
        <div
          className="expand-absolute"
          style={{
            height: headerHeight,
            zIndex: 3,
            width: 'calc(100% - 8px)',
            background: 'transparent',
            boxShadow: '0 0px 4px 0 var(--t-color-highlight), 0 0px 4px 1px var(--t-color-highlight)',
          }}
        />
      )}
      {borderLeft && (
        <div
          className="expand-absolute"
          style={{
            width: headersStickyWidth,
            zIndex: 3,
            background: 'transparent',
            boxShadow: '0 0px 4px 0 var(--t-color-highlight), 0 0px 4px 1px var(--t-color-highlight)',
          }}
        />
      )}
      {borderRight && (
        <div
          className="expand-absolute"
          style={{
            width: 1,
            left: 'unset',
            right: -1,
            zIndex: 3,
            background: 'transparent',
            boxShadow: '0 0px 4px 0 var(--t-color-highlight), 0 0px 4px 1px var(--t-color-highlight)',
          }}
        />
      )}
      {borderBottom && (
        <div
          className="expand-absolute"
          style={{
            height: 1,
            top: 'unset',
            bottom: -1,
            zIndex: 3,
            background: 'transparent',
            boxShadow: '0 0px 4px 0 var(--t-color-highlight), 0 0px 4px 1px var(--t-color-highlight)',
          }}
        />
      )}
      <div
        className={classNames('jk-table-rows-box')}
        style={{ height: `${rowVirtualizer.getTotalSize()}px` /* ...style*/ }}
      >
        {!data.length && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: headersWidth,
              height: `${1}px`,
              transform: `translateY(${0}px)`,
            }}
            className={classNames('jk-table-row')}
          >
            {Children.toArray(
              headers
                .filter(({ visible }) => visible)
                .map(({ index: columnIndex, width, sticky }) => (
                  <div
                    key={columnIndex}
                    style={{ width: width, minWidth: width }}
                    className={classNames({ sticky: !!sticky })}
                  >
                  </div>
                )),
            )}
          </div>
        )}
        {/*
          {(data.length < 100 ? data.map((d, index) => ({
          key: getItemKey?.(index),
          index,
          size: rowHeight,
          start: null,
        })) : rowVirtualizer.getVirtualItems())
        */}
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              ...getRowStyle(virtualRow.index),
              position: virtualRow.start !== null ? 'absolute' : undefined,
              top: 0,
              left: 0,
              width: headersWidth,
              height: `${virtualRow.size - gap * 2}px`,
              transform: virtualRow.start !== null ? `translateY(${virtualRow.start + gap}px)` : undefined,
            }}
            className={classNames('jk-table-row', getRowClassName(virtualRow.index))}
            onClick={() => onRecordClick?.({ data, index: virtualRow.index, isCard: false })}
            onMouseEnter={() => onRecordHover?.({ data, index: virtualRow.index, isCard: false })}
          >
            {Children.toArray(
              headers
                .filter(({ visible }) => visible)
                .map(({ Field, index: columnIndex, width, sticky, accumulatedWidth }, index) => (
                  <div
                    key={virtualRow.key + '_' + columnIndex}
                    style={{ width: width, minWidth: width, left: sticky ? accumulatedWidth : undefined }}
                    className={classNames({
                      sticky: !!sticky,
                      'with-right-border': rightBorders.includes(index),
                    }, 'jk-table-row-field bc-we')}
                    data-testid={virtualRow.key + '_' + columnIndex}
                  >
                    <Field
                      record={data[virtualRow.index]}
                      columnIndex={columnIndex}
                      recordIndex={virtualRow.index}
                      isCard={false}
                    />
                  </div>
                )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
