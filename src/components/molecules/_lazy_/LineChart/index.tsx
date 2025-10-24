import { FC, lazy, Suspense } from 'react';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { SpinIcon } from '../../../atoms/server';
import type { LineChartProps } from './types';

export const LineChartImport = () => import('./LineChart');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LineChartGen = lazy(() => LineChartImport()) as FC<LineChartProps<any, any>>;

export const LineChart = <TValue extends ValueType, TName extends NameType>(props: LineChartProps<TValue, TName>) => (
  <Suspense fallback={<SpinIcon />}>
    <LineChartGen {...props} />
  </Suspense>
);
