import React, { useRef, useState } from 'react';
import { classNames } from '../../../../helpers';
import { ArrowIcon, TableHeadersWithWidthType } from '../../../index';
import { TableHeadProps } from '../../types';
import { renderHead } from '../../utils';
import { Filter } from './Filter';

const fillWidth = true;

export const TableHead = <T, >({
  headers,
  headerWidths,
  setHeaderWidths,
  scrollLeft,
  loading,
}: TableHeadProps<T>) => {
  
  const [ dragging, setDragging ] = useState({ columnIndex: '', nextColumnIndex: '' });
  const dividerPositionRef = useRef(0);
  const onMouseHoldDown = (columnIndex: string, nextColumnIndex?: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging({ columnIndex, nextColumnIndex: nextColumnIndex || '' });
    dividerPositionRef.current = event.clientX;
  };
  const onMouseHoldUp = () => {
    if (dragging.columnIndex) {
      setDragging({ columnIndex: '', nextColumnIndex: '' });
    }
    dividerPositionRef.current = 0;
  };
  
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
  const renderHeader = ({
    index: columnIndex,
    head,
    width,
    filter,
    sort: { onSort, order = 0, online } = {} as any,
    sticky,
  }: TableHeadersWithWidthType<T>, index: number) => {
    return (
      <div
        className={classNames('jk-table-head-cell', {
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
              className={classNames('jk-row tool', { active: !!order, disabled: loading && online })}
              onClick={() => onSort({ columnIndex })}
            >
              <ArrowIcon size="small" rotate={order < 0 ? 180 : 0} className="clickable jk-br-ie" />
            </div>
          )}
          {filter?.onFilter && (
            <Filter columnIndex={columnIndex} filter={filter} disabled={loading && filter.online} />
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
  
  const headersSticky = headers.filter(({ sticky }) => sticky);
  const headersNoSticky = headers.filter(({ sticky }) => !sticky);
  
  return (
    <div className="jk-table-head-container">
      <div className="jk-table-head" onMouseLeave={onMouseHoldUp}>
        <div className={classNames('jk-table-head-sticky', { 'elevation-1': !!scrollLeft })}>
          {headersSticky.map(renderHeader)}
        </div>
        <div
          className="jk-table-head-no-sticky"
          style={{
            marginLeft: -scrollLeft,
            minWidth: headersNoSticky.reduce((sum, head) => sum + head.width, 0),
          }}
        >
          {headersNoSticky.map(renderHeader)}
        </div>
      </div>
    </div>
  );
};
