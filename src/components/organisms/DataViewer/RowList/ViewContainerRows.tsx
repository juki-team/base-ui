import { DataViewMode } from '@juki-team/commons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OnRefChangeType } from 'react-resize-detector/build/types/types';
import { SCROLL_WIDTH } from '../../../../constants';
import { classNames } from '../../../../helpers';
import { usePrevious } from '../../../../hooks';
import { JukiLoadingLayout } from '../../../molecules';
import {
  GetRecordClassNameType,
  GetRecordKeyType,
  GetRecordStyleType,
  HeaderWidthsType,
  OnRecordClickType,
  TableHeadersType,
  TableHeadersWithWidthType,
} from '../types';
import { RowVirtualizerFixed } from './RowVirtualizerFixed';
import { TableHead } from './TableHead';

const minCellWidth = 100;

const headersMinWidth = <T, >(headers: TableHeadersType<T>[]) => {
  return headers.map(head => head.minWidth || minCellWidth);
};

interface ViewContainerRowsProps<T> {
  headers: TableHeadersType<T>[],
  viewContainerWidth: number,
  headerRef: OnRefChangeType,
  rowHeight: number,
  data: T[],
  viewMode: DataViewMode,
  loading: boolean,
  getRecordKey: GetRecordKeyType<T> | undefined,
  getRecordStyle: GetRecordStyleType<T> | undefined,
  getRecordClassName: GetRecordClassNameType<T> | undefined,
  onRecordClick: OnRecordClickType<T> | undefined,
}

export const ViewContainerRows = <T, >(props: ViewContainerRowsProps<T>) => {
  
  const {
    headers,
    viewContainerWidth,
    headerRef,
    rowHeight,
    loading,
    data,
    getRecordKey,
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    viewMode,
  } = props;
  
  const [ scrollLeft, setScrollLeft ] = useState(0);
  const [ borderTop, setBorderTop ] = useState(false);
  const [ headerWidths, setHeaderWidths ] = useState<HeaderWidthsType>({});
  const prevSizeWidth = usePrevious(viewContainerWidth);
  const prevHeaders = useRef(JSON.stringify(headersMinWidth(headers)));
  const tableHeaders: TableHeadersWithWidthType<T>[] = useMemo(() => headers.map(head => ({
    ...head,
    width: headerWidths[head.index]?.width || 0,
  })).filter(head => head.width), [ headers, headerWidths ]);
  
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
  
  return (
    <>
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
        borderTop={borderTop}
        scrollLeft={scrollLeft}
        loading={loading}
        ref={headerRef}
      />
      <div className={classNames('jk-data-viewer-body', viewMode.toLowerCase())}>
        {data.length === 0 && loading && <JukiLoadingLayout />}
        <RowVirtualizerFixed
          data={data}
          setBorderTop={setBorderTop}
          headers={tableHeaders}
          rowHeight={rowHeight}
          setScrollLeft={setScrollLeft}
          getRecordKey={getRecordKey}
          getRecordClassName={getRecordClassName}
          getRecordStyle={getRecordStyle}
          onRecordClick={onRecordClick}
        />
      </div>
    </>
  );
};
