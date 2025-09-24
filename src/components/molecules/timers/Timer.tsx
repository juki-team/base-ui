import { Fragment, memo, useEffect, useState } from 'react';
import { classNames } from '../../../helpers';
import { useInterval } from '../../hooks';
import { T } from '../../atoms';
import { TimerProps } from './types';
import { cutTimeSplit } from './utils';

export const Timer = memo((props: TimerProps) => {
  
  const {
    currentTimestamp,
    interval = 1,
    inline,
    literal,
    ignoreLeadingZeros = false,
    ignoreTrailingZeros = false,
    abbreviated = false,
    type = 'hours-minutes-seconds',
    pause,
    resetTrigger,
    className,
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
  }, [ interval, currentTimestamp, resetTrigger ]);
  
  useInterval(() => {
    const startTimestamp = Date.now();
    setCounter(prevState => ({
      startTimestamp,
      remaining: pause ? prevState.remaining : prevState.remaining - (interval < 0 ? startTimestamp - prevState.startTimestamp : prevState.startTimestamp - startTimestamp),
    }));
  }, Math.abs(interval));
  
  const timeSplit = cutTimeSplit(counter.remaining, type, ignoreLeadingZeros, ignoreTrailingZeros);
  
  return (
    <div className={classNames('jk-timer-layout jk-row nowrap', className, { literal: !!literal, inline: !!inline })}>
      {literal ? timeSplit.map((remaining, index) => (
        <Fragment key={remaining.label + index}>
          {(index > 0) && <T>and</T>}
          <span>{remaining.remaining}</span>
          <T>{abbreviated ? remaining.abbreviatedLabel : remaining.label}</T>
        </Fragment>
      )) : inline ? timeSplit.map((remaining, index) => (
        <div key={remaining.label + index}>
          <span className="ff-me">{remaining.remaining.padStart(remaining.digits, '0')}</span>
          {(index !== timeSplit.length - 1 && [ 'h', 'm' ].includes(remaining.abbreviatedLabel)) && (
            <span className="fw-bd">:</span>
          )}
          {(index !== timeSplit.length - 1 && [ 's' ].includes(remaining.abbreviatedLabel)) && (
            <span className="fw-bd">.</span>
          )}
          {[ 'w', 'd' ].includes(remaining.abbreviatedLabel) && (
            <><T>{abbreviated ? remaining.abbreviatedLabel : remaining.label}</T>&nbsp;</>
          )}
        </div>
      )) : timeSplit.map((remaining, index) => (
        <Fragment key={remaining.label + index}>
          <div className="content-stamp">
            <div className="jk-row ff-me">{remaining.remaining.padStart(remaining.digits, '0')}</div>
            <div className="content-label jk-row">
              <T className="tt-se">{abbreviated ? remaining.abbreviatedLabel : remaining.label}</T></div>
          </div>
          {(index !== timeSplit.length - 1) && <span className="fw-bd">:</span>}
        </Fragment>
      ))}
    </div>
  );
});
