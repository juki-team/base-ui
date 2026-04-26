import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { ContentType } from 'recharts/types/component/Tooltip';
import type { AxisInterval, Margin, TickProp, XAxisTickContentProps, YAxisTickContentProps } from 'recharts/types/util/types';

export interface LineChartProps {
  data: { label: string; value: number; [key: string]: string | number }[];
  margin?: Margin;

  containerHeight?: number;
  containerOnResize?: (width: number, height: number) => void;

  tooltipContent?: ContentType<ValueType, NameType>;
  tooltipActive?: boolean;

  xAxisTick?: TickProp<XAxisTickContentProps>;
  xAxisInterval?: AxisInterval;
  xTickCount?: number;

  yAxisTick?: TickProp<YAxisTickContentProps>;
  yAxisInterval?: AxisInterval;
  yTickCount?: number;

  lineDataKeys?: string | string[];
}
