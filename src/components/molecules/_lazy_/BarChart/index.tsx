import { FC, lazy } from 'react';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { BarChartProps } from './types';

export const BarChartImport = () => import('./BarChart');

const BarChartGen = lazy(() => BarChartImport()) as FC<BarChartProps<any, any>>;

export const BarChart =
  <TValue extends ValueType, TName extends NameType>(props: BarChartProps<TValue, TName>) => <BarChartGen {...props} />;
