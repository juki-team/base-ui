import { DataViewMode } from '@juki-team/commons';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { OnRefChangeType } from 'react-resize-detector/build/types/types';
import { SCROLL_WIDTH } from '../../../../constants';
import { classNames } from '../../../../helpers';
import { usePrevious } from '../../../../hooks';
import { JukiLoadingLayout } from '../../../molecules';
import {
  DataViewerTableHeadersType,
  GetRecordClassNameType,
  GetRecordKeyType,
  GetRecordStyleType,
  OnRecordClickType,
  TableHeadersType,
} from '../types';
import { RowVirtualizerFixed } from './RowVirtualizerFixed';
import { TableHead } from './TableHead';

const minCellWidth = 100;

const headersMinWidth = <T, >(headers: TableHeadersType<T>[]) => {
  return headers.map(head => head.minWidth || minCellWidth);
};

interface ViewContainerRowsProps<T> {
  headers: DataViewerTableHeadersType<T>[],
  setHeaders: Dispatch<SetStateAction<DataViewerTableHeadersType<T>[]>>,
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
    setHeaders,
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
  //
  const prevSizeWidth = usePrevious(viewContainerWidth);
  const prevHeaders = useRef(JSON.stringify(headersMinWidth(headers)));
  const prevExtraWidth = useRef(0);
  
  useEffect(() => {
    const width = (viewContainerWidth || 0) - SCROLL_WIDTH;
    const totalWidth = headers
      .reduce((total, { minWidth = minCellWidth, visible }) => total + (visible ? minWidth : 0), 0);
    const extra = width > totalWidth ? width - totalWidth : 0;
    if (viewContainerWidth !== prevSizeWidth || prevHeaders.current !== JSON.stringify(headersMinWidth(headers)) || extra !== prevExtraWidth.current) {
      const newHeaders = [ ...headers ];
      let accumulatedWidth = 0;
      headers.forEach(({ minWidth = minCellWidth, ...restProps }, index) => {
        if (restProps.visible) {
          const percentage = minWidth / totalWidth;
          newHeaders[index] = {
            ...restProps,
            width: Math.floor(minWidth + (extra * percentage)),
            minWidth,
            accumulatedWidth,
          };
          accumulatedWidth += newHeaders[index].width;
        }
      });
      setHeaders(newHeaders);
      prevHeaders.current = JSON.stringify(headersMinWidth(headers));
      prevExtraWidth.current = extra;
    }
  }, [ headers, prevSizeWidth, setHeaders, viewContainerWidth ]);
  
  return (
    <>
      <TableHead
        headers={headers}
        setHeaders={setHeaders}
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
          headers={headers}
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
