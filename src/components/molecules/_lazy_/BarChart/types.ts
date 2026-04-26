import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { ContentType } from 'recharts/types/component/Tooltip';
import type { Margin, TickProp, XAxisTickContentProps } from 'recharts/types/util/types';

export interface BarChartProps {
  data: { label: string; value: number; [key: string]: string | number }[];
  margin?: Margin;
  tooltipContent?: ContentType<ValueType, NameType>;
  xAxisTick?: TickProp<XAxisTickContentProps>;
}
