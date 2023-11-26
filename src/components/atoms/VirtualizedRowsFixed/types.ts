import { VirtualItem } from '@tanstack/react-virtual';
import { ReactNode } from 'react';

export interface VirtualizedRowsFixedProps {
  rowHeight: number,
  size: number,
  renderRow: (virtualItem: VirtualItem) => ReactNode,
  classNameContainer?: string,
  classNameRows?: string
  classNameRow?: string,
  getRowKey?: (virtualItem: VirtualItem) => string,
}
