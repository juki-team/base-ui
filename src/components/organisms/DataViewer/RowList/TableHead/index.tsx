import { Children, memo, MouseEvent, ReactElement, useCallback, useRef, useState } from 'react';
import { classNames } from '../../../../../helpers';
import { ArrowDownwardIcon, ArrowUpwardIcon, SortIcon } from '../../../../server';
import { fixHeaders, renderHead } from '../../commons/utils';
import { DataViewerTableHeadersType, TableHeadProps, TableSortType } from '../../types';
import { Filter } from './Filter';

const fillWidth = true;

interface RenderHeaderProps<T> {
  header: DataViewerTableHeadersType<T>,
  onMouseHoldMove: (event: MouseEvent<HTMLDivElement>) => void,
  onMouseHoldUp: () => void,
  onMouseHoldDown: (index: number) => (event: MouseEvent<HTMLDivElement>) => void,
  loading: boolean,
  headers: DataViewerTableHeadersType<T>[],
  withTools: boolean,
  withRightBorder: boolean,
  borderTopLeftRadius?: boolean,
  borderTopRightRadius?: boolean,
  borderBottomLeftRadius?: boolean,
  borderBottomRightRadius?: boolean,
}

const RenderHeader = <T, >(props: RenderHeaderProps<T>) => {
  
  const {
    header,
    onMouseHoldUp,
    onMouseHoldDown,
    loading,
    headers,
    withTools,
    withRightBorder,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = props;
  
  const {
    index: columnIndex,
    width,
    filter,
    sort,
    sticky,
    headClassName,
    headIndex,
    accumulatedWidth,
  } = header;
  const { onSort, getOrder } = sort || {} as TableSortType;
  const order = getOrder?.();
  
  return (
    <div
      key={columnIndex + '_head'}
      style={{
        width: width,
        minWidth: width,
        left: sticky ? accumulatedWidth : undefined,
        top: 0,
        zIndex: sticky ? 3 : 2,
        borderTopLeftRadius: borderTopLeftRadius ? 'var(--border-radius-inline)' : undefined,
        borderTopRightRadius: borderTopRightRadius ? 'var(--border-radius-inline)' : undefined,
        borderBottomLeftRadius: borderBottomLeftRadius ? 'var(--border-radius-inline)' : undefined,
        borderBottomRightRadius: borderBottomRightRadius ? 'var(--border-radius-inline)' : undefined,
      }}
      className={classNames({ 'with-right-border': withRightBorder }, 'sticky jk-table-row-head')}
      data-testid={columnIndex + '_head'}
    >
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
        <div className="jk-table-head-field flex-1 ht-100">
          {renderHead({ header, columnIndex, className: headClassName })}
        </div>
        {withTools && (
          <div className="jk-row jk-table-head-tools">
            {sort && (
              <div
                className={classNames('tool jk-row jk-br-ie', {
                  'cr-we bc-pl active': !!order,
                  'cr-hd': !order,
                })}
                onClick={() => onSort({ columnIndex })}
              >
                
                {order
                  ? order > 0 ? <ArrowUpwardIcon size="small" /> : <ArrowDownwardIcon size="small" />
                  : <SortIcon up down size="small" />}
              </div>
            )}
            {filter?.onFilter && (
              <Filter columnIndex={columnIndex} filter={filter} disabled={loading} />
            )}
          </div>
        )}
        {withTools && (!fillWidth || headIndex < headers.length) && (
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
    </div>
  );
};

const TableHeadCmp = <T, >(props: TableHeadProps<T>) => {
  
  const { headers, setHeaders, loading, gap, headerRef, topHeaders, rightBorders, hasScrollTop } = props;
  
  const [ dragging, setDragging ] = useState(-1);
  
  const dividerPositionRef = useRef(0);
  
  const onMouseHoldDown = useCallback((columnIndex: number) => (event: MouseEvent<HTMLDivElement>) => {
    setDragging(columnIndex);
    dividerPositionRef.current = event.clientX;
  }, []);
  
  const onMouseHoldUp = useCallback(() => {
    setDragging(-1);
    dividerPositionRef.current = 0;
  }, []);
  
  const onMouseHoldMove = (event: MouseEvent<HTMLDivElement>) => {
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
    if (newHeaders[columnIndex]) {
      newHeaders[columnIndex] = {
        ...newHeaders[columnIndex],
        width: Math.max(newHeaders[columnIndex].width + moveX, newHeaders[columnIndex].minWidth),
      };
      setHeaders(fixHeaders(newHeaders));
    }
    // }
  };
  
  const displayTopHeader = !!rightBorders.length;
  const headersWidth = headers.reduce((sum, head) => sum + (head.visible?.getVisible?.() ? head.width : 0), 0);
  
  return (
    <div
      className="jk-table-head-container"
      ref={headerRef}
      onMouseMove={onMouseHoldMove}
      style={{ paddingBottom: gap }}
    >
      {displayTopHeader && (
        <div
          className={classNames('jk-table-head', { 'elevation-1': hasScrollTop })}
          style={{ width: headersWidth }}
        >
          {Children.toArray(
            topHeaders
              .map((header, index) => (
                <RenderHeader
                  key={header.headIndex}
                  header={header}
                  onMouseHoldMove={onMouseHoldMove}
                  onMouseHoldUp={onMouseHoldUp}
                  onMouseHoldDown={onMouseHoldDown}
                  loading={loading}
                  headers={headers}
                  withTools={false}
                  withRightBorder={!(header.head === '' && topHeaders[index + 1]?.head === '') && index !== topHeaders.length - 1}
                  borderTopLeftRadius={index === 0}
                  borderTopRightRadius={index === topHeaders.length - 1}
                />
              )),
          )}
        </div>
      )}
      <div
        className={classNames('jk-table-head jk-br-ie', { 'elevation-1': hasScrollTop })}
        onMouseLeave={onMouseHoldUp}
        style={{ width: headersWidth }}
      >
        {Children.toArray(
          headers
            .filter(({ visible }) => visible?.getVisible?.())
            .map((header, index, data) => (
              <RenderHeader
                key={header.headIndex}
                header={header}
                onMouseHoldMove={onMouseHoldMove}
                onMouseHoldUp={onMouseHoldUp}
                onMouseHoldDown={onMouseHoldDown}
                loading={loading}
                headers={headers}
                withTools
                withRightBorder={false}
                // withRightBorder={rightBorders.includes(index) && index !== data.length - 1}
                borderTopLeftRadius={!displayTopHeader && index === 0}
                borderTopRightRadius={!displayTopHeader && index === topHeaders.length - 1}
                borderBottomLeftRadius={index === 0}
                borderBottomRightRadius={index === data.length - 1}
              />
            )),
        )}
      </div>
    </div>
  );
};

export const TableHead = memo(TableHeadCmp) as <T>(props: TableHeadProps<T>) => ReactElement;
