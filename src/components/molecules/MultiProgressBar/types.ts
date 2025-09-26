import { ReactNode } from 'react';

export interface CircularProgressProps {
  progress: number,
  size?: number,
}

export interface MultiProgressBarProps {
  label?: ReactNode,
  progress: { label?: string, percentage: number, color?: string }[];
}
