import { memo, type MouseEvent, type ReactElement } from 'react';
import { classNames } from '../../../../../helpers';
import { ArrowDownwardIcon, ArrowUpwardIcon, SortIcon } from '../../../../../server';
import { renderHead } from '../../commons/utils';
import type { DataViewerTableHeadersType, TableHeadProps, TableSortType } from '../../types';
import { columnLeftVar, columnWidthVar, TABLE_WIDTH_VAR } from '../columnLayout';
import { Filter } from './Filter';

interface RenderHeaderProps<T> {
  header: DataViewerTableHeadersType<T>;
  /** CSS width (a column variable or a calc() of several for group headers) */
  width: string;
  /** CSS sticky offset */
  left: string;
  /** visible position of the column, used to start a resize */
  position: number;
  onResizeStart?: (position: number, clientX: number) => void;
  loading: boolean;
  withTools: boolean;
  withRightBorder: boolean;
  borderTopLeftRadius?: boolean;
  borderTopRightRadius?: boolean;
  borderBottomLeftRadius?: boolean;
  borderBottomRightRadius?: boolean;
}

const RenderHeader = <T,>(props: RenderHeaderProps<T>) => {
  const {
    header,
    width,
    left,
    position,
    onResizeStart,
    loading,
    withTools,
    withRightBorder,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = props;

  const { index: columnIndex, filter, sort, sticky, headClassName } = header;
  const { onSort, getOrder } = sort || ({} as TableSortType);
  const order = getOrder?.();

  return (
    <div
      style={{
        width,
        minWidth: width,
        left: sticky ? left : undefined,
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
        style={{ width, ...header.style }}
      >
        <div className="jk-table-head-field flex-1 ht-100">{renderHead({ header, columnIndex, className: headClassName })}</div>
        {withTools && (
          <div className="jk-row jk-table-head-tools">
            {sort && (
              <div
                className={classNames('tool jk-row jk-br-ie', {
                  'bc-at-lt cr-at-it active': !!order,
                  'cr-hd': !order,
                })}
                onClick={() => onSort({ columnIndex })}
              >
                {order ? (
                  order > 0 ? (
                    <ArrowUpwardIcon size="small" />
                  ) : (
                    <ArrowDownwardIcon size="small" />
                  )
                ) : (
                  <SortIcon up down size="small" />
                )}
              </div>
            )}
            {filter?.onFilter && <Filter columnIndex={columnIndex} filter={filter} disabled={loading} />}
          </div>
        )}
        {withTools && onResizeStart && (
          <div
            className="jk-table-head-drag"
            onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
              event.preventDefault(); // no text selection while dragging
              onResizeStart(position, event.clientX);
            }}
            onClick={(event) => {
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

const TableHeadCmp = <T,>(props: TableHeadProps<T>) => {
  const { columns, topHeaders, rightBorders, loading, gap, hasScrollTop, onResizeStart } = props;

  const displayTopHeader = !!rightBorders.length;

  return (
    <div className="jk-table-head-container" style={{ paddingBottom: gap }}>
      {displayTopHeader && (
        <div className={classNames('jk-table-head', { 'elevation-1': hasScrollTop })} style={{ width: TABLE_WIDTH_VAR }}>
          {topHeaders.map(({ header, positions }, index) => (
            <RenderHeader<T>
              key={header.headIndex}
              header={header}
              width={
                positions.length === 1
                  ? columnWidthVar(positions[0]!)
                  : `calc(${positions.map(columnWidthVar).join(' + ')})`
              }
              left={columnLeftVar(positions[0]!)}
              position={positions[0]!}
              loading={loading}
              withTools={false}
              withRightBorder={!(header.head === '' && topHeaders[index + 1]?.header.head === '') && index !== topHeaders.length - 1}
              borderTopLeftRadius={index === 0}
              borderTopRightRadius={index === topHeaders.length - 1}
            />
          ))}
        </div>
      )}
      <div className={classNames('jk-table-head jk-br-ie', { 'elevation-1': hasScrollTop })} style={{ width: TABLE_WIDTH_VAR }}>
        {columns.map((header, position) => (
          <RenderHeader<T>
            key={header.headIndex}
            header={header}
            width={columnWidthVar(position)}
            left={columnLeftVar(position)}
            position={position}
            onResizeStart={onResizeStart}
            loading={loading}
            withTools
            withRightBorder={false}
            borderTopLeftRadius={!displayTopHeader && position === 0}
            borderTopRightRadius={!displayTopHeader && position === topHeaders.length - 1}
            borderBottomLeftRadius={position === 0}
            borderBottomRightRadius={position === columns.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

// Memoized: column sizes come from CSS variables, so resizing/scrolling doesn't re-render the head.
export const TableHead = memo(TableHeadCmp) as <T>(props: TableHeadProps<T>) => ReactElement;
