import { splitTime } from '@juki-team/commons';
import React, { Fragment, useEffect, useState } from 'react';
import { classNames } from '../../helpers';
import { useInterval } from '../../hooks';
import { T } from '../Translate';
import { Period, TimerLabeledProps, TimerProps } from './types';

const DEFAULT_LABELS: { [key in Period]: string } = {
  [Period.FUTURE]: 'stars in',
  [Period.LIVE_START]: 'starts ago',
  [Period.LIVE_END]: 'ends in',
  [Period.PAST]: 'ended ago',
  [Period.TIME_OUT]: 'time out',
  [Period.CALC]: '...',
};

export const Timer = React.memo(({ currentTimestamp, laps = 3, interval = 1, literal }: TimerProps) => {
  
  const [counter, setCounter] = useState({ remaining: currentTimestamp, startTimestamp: 0 });
  
  useEffect(() => {
    const slack = currentTimestamp % Math.abs(interval);
    const startCounting = setTimeout(() => {
      setCounter({
        remaining: currentTimestamp,
        startTimestamp: Date.now(),
      });
    }, slack);
    return () => {
      clearTimeout(startCounting);
    };
  }, [interval, currentTimestamp]);
  
  useInterval(() => {
    const startTimestamp = Date.now();
    setCounter(prevState => ({
      startTimestamp,
      remaining: prevState.remaining - (interval < 0 ? startTimestamp - prevState.startTimestamp : prevState.startTimestamp - startTimestamp),
    }));
  }, Math.abs(interval));
  
  let timeSplit = splitTime(Math.max(counter.remaining, 0));
  while (timeSplit[0].remaining <= 0 && timeSplit.length > laps) {
    timeSplit.shift();
  }
  timeSplit = timeSplit.splice(0, laps);
  
  return (
    <div className={classNames('jk-timer-layout jk-row nowrap', { literal: !!literal })}>
      {literal ? timeSplit.map((remaining, index) => (
        <Fragment key={remaining.label}>
          {(index > 0) && <T>and</T>}
          <span>{remaining.remaining}</span>
          <T>{remaining.label}</T>
        </Fragment>
      )) : timeSplit.map((remaining, index) => (
        <Fragment key={remaining.label}>
          <div className="content-stamp">
            <div className="content-number text-s text-semi-bold jk-row">{remaining.remaining}</div>
            <div className="content-label text-t text-semi-bold text-uppercase jk-row"><T>{remaining.label}</T></div>
          </div>
          {(index !== timeSplit.length - 1) && <span className="content-dots text-l text-semi-bold">:</span>}
        </Fragment>
      ))}
    </div>
  );
});

export const TimerLabeled = ({ startDate, endDate, currentDate, labels, laps: _laps = 3 }: TimerLabeledProps) => {
  
  const [time, setTime] = useState({ period: Period.CALC, remaining: 0, interval: 0 });
  
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
  }, [currentDate, endDate, startDate]);
  
  const laps = Math.min(Math.max(0, _laps), 7);
  const myLabels = { ...DEFAULT_LABELS, ...labels };
  const timeSplit = splitTime(Math.max(time.remaining, 0)).slice(0, laps);
  const timeInterval = Math.max(timeSplit[timeSplit.length - 1].milliseconds, 1);
  
  return (
    <div className="layout-timer-clock">
      <div className="label-period text-s text-semi-bold">
        <T>{myLabels[time.period]}</T>
      </div>
      <Timer laps={laps} currentTimestamp={time.remaining} interval={time.interval * timeInterval} />
    </div>
  );
};

export * from './types';
