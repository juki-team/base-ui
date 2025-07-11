import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { SCROLL_WIDTH } from '../../../../constants';
import { usePrevious } from '../../../../hooks/usePrevious';
import {
  DataViewerGroupsType,
  DataViewerTableHeadersType,
  GetRecordClassNameType,
  GetRecordKeyType,
  GetRecordStyleType,
  OnRecordClickType,
} from '../types';
import { RowVirtualizerFixed } from './RowVirtualizerFixed';

const minCellWidth = 100;

const headersMinWidth = <T, >(headers: DataViewerTableHeadersType<T>[]) => {
  return headers.map(head => head.minWidth || minCellWidth);
};

interface ViewContainerRowsProps<T> {
  headers: DataViewerTableHeadersType<T>[],
  setHeaders: Dispatch<SetStateAction<DataViewerTableHeadersType<T>[]>>,
  viewContainerWidth: number,
  rowHeight: number,
  data: T[],
  loading: boolean,
  getRecordKey: GetRecordKeyType<T> | undefined,
  getRecordStyle: GetRecordStyleType<T> | undefined,
  getRecordClassName: GetRecordClassNameType<T> | undefined,
  onRecordClick: OnRecordClickType<T> | undefined,
  onRecordHover: OnRecordClickType<T> | undefined,
  onRecordRender: OnRecordClickType<T> | undefined,
  groups: DataViewerGroupsType<T>[],
  // setWithVerticalScroll: Dispatch<SetStateAction<boolean>>,
}

const gap = 4;

export const ViewContainerRows = <T, >(props: ViewContainerRowsProps<T>) => {
  
  const {
    headers,
    setHeaders,
    viewContainerWidth,
    rowHeight,
    loading,
    data,
    getRecordKey,
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    onRecordHover,
    onRecordRender,
    groups,
    // setWithVerticalScroll,
  } = props;
  
  const prevSizeWidth = usePrevious(viewContainerWidth);
  const prevHeaders = useRef(JSON.stringify(headersMinWidth(headers)));
  const prevExtraWidth = useRef(0);
  
  useEffect(() => {
    const width = (viewContainerWidth || 0) - SCROLL_WIDTH;
    const [ visibleHeaders, totalMinUsedWidth, totalUsedWidth ] = headers
      .reduce(([ visibleHeaders, totalMinUsedWidth, totalUsedWidth ], { minWidth = minCellWidth, visible, width }) => [
        visibleHeaders + (visible ? 1 : 0),
        totalMinUsedWidth + (visible ? minWidth : 0),
        totalUsedWidth + (visible ? width : 0),
      ], [ 0, 0, 0 ]);
    
    const extra = width > totalMinUsedWidth ? width - totalMinUsedWidth : 0;
    if (viewContainerWidth !== prevSizeWidth || prevHeaders.current !== JSON.stringify(headersMinWidth(headers)) || extra !== prevExtraWidth.current || (visibleHeaders ? (totalUsedWidth === 0) : false)) {
      const newHeaders = [ ...headers ];
      let accumulatedWidth = 0;
      headers.forEach(({ minWidth = minCellWidth, ...restProps }, index) => {
        if (restProps.visible) {
          const percentage = minWidth / totalMinUsedWidth;
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
    <RowVirtualizerFixed
      data={data}
      headers={headers}
      rowHeight={rowHeight}
      getRecordKey={getRecordKey}
      getRecordClassName={getRecordClassName}
      getRecordStyle={getRecordStyle}
      onRecordClick={onRecordClick}
      onRecordHover={onRecordHover}
      onRecordRender={onRecordRender}
      gap={gap}
      loading={loading}
      setHeaders={setHeaders}
      groups={groups}
      // setWithVerticalScroll={setWithVerticalScroll}
    />
  );
};
