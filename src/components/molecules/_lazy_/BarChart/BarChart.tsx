import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { BarChartProps } from './types';

export default function BarChart<TValue extends ValueType, TName extends NameType>(props: BarChartProps<TValue, TName>) {
  
  const { data, margin, tooltipContent, xAxisTick } = props;
  
  return (
    <ResponsiveContainer minHeight={256}>
      <RechartsBarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={xAxisTick} includeHidden interval={0} />
        <YAxis interval={0} />
        <Tooltip content={tooltipContent} />
        <Bar dataKey="value" fill="var(--t-color-primary-light)" minPointSize={4} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
