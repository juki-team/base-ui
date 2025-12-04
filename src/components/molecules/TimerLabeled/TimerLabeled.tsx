import { useEffect, useState } from 'react';
import { Period } from '../../../enums';
import { T } from '../../atoms';
import { classNames, cutTimeSplit } from '../../helpers';
import { Timer } from '../Timer/Timer';
import type { TimerLabeledProps } from './types';

const DEFAULT_LABELS: { [key in Period]: string } = {
  [Period.FUTURE]: 'stars in',
  [Period.LIVE_START]: 'starts ago',
  [Period.LIVE_END]: 'ends in',
  [Period.PAST]: 'ended ago',
  [Period.TIME_OUT]: 'time out',
  [Period.CALC]: '...',
};

export function TimerLabeled(props: TimerLabeledProps) {
  
  const {
    startDate,
    endDate,
    currentDate,
    labels,
    type = 'hours-minutes-seconds',
    literal,
    inline,
    abbreviated,
    ignoreLeadingZeros,
    ignoreTrailingZeros,
    maxSplit = 6,
    minSplit = 1,
  } = props;
  
  const [ time, setTime ] = useState({ period: Period.CALC, remaining: 0, interval: 0 });
  
  useEffect(() => {
    const current: Date = currentDate || new Date();
    let period = Period.CALC;
    let remaining = 0;
    let interval = 0;
    if (startDate < current && current < endDate) {
      period = Period.LIVE_END;
      remaining = endDate.getTime() - current.getTime();
      interval = -1;
    } else if (endDate < current && current < startDate) {
      period = Period.LIVE_START;
      remaining = current.getTime() - endDate.getTime();
      interval = 1;
    } else if (current < startDate) {
      period = Period.FUTURE;
      remaining = startDate.getTime() - current.getTime();
      interval = -1;
    } else if (current > endDate) {
      period = Period.PAST;
      remaining = current.getTime() - endDate.getTime();
      interval = 1;
    }
    setTime({ period, remaining, interval });
    const timeout = setTimeout(() => {
      if (period === Period.LIVE_START || period === Period.LIVE_END || period === Period.FUTURE) {
        setTime({
          period: Period.TIME_OUT,
          remaining: 0,
          interval: 0,
        });
      }
    }, remaining);
    return () => {
      clearTimeout(timeout);
    };
  }, [ currentDate, endDate, startDate ]);
  
  const myLabels = { ...DEFAULT_LABELS, ...labels };
  const timeSplit = cutTimeSplit(Math.max(time.remaining, 0), type, false, false, maxSplit, minSplit);
  const timeInterval = Math.max(timeSplit[timeSplit.length - 1]?.milliseconds ?? 0, 1);
  
  return (
    <div
      className={classNames(`jk-timer-labeled-container period-${time.period.toLowerCase()}`, {
        'jk-row center gap': !!literal,
        'jk-col': !literal,
      })}
    >
      <div className="fw-bd">
        <T className="tt-se">{myLabels[time.period]}</T>
      </div>
      <Timer
        type={type}
        remaining={time.remaining}
        interval={time.interval * timeInterval}
        literal={literal}
        inline={inline}
        abbreviated={abbreviated}
        ignoreLeadingZeros={ignoreLeadingZeros}
        ignoreTrailingZeros={ignoreTrailingZeros}
        maxSplit={maxSplit}
      />
    </div>
  );
}
