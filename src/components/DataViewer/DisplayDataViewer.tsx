import React, { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { SCROLL_WIDTH } from '../../constants';
import { classNames } from '../../helpers';
import { useInterval, usePrevious } from '../../hooks';
import { LoaderLayer, TableHeadersType } from '../index';
import { CardRowVirtualizerFixed } from './CardList';
import { DataViewerToolbar } from './DataViewerToolbar';
import {
  DisplayDataViewerProps,
  HeaderWidthsType,
  RowVirtualizerFixed,
  TableHeadersWithWidthType,
} from './RowList/RowVirtualizerFixed';
import { TableHead } from './RowList/TableHead';

const minCellWidth = 100;

const headersMinWidth = <T, >(headers: TableHeadersType<T>[]) => {
  return headers.map(head => head.minWidth || minCellWidth);
};

export const LineLoader = () => {
  
  const [pos, setPos] = useState(true);
  useInterval(() => setPos(prevState => !prevState), 3000);
  
  return (
    <div className="layout-line-spinner">
      <div className={pos ? ' loader-point-left-to-right' : ' loader-point-right-to-left'} />
    </div>
  );
};

export const DisplayDataViewer = <T, >(props: DisplayDataViewerProps<T>) => {
  
  const {
    cards: { height: cardHeight = 56, width: cardWidth = 256 } = { height: 300, width: 256 },
    cardsView,
    data,
    extraButtons,
    headers,
    loading = false,
    onAllFilters,
    onReload,
    rows: { height: rowHeight = 56 } = { height: 56 },
    rowsView,
    viewMode,
    setViewMode,
  } = props;
  
  const { width: viewContainerWidth, ref: viewContainerRef } = useResizeDetector();
  const [headerWidths, setHeaderWidths] = useState<HeaderWidthsType>({});
  const prevSizeWidth = usePrevious(viewContainerWidth);
  const prevHeaders = useRef(JSON.stringify(headersMinWidth(headers)));
  const [scrollLeft, setScrollLeft] = useState(0);
  
  useEffect(() => {
    const width = (viewContainerWidth || 0) - SCROLL_WIDTH;
    const totalWidth = headers.reduce((total, { minWidth = minCellWidth }) => total + minWidth, 0);
    const extra = width > totalWidth ? width - totalWidth : 0;
    if (viewContainerWidth !== prevSizeWidth || prevHeaders.current !== JSON.stringify(headersMinWidth(headers))) {
      const newHeaderWidths: HeaderWidthsType = {};
      let accumulatedWidth = 0;
      headers.forEach(({ minWidth = minCellWidth, index }) => {
        const percentage = minWidth / totalWidth;
        newHeaderWidths[index] = { width: minWidth + (extra * percentage), minWidth, accumulatedWidth };
        accumulatedWidth += newHeaderWidths[index].width;
      });
      setHeaderWidths(newHeaderWidths);
      prevHeaders.current = JSON.stringify(headersMinWidth(headers));
    }
  }, [headers, viewContainerWidth, prevSizeWidth]);
  
  const tableHeaders: TableHeadersWithWidthType<T>[] = useMemo(() => headers.map(head => ({
    ...head,
    width: headerWidths[head.index]?.width || 0,
  })), [
    headers,
    headerWidths,
  ]);
  
  const rowWidth = Object.values(headerWidths).reduce((total, { width }) => total + width, 0);
  
  return (
    <div className="jk-data-viewer-content">
      <DataViewerToolbar
        setViewMode={setViewMode}
        extraButtons={extraButtons}
        headers={headers}
        dataLength={data.length}
        viewMode={viewMode}
        rowsView={rowsView}
        cardsView={cardsView}
        loading={loading}
        onReload={onReload}
        onAllFilters={onAllFilters}
      />
      <div
        className={classNames('jk-view-container jk-border-radius-inline', { 'jk-shadow': viewMode === 'rows' }, viewMode)}
        ref={viewContainerRef}
        onScroll={({ currentTarget }: SyntheticEvent<HTMLDivElement>) => setScrollLeft(currentTarget.scrollLeft || 0)}
      >
        {viewMode === 'rows' && (
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
            rowWidth={rowWidth}
            scrollLeft={scrollLeft}
          />
        )}
        {data.length > 0 && loading && <LineLoader />}
        {viewMode === 'rows' ? (
          <div className={classNames('jk-data-viewer-body', viewMode)} style={{ width: rowWidth + SCROLL_WIDTH }}>
            <LoaderLayer loading={data.length === 0 && loading}>
              <RowVirtualizerFixed data={data} headers={tableHeaders} rowHeight={rowHeight} scrollLeft={scrollLeft} />
            </LoaderLayer>
          </div>
        ) : (
          <div className={classNames('jk-data-viewer-body', viewMode)} style={{ width: (viewContainerWidth || 0) }}>
            <LoaderLayer loading={data.length === 0 && loading}>
              <CardRowVirtualizerFixed
                headers={tableHeaders}
                data={data}
                cardHeight={cardHeight}
                cardWidth={cardWidth}
                rowWidth={(viewContainerWidth || 0) - SCROLL_WIDTH}
              />
            </LoaderLayer>
          </div>
        )}
      </div>
    </div>
  );
};
