import { DataViewMode } from '@juki-team/commons';
import React, { Children, CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS, SCROLL_WIDTH } from '../../../constants';
import { classNames, renderReactNodeOrFunction } from '../../../helpers';
import { usePrevious } from '../../../hooks';
import { LineLoader, LoaderLayer } from '../../atoms';
import { CardRowVirtualizerFixed } from './CardList';
import { DataViewerToolbar } from './DataViewerToolbar';
import { RowVirtualizerFixed } from './RowList/RowVirtualizerFixed';
import { TableHead } from './RowList/TableHead';
import { DisplayDataViewerProps, HeaderWidthsType, TableHeadersType, TableHeadersWithWidthType } from './types';

const minCellWidth = 100;

const headersMinWidth = <T, >(headers: TableHeadersType<T>[]) => {
  return headers.map(head => head.minWidth || minCellWidth);
};

export const DisplayDataViewer = <T, >(props: DisplayDataViewerProps<T>) => {
  
  const {
    viewPortSize,
    cards: { height: cardHeight = 300, width: cardWidth = 256, expanded: cardExpanded = false } = {
      height: 300,
      width: 256,
      expanded: false,
    },
    cardsView,
    data,
    extraNodes,
    headers,
    loading = false,
    onAllFilters,
    onReload,
    rows: { height: rowHeight = 56 } = { height: 56 },
    rowsView,
    viewMode,
    setViewMode,
    getRecordKey,
    pagination,
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    extraNodesFloating = false,
    showFilterDrawerKey,
  } = props;
  
  const { width: viewContainerWidth, ref: viewContainerRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const [ headerWidths, setHeaderWidths ] = useState<HeaderWidthsType>({});
  const prevSizeWidth = usePrevious(viewContainerWidth);
  const prevHeaders = useRef(JSON.stringify(headersMinWidth(headers)));
  const [ scrollLeft, setScrollLeft ] = useState(0);
  const [ scrollTop, setScrollTop ] = useState(0);
  
  useEffect(() => {
    const width = (viewContainerWidth || 0) - SCROLL_WIDTH;
    const totalWidth = headers.reduce((total, { minWidth = minCellWidth }) => total + minWidth, 0);
    const extra = width > totalWidth ? width - totalWidth : 0;
    if (viewContainerWidth !== prevSizeWidth || prevHeaders.current !== JSON.stringify(headersMinWidth(headers))) {
      const newHeaderWidths: HeaderWidthsType = {};
      let accumulatedWidth = 0;
      headers.forEach(({ minWidth = minCellWidth, index }) => {
        const percentage = minWidth / totalWidth;
        newHeaderWidths[index] = { width: Math.floor(minWidth + (extra * percentage)), minWidth, accumulatedWidth };
        accumulatedWidth += newHeaderWidths[index].width;
      });
      setHeaderWidths(newHeaderWidths);
      prevHeaders.current = JSON.stringify(headersMinWidth(headers));
    }
  }, [ headers, viewContainerWidth, prevSizeWidth ]);
  
  const tableHeaders: TableHeadersWithWidthType<T>[] = useMemo(() => headers.map(head => ({
    ...head,
    width: headerWidths[head.index]?.width || 0,
  })).filter(head => head.width), [ headers, headerWidths ]);
  const [ recordHoveredIndex, setRecordHoveredIndex ] = useState<number | null>(null);
  const isMobileViewPort = viewPortSize === 'sm';
  const viewViews = !(isMobileViewPort && (!rowsView || !cardsView));
  const onColumn = !isMobileViewPort || (isMobileViewPort
    && (extraNodes.length === 0 ? true : extraNodesFloating)
    && !viewViews);
  
  return (
    <div
      className="jk-data-viewer-content jk-br-ie"
      style={{ '--jk-table-toolbar-height': (onColumn ? 50 : 82) + 'px', position: 'relative' } as CSSProperties}
    >
      <DataViewerToolbar<T>
        setViewMode={setViewMode}
        extraNodes={extraNodes}
        headers={headers}
        dataLength={data.length}
        viewMode={viewMode}
        rowsView={rowsView}
        cardsView={cardsView}
        loading={loading}
        onReload={onReload}
        onAllFilters={onAllFilters}
        pagination={pagination}
        extraNodesFloating={extraNodesFloating}
        onColumn={onColumn}
        viewViews={viewViews}
        showFilterDrawerKey={showFilterDrawerKey}
      />
      {extraNodesFloating && isMobileViewPort && (
        <div
          className="jk-col gap nowrap"
          style={{ position: 'absolute', bottom: 'var(--pad-t)', right: 'var(--pad-t)', zIndex: 1 }}
        >
          {Children.toArray(extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton)))}
        </div>
      )}
      <div
        className={classNames('jk-view-container', viewMode.toLowerCase())}
        ref={viewContainerRef}
      >
        {viewMode === DataViewMode.ROWS && (
          <TableHead
            headers={tableHeaders}
            headerWidths={headerWidths}
            setHeaderWidths={headerWidths => {
              let accumulatedWidth = 0;
              const newHeaderWidths: HeaderWidthsType = {};
              headers.forEach(({ index }) => {
                newHeaderWidths[index] = { ...headerWidths[index], accumulatedWidth };
                accumulatedWidth += headerWidths[index].width;
              });
              setHeaderWidths(newHeaderWidths);
            }}
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            loading={loading}
          />
        )}
        {data.length > 0 && loading && <LineLoader />}
        {viewMode === DataViewMode.ROWS ? (
          <div className={classNames('jk-data-viewer-body', viewMode.toLowerCase())}>
            <LoaderLayer loading={data.length === 0 && loading}>
              <RowVirtualizerFixed
                data={data}
                headers={tableHeaders}
                rowHeight={rowHeight}
                scrollLeft={scrollLeft}
                setScrollLeft={setScrollLeft}
                setScrollTop={setScrollTop}
                getRecordKey={getRecordKey}
                recordHoveredIndex={recordHoveredIndex}
                setRecordHoveredIndex={setRecordHoveredIndex}
                getRecordClassName={getRecordClassName}
                getRecordStyle={getRecordStyle}
                onRecordClick={onRecordClick}
              />
            </LoaderLayer>
          </div>
        ) : (
          <div
            className={classNames('jk-data-viewer-body', viewMode.toLowerCase())}
            style={{ width: (viewContainerWidth || 0) }}
          >
            <LoaderLayer loading={data.length === 0 && loading}>
              <CardRowVirtualizerFixed
                headers={tableHeaders}
                data={data}
                cardHeight={cardHeight}
                cardWidth={cardWidth}
                rowWidth={(viewContainerWidth || 0) - SCROLL_WIDTH}
                recordHoveredIndex={recordHoveredIndex}
                setRecordHoveredIndex={setRecordHoveredIndex}
                getRecordClassName={getRecordClassName}
                getRecordStyle={getRecordStyle}
                onRecordClick={onRecordClick}
                expandedCards={cardExpanded}
              />
            </LoaderLayer>
          </div>
        )}
      </div>
    </div>
  );
};
