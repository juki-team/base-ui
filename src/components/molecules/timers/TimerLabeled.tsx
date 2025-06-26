import React, { useEffect, useState } from 'react';
import { classNames } from '../../../helpers';
import { Period } from '../../../types';
import { T } from '../../atoms';
import { Timer } from './Timer';
import { TimerLabeledProps } from './types';
import { cutTimeSplit } from './utils';

const DEFAULT_LABELS: { [key in Period]: string } = {
  [Period.FUTURE]: 'stars in',
  [Period.LIVE_START]: 'starts ago',
  [Period.LIVE_END]: 'ends in',
  [Period.PAST]: 'ended ago',
  [Period.TIME_OUT]: 'time out',
  [Period.CALC]: '...',
};

const MAX_LAPS = 6;

export const TimerLabeled = ({
                               startDate,
                               endDate,
                               currentDate,
                               labels,
                               laps: _laps = 3,
                               literal,
                             }: TimerLabeledProps) => {
  
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
  
  const laps = Math.min(Math.max(0, _laps), MAX_LAPS);
  const myLabels = { ...DEFAULT_LABELS, ...labels };
  const timeSplit = cutTimeSplit(Math.max(time.remaining, 0), laps, false, false);
  const timeInterval = Math.max(timeSplit[timeSplit.length - 1].milliseconds, 1);
  
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
      <Timer laps={laps} currentTimestamp={time.remaining} interval={time.interval * timeInterval} literal={literal} />
    </div>
  );
};
