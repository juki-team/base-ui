import { ReactNode } from 'react';

export interface VirtualizedRowsFixedProps {
  rowHeight: number,
  size: number,
  renderRow: (index: number) => ReactNode,
  classNameContainer?: string,
  classNameRows?: string
  classNameRow?: string,
  getRowKey?: (index: number) => string,
}
