import { FC, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { BarChartProps } from './types';

export const BarChartImport = () => import('./BarChart');

const BarChartCmp = lazy(() => BarChartImport()) as FC<BarChartProps>;

export const BarChart = (props: BarChartProps) => (
  <Suspense fallback={<SpinIcon />}>
    <BarChartCmp {...props} />
  </Suspense>
);
