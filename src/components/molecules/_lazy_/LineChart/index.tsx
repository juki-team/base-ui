import { FC, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { LineChartProps } from './types';

export const LineChartImport = () => import('./LineChart');

const LineChartGen = lazy(() => LineChartImport()) as FC<LineChartProps>;

export const LineChart = (props: LineChartProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LineChartGen {...props} />
  </Suspense>
);
