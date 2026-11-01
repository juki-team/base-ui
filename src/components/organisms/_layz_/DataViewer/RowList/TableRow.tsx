import { motion } from 'motion/react';
import { type CSSProperties, type Key, memo, type ReactElement } from 'react';
import { classNames } from '../../../../helpers';
import type { DataViewerTableHeadersType, GetRecordClassNameType, GetRecordStyleType, OnRecordClickType } from '../types';

interface TableRowProps<T> {
  data: T[];
  index: number;
  rowKey: Key;
  start: number;
  size: number;
  gap: number;
  width: number;
  columns: DataViewerTableHeadersType<T>[];
  rightBorders: Set<number>;
  getRecordStyle?: GetRecordStyleType<T>;
  getRecordClassName?: GetRecordClassNameType<T>;
  onRecordClick?: OnRecordClickType<T>;
  onRecordHover?: OnRecordClickType<T>;
  /** animate position changes (reorders) with motion; only meaningful with stable record keys */
  animate: boolean;
}

function TableRowCmp<T>(props: TableRowProps<T>) {
  const {
    data,
    index,
    rowKey,
    start,
    size,
    gap,
    width,
    columns,
    rightBorders,
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    onRecordHover,
    animate,
  } = props;

  const record = data[index];
  const style: CSSProperties = {
    ...(getRecordStyle?.({ data, index, isCard: false, isStickySection: false }) || {}),
    position: 'absolute',
    top: start + gap,
    left: 0,
    width,
    height: `${size - gap * 2}px`,
  };
  const className = classNames(
    'jk-table-row',
    getRecordClassName?.({ data, index, isCard: false, isStickySection: true }) || '',
  );
  const onClick = onRecordClick ? () => onRecordClick({ data, index, isCard: false }) : undefined;
  const onMouseEnter = onRecordHover ? () => onRecordHover({ data, index, isCard: false }) : undefined;

  const cells = columns.map(({ Field, index: columnIndex, width, sticky, accumulatedWidth }, position) => (
    <div
      key={columnIndex}
      style={{ width, minWidth: width, left: sticky ? accumulatedWidth : undefined }}
      className={classNames(
        { sticky: !!sticky, 'with-right-border': rightBorders.has(position) },
        'jk-table-row-field bc-sf-md',
      )}
      data-testid={rowKey + '_' + columnIndex}
    >
      {record && <Field record={record} columnIndex={columnIndex} recordIndex={index} isCard={false} />}
    </div>
  ));

  if (!animate) {
    return (
      // eslint-disable-next-line react/no-unknown-property -- same attribute the motion row renders
      <div jk-data-virtual-row-key={rowKey} style={style} className={className} onClick={onClick} onMouseEnter={onMouseEnter}>
        {cells}
      </div>
    );
  }

  return (
    <motion.div
      jk-data-virtual-row-key={rowKey}
      layoutId={String(rowKey)}
      // Measure layout only when the data changes (that's when rows move). Without it motion measures every
      // row of the group on each render, and the virtualizer re-renders on every scroll frame.
      layoutDependency={data}
      style={style}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {cells}
    </motion.div>
  );
}

// Memoized: while scrolling only the rows entering the viewport render; the rest keep their output.
export const TableRow = memo(TableRowCmp) as <T>(props: TableRowProps<T>) => ReactElement;
