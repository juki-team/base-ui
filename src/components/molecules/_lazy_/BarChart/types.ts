import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { ContentType } from 'recharts/types/component/Tooltip';
import type { Margin } from 'recharts/types/util/types';

export interface BarChartProps {
  data: { label: string, value: number, [key: string]: any }[],
  margin?: Margin,
  tooltipContent?: ContentType<ValueType, NameType>,
  xAxisTick?: any,
}
