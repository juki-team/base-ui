import { ReactNode } from 'react';

export interface CircularProgressProps {
  progress: number,
  size?: number,
}

export interface MultiProgressBarProps {
  label?: ReactNode,
  progress: { label?: string | ReactNode, percentage: number, color?: string }[],
  points?: { label?: string | ReactNode, percentage: number, color?: string }[],
}
