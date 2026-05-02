import type { ReactNode } from 'react';

export interface MultiProgressBarProps {
  label?: ReactNode;
  progress: { label?: string | ReactNode; percentage: number; color?: string }[];
  points?: { label?: string | ReactNode; percentage: number; color?: string }[];
  height?: number;
  className?: string;
  tooltipPlacement?: 'top' | 'bottom';
}
