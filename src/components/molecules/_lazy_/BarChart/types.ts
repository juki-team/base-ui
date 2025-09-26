import { ReactElement, SVGProps } from 'react';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';
import { Margin } from 'recharts/types/util/types';

export interface BarChartProps<TValue extends ValueType, TName extends NameType> {
  data: { label: string, value: number, [key: string]: any }[],
  margin?: Margin,
  tooltipContent?: ContentType<TValue, TName>,
  xAxisTick?: SVGProps<SVGTextElement> | ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean,
}
