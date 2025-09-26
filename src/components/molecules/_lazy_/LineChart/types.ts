import { ReactElement, SVGProps } from 'react';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';
import { AxisInterval, Margin } from 'recharts/types/util/types';

export interface LineChartProps<TValue extends ValueType, TName extends NameType> {
  data: { label: string, value: number, [key: string]: any }[],
  margin?: Margin,
  
  containerHeight?: number,
  containerOnResize?: (width: number, height: number) => void;
  
  tooltipContent?: ContentType<TValue, TName>,
  tooltipActive?: boolean,
  
  xAxisTick?: SVGProps<SVGTextElement> | ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean,
  xAxisInterval?: AxisInterval,
  xTickCount?: number,
  
  yAxisTick?: SVGProps<SVGTextElement> | ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean,
  yAxisInterval?: AxisInterval,
  yTickCount?: number,
  
  lineDataKeys?: string | string[],
}
