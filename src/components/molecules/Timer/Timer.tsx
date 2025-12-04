import { useEffect, useId } from 'react';
import { useTimer } from '../../../stores/timer/useTimer';
import { TimerDisplay } from './TimerDisplay';
import type { TimerProps } from './types';

export function Timer(props: TimerProps) {
  
  const {
    remaining,
    interval,
    resetTrigger,
    timerKey,
    onTimeout,
    ...restProps
  } = props;
  
  const timerKeyId = useId();
  const { counter, start, clear, reset, setCountdownFrom } = useTimer(timerKey || timerKeyId, interval, onTimeout);
  
  useEffect(() => {
    setCountdownFrom(remaining);
  }, [ remaining, setCountdownFrom ]);
  useEffect(() => {
    reset();
    start();
  }, [ reset, start, resetTrigger ]);
  useEffect(() => {
    return () => {
      clear();
    };
  }, [ clear ]);
  
  return <TimerDisplay {...restProps} counter={counter} />;
}
