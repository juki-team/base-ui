import React, { Children, useCallback, useRef, useState } from 'react';
import { classNames } from '../../../../../helpers';
import { ArrowIcon } from '../../../../atoms';
import { TableHeadersWithWidthType, TableHeadProps } from '../../types';
import { renderHead } from '../../utils';
import { Filter } from './Filter';

const fillWidth = true;

interface RenderHeaderProps<T> {
  head: TableHeadersWithWidthType<T>,
  index: number,
  onMouseHoldMove: (event: React.MouseEvent<HTMLDivElement>) => void,
  onMouseHoldUp: () => void,
  onMouseHoldDown: (columnIndex: string, nextColumnIndex?: string) => (event: React.MouseEvent<HTMLDivElement>) => void,
  loading: boolean,
  headers: TableHeadersWithWidthType<T>[],
}

const RenderHeader = <T, >(props: RenderHeaderProps<T>) => {
  
  const {
    head: {
      index: columnIndex,
      head,
      width,
      filter,
      sort: { onSort, order = 0 } = {} as { onSort: () => void, order: number },
      sticky,
    },
    index,
    onMouseHoldMove,
    onMouseHoldUp,
    onMouseHoldDown,
    loading,
    headers,
  } = props;
  
  return (
    <div
      className={classNames('jk-row nowrap jk-table-head-cell', {
        'with-sort': !!onSort,
        'with-filter': !!filter?.onFilter,
        sticky: !!sticky,
      })}
      onMouseMove={onMouseHoldMove}
      onMouseUp={onMouseHoldUp}
      key={columnIndex}
      style={{ width: width + 'px' }}
    >
      <div className="jk-table-head-field">{renderHead({ head, columnIndex })}</div>
      <div className="jk-row jk-table-head-tools">
        {onSort && (
          <div
            className={classNames('jk-button-light only-icon small tool', {
              active: !!order,
              disabled: loading,
            })}
            onClick={() => onSort({ columnIndex })}
          >
            <ArrowIcon size="small" rotate={order < 0 ? 180 : 0} />
          </div>
        )}
        {filter?.onFilter && (
          <Filter columnIndex={columnIndex} filter={filter} disabled={loading} />
        )}
      </div>
      {(!fillWidth || index < headers.length - 1) && (
        <div
          className="jk-table-head-drag"
          onMouseDown={onMouseHoldDown(columnIndex, headers[index + 1]?.index)}
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

export const TableHead = <T, >(props: TableHeadProps<T>) => {
  
  const { headers, headerWidths, setHeaderWidths, scrollLeft, scrollTop, loading } = props;
  
  const [ dragging, setDragging ] = useState({ columnIndex: '', nextColumnIndex: '' });
  
  const dividerPositionRef = useRef(0);
  
  const onMouseHoldDown = useCallback((columnIndex: string, nextColumnIndex?: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging({ columnIndex, nextColumnIndex: nextColumnIndex || '' });
    dividerPositionRef.current = event.clientX;
  }, []);
  
  const onMouseHoldUp = useCallback(() => {
    if (dragging.columnIndex) {
      setDragging({ columnIndex: '', nextColumnIndex: '' });
    }
    dividerPositionRef.current = 0;
  }, [ dragging.columnIndex ]);
  
  const onMouseHoldMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { columnIndex, nextColumnIndex } = dragging;
    if (!dividerPositionRef.current) {
      return;
    }
    const moveX = event.clientX - (dividerPositionRef.current || 0);
    dividerPositionRef.current = event.clientX;
    if (fillWidth && headerWidths[nextColumnIndex]) {
      if (headerWidths[columnIndex].width + moveX >= headerWidths[columnIndex].minWidth
        && headerWidths[nextColumnIndex].width - moveX >= headerWidths[nextColumnIndex].minWidth) {
        const newHeaderWidths = {
          ...headerWidths,
          [columnIndex]: {
            ...headerWidths[columnIndex],
            width: Math.max(headerWidths[columnIndex].width + moveX, headerWidths[columnIndex].minWidth),
          },
        };
        newHeaderWidths[nextColumnIndex] = {
          ...headerWidths[nextColumnIndex],
          width: Math.max(headerWidths[nextColumnIndex].width - moveX, headerWidths[nextColumnIndex].minWidth),
        };
        setHeaderWidths(newHeaderWidths);
      }
    } else {
      const newHeaderWidths = {
        ...headerWidths,
        [columnIndex]: {
          ...headerWidths[columnIndex],
          width: Math.max(headerWidths[columnIndex].width + moveX, headerWidths[columnIndex].minWidth),
        },
      };
      setHeaderWidths(newHeaderWidths);
    }
  };
  
  const headersSticky = headers.filter(({ sticky }) => sticky);
  const headersNoSticky = headers.filter(({ sticky }) => !sticky);
  
  return (
    <div className={classNames('jk-table-head-container', { withVerticalScroll: !!scrollTop })}>
      <div className="jk-table-head" onMouseLeave={onMouseHoldUp}>
        <div className={classNames('jk-table-head-sticky', { 'elevation-1': !!scrollLeft })}>
          {Children.toArray(headersSticky.map((head, index) => (
            <RenderHeader
              head={head}
              index={index}
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
          {Children.toArray(headersNoSticky.map((head, index) => (
            <RenderHeader
              head={head}
              index={index}
              onMouseHoldMove={onMouseHoldMove}
              onMouseHoldUp={onMouseHoldUp}
              onMouseHoldDown={onMouseHoldDown}
              loading={loading}
              headers={headersNoSticky}
            />
          )))}
        </div>
      </div>
    </div>
  );
};
