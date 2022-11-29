import React, { useRef, useState } from 'react';
import { classNames } from '../../../../helpers';
import { ArrowIcon, TableHeadersWithWidthType } from '../../../index';
import { TableHeadProps } from '../../types';
import { renderHead } from '../../utils';
import { Filter } from './Filter';

const fillWidth = true;

export const TableHead = <T, >({ headers, headerWidths, setHeaderWidths, rowWidth, scrollLeft, loading }: TableHeadProps<T>) => {
  
  const [dragging, setDragging] = useState({ columnIndex: '', nextColumnIndex: '' });
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
      if (headerWidths[columnIndex].width + moveX >= headerWidths[columnIndex].minWidth && headerWidths[nextColumnIndex].width - moveX >= headerWidths[nextColumnIndex].minWidth) {
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
    sort: { onSort, order = 0 } = {} as any,
    sticky,
  }: TableHeadersWithWidthType<T>, index: number) => {
    return (
      <div
        className={classNames('jk-table-head-cell', { 'with-sort': !!onSort, 'with-filter': !!filter?.onFilter, sticky: !!sticky })}
        onMouseMove={onMouseHoldMove}
        onMouseUp={onMouseHoldUp}
        key={columnIndex}
        style={{ width: width + 'px' }}
      >
        <div className="jk-table-head-field">{renderHead({ head, columnIndex })}</div>
        <div className="jk-row jk-table-head-tools">
          {onSort && (
            <div className={classNames('jk-row tool', { active: !!order, disabled: loading })} onClick={() => onSort({ columnIndex })}>
              <ArrowIcon size="small" rotate={order < 0 ? 180 : 0} />
            </div>
          )}
          {filter?.onFilter && <Filter columnIndex={columnIndex} filter={filter} disabled={loading} />}
        </div>
        {(!fillWidth || index < headers.length - 1) && (
          <div
            className="jk-table-head-drag"
            onMouseDown={onMouseHoldDown(columnIndex, headers[index + 1]?.index)}
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
            }}>
            <div />
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="jk-table-head-container jk-shadow" style={{ width: rowWidth }}>
      <div className="jk-table-head" onMouseLeave={onMouseHoldUp}>
        <div className={classNames('jk-table-head-sticky', { 'jk-shadow': !!scrollLeft })}>
          {headers.filter(({ sticky }) => sticky).map(renderHeader)}
        </div>
        {headers.filter(({ sticky }) => !sticky).map(renderHeader)}
        <div className="jk-table-head-scroll"></div>
      </div>
    </div>
  );
};