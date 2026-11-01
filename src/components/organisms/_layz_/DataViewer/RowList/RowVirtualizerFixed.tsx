import { useVirtualizer } from '@tanstack/react-virtual';
import { LayoutGroup } from 'motion/react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { classNames } from '../../../../helpers';
import { useStableRef } from '../../../../hooks/useStableRef';
import type { RowVirtualizerFixedProps, TopHeaderType } from '../types';
import {
  applyColumnLayout,
  columnLayoutStyle,
  columnWidthVar,
  computeColumnLayout,
  getColumnMinWidth,
  withColumnWidth,
} from './columnLayout';
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
    availableWidth,
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

  // Group headers depend only on which columns are visible (their widths are CSS calc() of the columns).
  const { topHeaders, rightBorders } = useMemo(() => {
    const groupsByValue = new Map(groups.map((group) => [group.value, group]));
    const topHeaders: TopHeaderType<T>[] = [];
    const rightBorders: number[] = [];
    visibleHeaders.forEach((header, position) => {
      const group = header.group !== undefined ? groupsByValue.get(header.group) : undefined;
      const previous = topHeaders[topHeaders.length - 1];
      if (group) {
        if (previous?.header.group === group.value) {
          previous.positions.push(position);
          previous.header.sticky &&= header.sticky;
        } else {
          if (!rightBorders.length || previous?.header.head === '') {
            rightBorders.push(position - 1);
          }
          rightBorders.push(position);
          topHeaders.push({ header: { ...header, head: group.label, style: group.style }, positions: [position] });
        }
        rightBorders[rightBorders.length - 1] = position;
      } else {
        topHeaders.push({ header: { ...header, head: '', style: {} }, positions: [position] });
      }
    });
    return { topHeaders, rightBorders };
  }, [groups, visibleHeaders]);

  // Column sizes: derived (no state round-trip); only the widths the user dragged are stored.
  const [manualWidths, setManualWidths] = useState<Record<string, number>>({});
  const layout = useMemo(
    () => computeColumnLayout(visibleHeaders, availableWidth, manualWidths),
    [visibleHeaders, availableWidth, manualWidths],
  );
  const layoutStyle = useMemo(() => columnLayoutStyle(layout), [layout]);
  const headersWidth = layout.total;
  const headersStickyWidth = layout.stickyWidth;

  const layoutRef = useStableRef(layout);
  const visibleHeadersRef = useStableRef(visibleHeaders);
  const onResizeStart = useCallback(
    (position: number, startX: number) => {
      const element = parentRef.current;
      const header = visibleHeadersRef.current[position];
      if (!element || !header) {
        return;
      }
      const base = layoutRef.current;
      const columns = visibleHeadersRef.current;
      const minWidth = getColumnMinWidth(header);
      let current = base;
      // while dragging only the CSS variables change (no React render per mouse move)
      const onMove = (event: MouseEvent) => {
        const width = Math.max((base.widths[position] ?? minWidth) + event.clientX - startX, minWidth);
        if (width !== current.widths[position]) {
          current = withColumnWidth(base, columns, position, width);
          applyColumnLayout(element, current);
        }
      };
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        if (current !== base) {
          setManualWidths((prev) => ({ ...prev, [header.index]: current.widths[position]! }));
        }
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [layoutRef, visibleHeadersRef],
  );
  const rightBordersSet = useMemo(() => new Set(rightBorders), [rightBorders]);

  const {
    top: hasScrollTop,
    bottom: hasScrollBottom,
    left: hasScrollLeft,
    right: hasScrollRight,
  } = useScrollEdges(parentRef, [totalSize, headersWidth]);
  const withVerticalScroll = hasScrollTop || hasScrollBottom;

  return (
    <div
      ref={parentRef}
      style={{ ...layoutStyle, height: '100%', overflow: 'scroll' }}
      className="jk-table-rows-container"
    >
      <TableHead<T>
        columns={visibleHeaders}
        topHeaders={topHeaders}
        rightBorders={rightBorders}
        loading={loading}
        gap={gap}
        hasScrollTop={hasScrollTop}
        onResizeStart={onResizeStart}
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
            {visibleHeaders.map(({ index: columnIndex, sticky }, position) => (
              <div
                key={columnIndex}
                style={{ width: columnWidthVar(position), minWidth: columnWidthVar(position) }}
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
