import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'motion/react';
import { Children, useCallback, useEffect, useMemo, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../../helpers';
import { useStableRef } from '../../../../hooks/useStableRef';
import type { DataViewerTableHeadersType, RowVirtualizerFixedProps } from '../types';
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
    // setWithVerticalScroll,
  } = props;
  
  const parentRef = useRef<HTMLDivElement>(null);
  const { height: headerHeight = 0, ref: headerRef } = useResizeDetector();
  const dataRef = useStableRef(data);
  const getRecordKeyRef = useStableRef(getRecordKey);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    estimateSize: useCallback(() => rowHeight + gap * 2, [ rowHeight, gap ]),
    overscan: 10,
    getScrollElement: useCallback(() => parentRef.current, []),
    getItemKey: useCallback((index: number) => {
      const fn = getRecordKeyRef.current;
      return fn ? fn({ data: dataRef.current, index }) : index;
    }, [ dataRef, getRecordKeyRef ]),
  });
  const onRecordRenderRef = useRef(onRecordRender);
  onRecordRenderRef.current = onRecordRender;
  useEffect(() => {
    rowVirtualizer.getVirtualItems().map((virtualRow) => (
      onRecordRenderRef.current?.({ data, index: virtualRow.index, isCard: false })
    ));
  }, [ data, rowVirtualizer ]);
  
  const totalSize = rowVirtualizer.getTotalSize();
  const scrollEl = rowVirtualizer.scrollElement;
  const scrollOffset = rowVirtualizer.scrollOffset ?? 0;
  
  const hasScrollTop = scrollOffset > 0;
  const hasScrollBottom = scrollEl
    ? scrollOffset + scrollEl.clientHeight < (totalSize + headerHeight + gap /*border bottom header*/)
    : false;
  const hasScrollLeft = scrollEl ? scrollEl.scrollLeft > 0 : false;
  const hasScrollRight = scrollEl
    ? scrollEl.scrollWidth - scrollEl.clientWidth - scrollEl.scrollLeft > 1
    : false;
  
  const virtualItems = rowVirtualizer.getVirtualItems();
  const withVerticalScroll = hasScrollTop || hasScrollBottom;
  
  // useEffect(() => {
  //   setWithVerticalScroll(withVerticalScroll);
  // }, [ withVerticalScroll ]);
  
  const { topHeaders, rightBorders, headersWidth, headersStickyWidth } = useMemo(() => {
    const topHeaders: DataViewerTableHeadersType<T>[] = [];
    const rightBorders: number[] = [];
    let index = 0;
    
    for (const header of headers) {
      if (header.visible?.getVisible?.()) {
        const group = groups.find(group => group.value === header.group);
        const previous = topHeaders[topHeaders.length - 1];
        if (group) {
          if (previous?.group === group.value) {
            previous.width += header.width;
            previous.sticky &&= header.sticky;
          } else {
            if (!rightBorders.length || topHeaders[topHeaders.length - 1]?.head === '') {
              rightBorders.push(index - 1);
            }
            rightBorders.push(index);
            topHeaders.push({ ...header, head: group.label, style: group.style });
          }
          rightBorders[rightBorders.length - 1] = index;
        } else {
          topHeaders.push({ ...header, head: '', style: {} });
        }
        index++;
      }
    }
    
    const headersStickyWidth = headers.reduce((sum, head) => sum + (head.sticky && head.visible?.getVisible() ? head.width : 0), 0);
    const headersWidth = headers.reduce((sum, head) => sum + (head.visible?.getVisible() ? head.width : 0), 0);
    
    return { topHeaders, rightBorders, headersWidth, headersStickyWidth };
  }, [ headers, groups ]);
  
  return (
    <div
      ref={parentRef}
      style={{ height: '100%', overflow: 'scroll' }}
      className="jk-table-rows-container"
    >
      <TableHead
        headers={headers}
        setHeaders={setHeaders}
        loading={loading}
        gap={gap}
        headerRef={headerRef}
        topHeaders={topHeaders}
        rightBorders={rightBorders}
        hasScrollTop={hasScrollTop}
      />
      {/*{hasScrollTop && (*/}
      {/*  <div*/}
      {/*    className="expand-absolute jk-br-ie-none"*/}
      {/*    style={{*/}
      {/*      height: headerHeight,*/}
      {/*      zIndex: 3,*/}
      {/*      // width: 'calc(100% - 8px)',*/}
      {/*      widows: '100%',*/}
      {/*      background: 'transparent',*/}
      {/*      boxShadow: '0 0px 4px 0 var(--cr-ht), 0 0px 4px 1px var(--cr-ht)',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      {hasScrollLeft && (
        <div
          className="expand-absolute pe-ne"
          style={{
            width: headersStickyWidth,
            zIndex: 3,
            background: 'transparent',
            boxShadow: '0 0px 4px 0 var(--cr-ht), 0 0px 4px 1px var(--cr-ht)',
          }}
        />
      )}
      {hasScrollRight && (
        <div
          className="expand-absolute pe-ne"
          style={{
            width: withVerticalScroll ? 16 : 2,
            left: 'unset',
            right: withVerticalScroll ? -8 : -1,
            zIndex: 3,
            background: 'transparent',
            boxShadow: '0 0px 4px 0 var(--cr-ht), 0 0px 4px 1px var(--cr-ht)',
          }}
        />
      )}
      {hasScrollBottom && (
        <div
          className="expand-absolute pe-ne"
          style={{
            height: 1,
            top: 'unset',
            bottom: -1,
            zIndex: 3,
            background: 'transparent',
            boxShadow: '0 0px 4px 0 var(--cr-ht), 0 0px 4px 1px var(--cr-ht)',
          }}
        />
      )}
      <div className="jk-table-rows-box" style={{ height: totalSize }}>
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
            className="jk-table-row"
          >
            {Children.toArray(
              headers
                .filter(({ visible }) => visible?.getVisible?.())
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
        {virtualItems.map(virtualRow => (
          <motion.div
            key={virtualRow.key}
            jk-data-virtual-row-key={virtualRow.key}
            layoutId={virtualRow.key as string || undefined}
            style={{
              ...(getRecordStyle?.({ data, index: virtualRow.index, isCard: false, isStickySection: false }) || {}),
              position: virtualRow.start !== null ? 'absolute' : undefined,
              top: virtualRow.start !== null ? virtualRow.start + gap : 0,
              left: 0,
              width: headersWidth,
              height: `${virtualRow.size - gap * 2}px`,
            }}
            className={classNames(
              'jk-table-row',
              getRecordClassName?.({ data, index: virtualRow.index, isCard: false, isStickySection: true }) || '',
            )}
            onClick={() => onRecordClick?.({ data, index: virtualRow.index, isCard: false })}
            onMouseEnter={() => onRecordHover?.({ data, index: virtualRow.index, isCard: false })}
          >
            {Children.toArray(headers
              .filter(({ visible }) => visible?.getVisible?.())
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
                  {data[virtualRow.index] && (
                    <Field
                      record={data[virtualRow.index]!}
                      columnIndex={columnIndex}
                      recordIndex={virtualRow.index}
                      isCard={false}
                    />
                  )}
                </div>
              )),
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
