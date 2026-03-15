import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { BarChartProps } from './types';

export default function BarChart(props: BarChartProps) {
  
  const { data, margin, tooltipContent, xAxisTick } = props;
  
  return (
    <ResponsiveContainer minHeight={256}>
      <RechartsBarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={xAxisTick} includeHidden interval={0} />
        <YAxis interval={0} />
        <Tooltip content={tooltipContent} />
        <Bar dataKey="value" fill="var(--cr-tx-ht-lt)" minPointSize={4} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
