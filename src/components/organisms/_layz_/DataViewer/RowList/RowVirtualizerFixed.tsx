import { useVirtualizer } from '@tanstack/react-virtual';
import { LayoutGroup } from 'motion/react';
import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { classNames } from '../../../../helpers';
import { useStableRef } from '../../../../hooks/useStableRef';
import type { DataViewerTableHeadersType, RowVirtualizerFixedProps } from '../types';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { useScrollEdges } from './useScrollEdges';

export const RowVirtualizerFixed = <T,>(props: RowVirtualizerFixedProps<T>) => {
  const {
    data,
    headers,
    rowHeight,
    getRecordStyle,
    getRecordClassName,
    getRecordKey,
    onRecordClick,
    onRecordHover,
    // onRecordRender,
    gap,
    loading,
    setHeaders,
    groups,
    virtualizerOverscan,
    focusRowKey,
    // setWithVerticalScroll,
  } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  // layoutIds are global in motion: scope them per table instance so rows of different tables
  // (e.g. index keys "1", "2"... on another page) don't run shared-layout animations between them
  const layoutGroupId = useId();
  const animateRows = !!getRecordKey;
  const dataRef = useStableRef(data);
  const getRecordKeyRef = useStableRef(getRecordKey);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    estimateSize: useCallback(() => rowHeight + gap * 2, [rowHeight, gap]),
    overscan: virtualizerOverscan,
    getScrollElement: useCallback(() => parentRef.current, []),
    getItemKey: useCallback(
      (index: number) => {
        const fn = getRecordKeyRef.current;
        return fn ? fn({ data: dataRef.current, index }) : index;
      },
      [dataRef, getRecordKeyRef],
    ),
  });

  const visibleHeaders = useMemo(() => headers.filter((header) => header.visible?.getVisible?.()), [headers]);

  useEffect(() => {
    const fn = getRecordKeyRef.current;
    if (!focusRowKey || !fn) {
      return;
    }

    const index = dataRef.current.findIndex((_, i) => fn({ data: dataRef.current, index: i }) === focusRowKey);
    if (index < 0) {
      return;
    }

    rowVirtualizer.scrollToIndex(index, { align: 'center', behavior: 'smooth' });
  }, [dataRef, focusRowKey, getRecordKeyRef, rowVirtualizer]);
  // const onRecordRenderRef = useRef(onRecordRender);
  // onRecordRenderRef.current = onRecordRender;
  // useEffect(() => { // no works
  //   rowVirtualizer.getVirtualItems().map((virtualRow) => (
  //     onRecordRenderRef.current?.({ data, index: virtualRow.index, isCard: false })
  //   ));
  // }, [ data, rowVirtualizer ]);

  const totalSize = rowVirtualizer.getTotalSize();
  const virtualItems = rowVirtualizer.getVirtualItems();

  // useEffect(() => {
  //   setWithVerticalScroll(withVerticalScroll);
  // }, [ withVerticalScroll ]);

  const { topHeaders, rightBorders, headersWidth, headersStickyWidth } = useMemo(() => {
    const topHeaders: DataViewerTableHeadersType<T>[] = [];
    const rightBorders: number[] = [];
    let index = 0;

    for (const header of visibleHeaders) {
      const group = groups.find((group) => group.value === header.group);
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

    const headersStickyWidth = visibleHeaders.reduce((sum, head) => sum + (head.sticky ? head.width : 0), 0);
    const headersWidth = visibleHeaders.reduce((sum, head) => sum + head.width, 0);

    return { topHeaders, rightBorders, headersWidth, headersStickyWidth };
  }, [groups, visibleHeaders]);
  const rightBordersSet = useMemo(() => new Set(rightBorders), [rightBorders]);

  const {
    top: hasScrollTop,
    bottom: hasScrollBottom,
    left: hasScrollLeft,
    right: hasScrollRight,
  } = useScrollEdges(parentRef, [totalSize, headersWidth]);
  const withVerticalScroll = hasScrollTop || hasScrollBottom;

  return (
    <div ref={parentRef} style={{ height: '100%', overflow: 'scroll' }} className="jk-table-rows-container">
      <TableHead
        headers={headers}
        setHeaders={setHeaders}
        loading={loading}
        gap={gap}
        topHeaders={topHeaders}
        rightBorders={rightBorders}
        hasScrollTop={hasScrollTop}
      />
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
            {visibleHeaders.map(({ index: columnIndex, width, sticky }) => (
              <div
                key={columnIndex}
                style={{ width: width, minWidth: width }}
                className={classNames({ sticky: !!sticky })}
              ></div>
            ))}
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
        <LayoutGroup id={layoutGroupId}>
          {virtualItems.map((virtualRow) => (
            <TableRow<T>
              key={virtualRow.key}
              rowKey={virtualRow.key}
              data={data}
              index={virtualRow.index}
              start={virtualRow.start}
              size={virtualRow.size}
              gap={gap}
              width={headersWidth}
              columns={visibleHeaders}
              rightBorders={rightBordersSet}
              getRecordStyle={getRecordStyle}
              getRecordClassName={getRecordClassName}
              onRecordClick={onRecordClick}
              onRecordHover={onRecordHover}
              animate={animateRows}
            />
          ))}
        </LayoutGroup>
      </div>
    </div>
  );
};
