import { useCallback, useEffect } from 'react';
import { useTimerStore } from './useTimerStore';

export const useTimer = (key: string, initialInterval: number, onTimeout?: () => void) => {
  const remaining = useTimerStore((state) => state.timers[key]?.remaining ?? 0);
  const counter = useTimerStore((state) => state.timers[key]?.counter ?? 0);
  const nowRef = useTimerStore((state) => state.timers[key]?.nowRef ?? 0);
  const interval = useTimerStore((state) => state.timers[key]?.interval ?? 0);
  
  const setTimer = useTimerStore((state) => state.setTimer);
  const startTimer = useTimerStore((state) => state.startTimer);
  const pauseTimer = useTimerStore((state) => state.pauseTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const clearTimer = useTimerStore((state) => state.clearTimer);
  
  const clear = useCallback(() => {
    clearTimer(key);
  }, [ key, clearTimer ]);
  
  const reset = useCallback(() => {
    resetTimer(key);
  }, [ key, resetTimer ]);
  
  const start = useCallback(() => {
    startTimer(key, Math.abs(initialInterval));
  }, [ key, initialInterval, startTimer ]);
  
  const pause = useCallback(() => {
    pauseTimer(key);
  }, [ key, pauseTimer ]);
  const isRunning = nowRef !== 0 && interval !== 0;
  useEffect(() => {
    if (initialInterval < 0 && isRunning && remaining - counter <= 0) {
      onTimeout?.();
      clearTimer(key);
    }
  }, [ initialInterval, counter, onTimeout, remaining, clearTimer, key, isRunning ]);
  
  const setCountdownFrom = useCallback((remaining: number) => {
    setTimer(key, { remaining });
  }, [ key, setTimer ]);
  
  return {
    counter: initialInterval < 0 ? remaining - counter : remaining + counter,
    currentCounter: counter,
    countdownFrom: remaining,
    setCountdownFrom,
    isStopped: nowRef === 0,
    isPaused: interval === 0,
    isRunning,
    clear,
    reset,
    start,
    pause,
  };
};
