import { Fragment } from 'react';
import { T } from '../../atoms';
import { classNames, cutTimeSplit } from '../../helpers';
import { TimerDisplayProps } from './types';

export function TimerDisplay(props: TimerDisplayProps) {
  
  const {
    counter,
    inline,
    literal,
    ignoreLeadingZeros = false,
    ignoreTrailingZeros = false,
    maxSplit = 6,
    minSplit = 1,
    abbreviated = false,
    type = 'hours-minutes-seconds',
    className,
  } = props;
  
  const timeSplit = cutTimeSplit(counter, type, ignoreLeadingZeros, ignoreTrailingZeros, maxSplit, minSplit);
  
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
}
