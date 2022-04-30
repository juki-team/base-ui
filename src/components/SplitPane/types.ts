import { ReactNode } from 'react';

export interface SplitPaneProps {
  direction?: 'column' | 'row',
  onChangeDirection?: (value: 'column' | 'row') => void,
  className?: string,
  children: ReactNode[],
  minSize?: number,
  onlyFirstPane?: boolean,
  onlySecondPane?: boolean,
  toggleOption?: boolean,
  closablePane?: {
    pane: 'first' | 'second',
    align: 'right' | 'center' | 'left',
    hideLabel?: ReactNode,
    expandLabel?: ReactNode
  },
}