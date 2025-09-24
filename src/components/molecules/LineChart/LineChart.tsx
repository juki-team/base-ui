import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { LineChartProps } from './types';

export const LineChart = <TValue extends ValueType, TName extends NameType>(props: LineChartProps<TValue, TName>) => {
  
  const {
    data,
    margin,
    containerHeight = 256,
    containerOnResize,
    tooltipContent,
    tooltipActive,
    xAxisTick,
    xAxisInterval = 0,
    xTickCount,
    yAxisTick,
    yAxisInterval = 0,
    yTickCount,
    lineDataKeys = 'value',
  } = props;
  
  return (
    <ResponsiveContainer height={containerHeight} onResize={containerOnResize}>
      <RechartsLineChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={xAxisTick} includeHidden interval={xAxisInterval} tickCount={xTickCount} />
        <YAxis tick={yAxisTick} interval={yAxisInterval} tickCount={yTickCount} />
        <Tooltip content={tooltipContent} active={tooltipActive} />
        {(Array.isArray(lineDataKeys) ? lineDataKeys : [ lineDataKeys ]).map(key => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke="var(--t-color-primary-light)"
            dot={false}
            strokeWidth={2}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
