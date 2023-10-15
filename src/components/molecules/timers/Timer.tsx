import React, { Fragment, useEffect, useState } from 'react';
import { classNames } from '../../../helpers';
import { useInterval } from '../../../hooks';
import { T } from '../../atoms';
import { TimerProps } from './types';
import { cutTimeSplit } from './utils';

export const Timer = React.memo((props: TimerProps) => {
  
  const {
    currentTimestamp,
    laps = 3,
    interval = 1,
    literal,
    ignoreLeadingZeros = false,
    ignoreTrailingZeros = false,
  } = props;
  
  const [ counter, setCounter ] = useState({ remaining: currentTimestamp, startTimestamp: 0 });
  
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
  }, [ interval, currentTimestamp ]);
  
  useInterval(() => {
    const startTimestamp = Date.now();
    setCounter(prevState => ({
      startTimestamp,
      remaining: prevState.remaining - (interval < 0 ? startTimestamp - prevState.startTimestamp : prevState.startTimestamp - startTimestamp),
    }));
  }, Math.abs(interval));
  
  const timeSplit = cutTimeSplit(counter.remaining, laps, ignoreLeadingZeros, ignoreTrailingZeros);
  
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
            <div className="content-number tx-s fw-bd jk-row">{remaining.remaining}</div>
            <div className="content-label tx-t fw-bd tt-ue jk-row"><T>{remaining.label}</T></div>
          </div>
          {(index !== timeSplit.length - 1) && <span className="content-dots tx-l fw-bd">:</span>}
        </Fragment>
      ))}
    </div>
  );
});
