import type { CSSProperties } from 'react';
import type { DataViewerTableHeadersType } from '../types';

export const MIN_CELL_WIDTH = 100;

/** Widths and sticky offsets of the visible columns, by visible position. */
export interface ColumnLayout {
  widths: number[];
  lefts: number[];
  total: number;
  stickyWidth: number;
}

export const getColumnMinWidth = <T>(header: DataViewerTableHeadersType<T>) => header.minWidth || MIN_CELL_WIDTH;

// Cells read their size from CSS variables set on the table container, so a width change (container
// resize, column drag) doesn't need to re-render the rows: it only updates a few custom properties.
export const columnWidthVar = (position: number) => `var(--jk-col-w-${position})`;
export const columnLeftVar = (position: number) => `var(--jk-col-l-${position})`;
export const TABLE_WIDTH_VAR = 'var(--jk-table-w)';

const withOffsets = <T>(visibleHeaders: DataViewerTableHeadersType<T>[], widths: number[]): ColumnLayout => {
  const lefts: number[] = [];
  let total = 0;
  let stickyWidth = 0;
  widths.forEach((width, position) => {
    lefts.push(total);
    total += width;
    if (visibleHeaders[position]?.sticky) {
      stickyWidth += width;
    }
  });
  return { widths, lefts, total, stickyWidth };
};

/**
 * Same distribution as before: every visible column gets its min width plus a share of the free space
 * proportional to that min width. Columns resized by the user keep their manual width.
 */
export const computeColumnLayout = <T>(
  visibleHeaders: DataViewerTableHeadersType<T>[],
  availableWidth: number,
  manualWidths: Record<string, number>,
): ColumnLayout => {
  const totalMinWidth = visibleHeaders.reduce((sum, header) => sum + getColumnMinWidth(header), 0);
  const extra = availableWidth > totalMinWidth ? availableWidth - totalMinWidth : 0;
  const widths = visibleHeaders.map((header) => {
    const manual = manualWidths[header.index];
    if (manual !== undefined) {
      return manual;
    }
    const minWidth = getColumnMinWidth(header);
    return Math.floor(minWidth + (totalMinWidth ? extra * (minWidth / totalMinWidth) : 0));
  });
  return withOffsets(visibleHeaders, widths);
};

export const withColumnWidth = <T>(
  layout: ColumnLayout,
  visibleHeaders: DataViewerTableHeadersType<T>[],
  position: number,
  width: number,
): ColumnLayout => {
  const widths = [...layout.widths];
  widths[position] = width;
  return withOffsets(visibleHeaders, widths);
};

const toEntries = (layout: ColumnLayout): [string, string][] => [
  ['--jk-table-w', `${layout.total}px`],
  ...layout.widths.map((width, position): [string, string] => [`--jk-col-w-${position}`, `${width}px`]),
  ...layout.lefts.map((left, position): [string, string] => [`--jk-col-l-${position}`, `${left}px`]),
];

export const columnLayoutStyle = (layout: ColumnLayout): CSSProperties =>
  Object.fromEntries(toEntries(layout)) as CSSProperties;

/** Imperative update used while dragging a column border (no React render per mouse move). */
export const applyColumnLayout = (element: HTMLElement, layout: ColumnLayout) => {
  for (const [name, value] of toEntries(layout)) {
    element.style.setProperty(name, value);
  }
};
