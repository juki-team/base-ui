import { CSSProperties, ReactNode } from 'react';

export interface SplitPaneProps {
  direction?: 'column' | 'row',
  onChangeDirection?: (value: 'column' | 'row') => void,
  className?: string,
  children: ReactNode[],
  minSize?: number,
  onlyFirstPane?: boolean,
  onlySecondPane?: boolean,
  toggleable?: boolean,
  closableFirstPane?: {
    align: 'right' | 'center' | 'left',
    hideLabel?: ReactNode,
    expandLabel?: ReactNode
  },
  closableSecondPane?: {
    align: 'right' | 'center' | 'left',
    hideLabel?: ReactNode,
    expandLabel?: ReactNode
  },
  onePanelAtATime?: boolean,
  style?: CSSProperties,
}
