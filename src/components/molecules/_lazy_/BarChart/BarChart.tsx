import { Bar, CartesianGrid, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { BarChartProps } from './types';

// biome-ignore lint/style/noDefaultExport: lazy component
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
