import { FC, lazy } from 'react';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { LineChartProps } from './types';

export const LineChartImport = () => import('./LineChart');

const LineChartGen = lazy(() => LineChartImport()) as FC<LineChartProps<any, any>>;

export const LineChart =
  <TValue extends ValueType, TName extends NameType>(props: LineChartProps<TValue, TName>) =>
    <LineChartGen {...props} />;
