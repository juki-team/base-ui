import { FC, lazy, Suspense } from 'react';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { SpinIcon } from '../../../atoms/server';
import type { BarChartProps } from './types';

export const BarChartImport = () => import('./BarChart');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarChartCmp = lazy(() => BarChartImport()) as FC<BarChartProps<any, any>>;

export const BarChart = <TValue extends ValueType, TName extends NameType>(props: BarChartProps<TValue, TName>) => (
  <Suspense fallback={<SpinIcon />}>
    <BarChartCmp {...props} />
  </Suspense>
);
