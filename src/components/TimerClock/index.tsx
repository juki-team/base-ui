import { splitTime } from '@juki-team/commons';
import React, { Fragment, useEffect, useState } from 'react';
import { useInterval } from '../../hooks';
import { T } from '../Translate';
import { Period, TimerClockProps } from './types';

const DEFAULT_LABELS: { [key in Period]: string } = {
  [Period.FUTURE]: 'stars in',
  [Period.LIVE]: 'ends in',
  [Period.PAST]: 'ended ago',
  [Period.CALC]: '...',
};

export const TimerClock = React.memo(({ startDate, endDate, currentDate, onFinish, labels, laps = 3 }: TimerClockProps) => {
    
    const [time, setTime] = useState<{ counting: number, remaining: number, period: Period }>({
      counting: 0,
      remaining: 0,
      period: Period.CALC,
    });
    const myLabels = { ...DEFAULT_LABELS, ...labels };
    useEffect(() => {
      const now = new Date();
      const period = (currentDate || now) < startDate ? Period.FUTURE : ((currentDate || now) > endDate ? Period.PAST : Period.LIVE);
      const remaining = Math.abs(new Date(period === Period.FUTURE ? startDate : endDate).getTime() - new Date(currentDate || now).getTime());
      const slack = remaining % 1000;
      const startCounting = setTimeout(() => {
        setTime({
          counting: period === Period.PAST ? 1000 : -1000,
          remaining,
          period,
        });
      }, slack);
      return () => {
        clearTimeout(startCounting);
      };
    }, [startDate, endDate, currentDate]);
    
    useEffect(() => {
      if (time.remaining < 0) {
        onFinish?.();
        setTime({
          counting: 0,
          remaining: 0,
          period: Period.CALC,
        });
      }
    }, [onFinish, time.remaining]);
    
    useInterval(() => {
      setTime(prevState => ({ ...prevState, remaining: prevState.remaining + time.counting }));
    }, Math.abs(time.counting));
    
    return (
      <div className="layout-timer-clock">
        <div className="label-period text-s text-bold">
          <T>{myLabels[time.period]}</T>
        </div>
        <div className="content-time jk-child-center">
          {splitTime(Math.max(time.remaining, 0)).slice(0, laps).map((remaining, index) => (
            <Fragment key={remaining.label}>
              <div className="content-stamp">
                <div className="content-number text-s text-semi-bold">{remaining.remaining}</div>
                <div className="content-label text-t text-semi-bold"><T>{remaining.label}</T></div>
              </div>
              {(index !== laps - 1) && <span className="content-dots text-l text-semi-bold">:</span>}
            </Fragment>
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
);

export * from './types';
