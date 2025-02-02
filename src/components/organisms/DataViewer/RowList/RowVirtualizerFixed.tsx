import { useVirtualizer } from '@tanstack/react-virtual';
import React, { Children, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from '../../../../helpers';
import { RowVirtualizerFixedProps } from '../types';

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
    setBorderTop,
    setScrollLeft,
    gap,
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const [ borderRight, setBorderRight ] = useState(false);
  const [ borderLeft, setBorderLeft ] = useState(false);
  const [ borderBottom, setBorderBottom ] = useState(false);
  const headersStickyWidth = headers.reduce((sum, head) => sum + (head.sticky && head.visible ? head.width : 0), 0);
  const headersWidth = headers.reduce((sum, head) => sum + (head.visible ? head.width : 0), 0);
  
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    estimateSize: useCallback(() => rowHeight + gap * 2, [ rowHeight, gap ]),
    overscan: 2,
    getScrollElement: () => parentRef.current,
    getItemKey: getRecordKey ? (index) => getRecordKey({
      data,
      index,
    }) : undefined,
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
  
  return (
    <div
      ref={parentRef}
      style={{ height: '100%', overflow: 'auto' }}
      className={classNames('jk-table-rows-container')}
      onScroll={({ currentTarget }: SyntheticEvent<HTMLDivElement>) => {
        const scrollLeft = currentTarget.scrollLeft || 0;
        const scrollTop = currentTarget.scrollTop || 0;
        setBorderRight(!!(currentTarget.scrollWidth - currentTarget.clientWidth - scrollLeft));
        setBorderBottom(!!(currentTarget.scrollHeight - currentTarget.clientHeight - scrollTop));
        setBorderTop(!!scrollTop);
        setBorderLeft(!!scrollLeft);
        setScrollLeft(scrollLeft);
      }}
    >
      {borderLeft && (
        <div
          style={{
            height: '100%',
            width: headersStickyWidth,
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 3,
            background: 'transparent',
            pointerEvents: 'none',
            boxShadow: '0 0px 4px 0 var(--t-color-highlight), 0 0px 4px 1px var(--t-color-highlight)',
          }}
        />
      )}
      {borderRight && (
        <div
          style={{
            height: '100%',
            width: 1,
            position: 'absolute',
            right: -1,
            top: 0,
            zIndex: 3,
            background: 'transparent',
            pointerEvents: 'none',
            boxShadow: '0 0px 4px 0 var(--t-color-highlight), 0 0px 4px 1px var(--t-color-highlight)',
          }}
        />
      )}
      {borderBottom && (
        <div
          style={{
            width: '100%',
            height: 1,
            position: 'absolute',
            left: 0,
            bottom: -1,
            zIndex: 3,
            background: 'transparent',
            pointerEvents: 'none',
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
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
            <div
              key={virtualRow.key}
              style={{
                ...getRowStyle(virtualRow.index),
                position: 'absolute',
                top: 0,
                left: 0,
                width: headersWidth,
                height: `${virtualRow.size - gap * 2}px`,
                transform: `translateY(${virtualRow.start + gap}px)`,
              }}
              className={classNames('jk-table-row', getRowClassName(virtualRow.index))}
              onClick={() => onRecordClick?.({ data, index: virtualRow.index, isCard: false })}
              onMouseEnter={() => onRecordHover?.({ data, index: virtualRow.index, isCard: false })}
            >
              {Children.toArray(
                headers
                  .filter(({ visible }) => visible)
                  .map(({ Field, index: columnIndex, width, sticky, accumulatedWidth }) => (
                    <div
                      key={virtualRow.key + '_' + columnIndex}
                      style={{ width: width, minWidth: width, left: sticky ? accumulatedWidth : undefined }}
                      className={classNames({ sticky: !!sticky }, 'jk-table-row-field bc-we')}
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
          ),
        )}
      </div>
    </div>
  );
};
