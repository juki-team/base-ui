import React, { Children, ReactElement, Ref, useCallback, useRef, useState } from 'react';
import { classNames } from '../../../../../helpers';
import { ArrowIcon, SortIcon } from '../../../../atoms';
import { DataViewerTableHeadersType, TableHeadProps, TableSortType } from '../../types';
import { fixHeaders, renderHead } from '../../utils';
import { Filter } from './Filter';

const fillWidth = true;

interface RenderHeaderProps<T> {
  head: DataViewerTableHeadersType<T>,
  onMouseHoldMove: (event: React.MouseEvent<HTMLDivElement>) => void,
  onMouseHoldUp: () => void,
  onMouseHoldDown: (index: number) => (event: React.MouseEvent<HTMLDivElement>) => void,
  loading: boolean,
  headers: DataViewerTableHeadersType<T>[],
}

const RenderHeader = <T, >(props: RenderHeaderProps<T>) => {
  
  const {
    head: {
      index: columnIndex,
      head,
      width,
      filter,
      sort,
      sticky,
      headClassName,
      headIndex,
    },
    onMouseHoldUp,
    onMouseHoldDown,
    loading,
    headers,
  } = props;
  
  const { onSort, getOrder } = sort || {} as TableSortType;
  const order = getOrder?.();
  
  return (
    <div
      className={classNames('jk-row nowrap jk-table-head-cell jk-pg-sm', {
        'with-sort': !!sort,
        'with-filter': !!filter?.onFilter,
        sticky: !!sticky,
      })}
      onMouseUp={onMouseHoldUp}
      key={columnIndex}
      style={{ width: width + 'px' }}
    >
      <div className="jk-table-head-field">
        {renderHead({ head, columnIndex, className: headClassName })}
      </div>
      <div className="jk-row jk-table-head-tools">
        {sort && (
          <div
            className={classNames('tool jk-row jk-br-ie', {
              'cr-we bc-pl active': !!order,
              'cr-hd bc-hl': !order,
            })}
            onClick={() => onSort({ columnIndex })}
          >
            {order
              ? <ArrowIcon size="small" rotate={order < 0 ? 180 : 0} />
              : <SortIcon up down size="small" />}
          </div>
        )}
        {filter?.onFilter && (
          <Filter columnIndex={columnIndex} filter={filter} disabled={loading} />
        )}
      </div>
      {(!fillWidth || headIndex < headers.length) && (
        <div
          className="jk-table-head-drag"
          onMouseDown={onMouseHoldDown(headIndex)}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div />
        </div>
      )}
    </div>
  );
};

const TableHeadCmp = <T, >(props: TableHeadProps<T>, ref: Ref<HTMLDivElement>) => {
  
  const { headers, setHeaders, scrollLeft, loading, borderTop, gap } = props;
  
  const [ dragging, setDragging ] = useState(-1);
  
  const dividerPositionRef = useRef(0);
  
  const onMouseHoldDown = useCallback((columnIndex: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging(columnIndex);
    dividerPositionRef.current = event.clientX;
  }, []);
  
  const onMouseHoldUp = useCallback(() => {
    setDragging(-1);
    dividerPositionRef.current = 0;
  }, []);
  
  const onMouseHoldMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const columnIndex = dragging;
    // const nextColumnIndex = columnIndex + 1;
    if (!dividerPositionRef.current || columnIndex === -1) {
      return;
    }
    const moveX = event.clientX - (dividerPositionRef.current || 0);
    dividerPositionRef.current = event.clientX;
    // if (fillWidth && headers[nextColumnIndex]) {
    //   if (headers[columnIndex].width + moveX >= headers[columnIndex].minWidth
    //     && headers[nextColumnIndex].width - moveX >= headers[nextColumnIndex].minWidth) {
    //     console.log('enter 1', { columnIndex, moveX });
    //     const newHeaders = [ ...headers ];
    //     newHeaders[columnIndex] = {
    //       ...newHeaders[columnIndex],
    //       width: Math.max(newHeaders[columnIndex].width + moveX, newHeaders[columnIndex].minWidth),
    //     };
    //     newHeaders[nextColumnIndex] = {
    //       ...newHeaders[nextColumnIndex],
    //       width: Math.max(newHeaders[nextColumnIndex].width - moveX, newHeaders[nextColumnIndex].minWidth),
    //     };
    //     setHeaders(newHeaders);
    //   }
    // } else {
    const newHeaders = [ ...headers ];
    newHeaders[columnIndex] = {
      ...newHeaders[columnIndex],
      width: Math.max(newHeaders[columnIndex].width + moveX, newHeaders[columnIndex].minWidth),
    };
    setHeaders(fixHeaders(newHeaders));
    // }
  };
  
  const headersSticky = scrollLeft ? headers.filter(({ sticky, visible }) => sticky && visible) : [];
  const headersNoSticky = scrollLeft
    ? headers.filter(({ sticky, visible }) => !sticky && visible)
    : headers.filter(({ sticky, visible }) => visible);
  
  return (
    <div
      className={classNames('jk-table-head-container', { withVerticalScroll: borderTop })}
      ref={ref}
      onMouseMove={onMouseHoldMove}
      style={{ paddingBottom: gap }}
    >
      <div className="jk-table-head" onMouseLeave={onMouseHoldUp}>
        <div className={classNames('jk-table-head-sticky', { 'elevation-1': !!scrollLeft })}>
          {Children.toArray(headersSticky.map(head => (
            <RenderHeader
              key={head.headIndex}
              head={head}
              onMouseHoldMove={onMouseHoldMove}
              onMouseHoldUp={onMouseHoldUp}
              onMouseHoldDown={onMouseHoldDown}
              loading={loading}
              headers={headers}
            />
          )))}
        </div>
        <div
          className="jk-table-head-no-sticky"
          style={{
            marginLeft: -scrollLeft,
            minWidth: headersNoSticky.reduce((sum, head) => sum + head.width, 0),
          }}
        >
          {Children.toArray(headersNoSticky.map(head => (
            <RenderHeader
              key={head.headIndex}
              head={head}
              onMouseHoldMove={onMouseHoldMove}
              onMouseHoldUp={onMouseHoldUp}
              onMouseHoldDown={onMouseHoldDown}
              loading={loading}
              headers={headers}
            />
          )))}
        </div>
      </div>
    </div>
  );
};

export const TableHead = React.forwardRef(TableHeadCmp) as
  <T>(p: TableHeadProps<T> & { ref?: Ref<HTMLDivElement> }) => ReactElement;
