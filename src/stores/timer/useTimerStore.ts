import { ONE_SECOND } from '@juki-team/commons';
import { create } from 'zustand';

type TimerInternal = {
  nowRef: number,
  counter: number,
  accumulated: number,
  remaining: number,
  interval: number,
  intervalRef?: ReturnType<typeof setInterval>,
  tickInterval: number,
};

interface TimerStore {
  timers: Record<string, TimerInternal>,
  setTimer: (key: string, timer: Partial<TimerInternal>) => void,
  startTimer: (key: string, interval: number) => void,
  pauseTimer: (key: string) => void,
  resetTimer: (key: string) => void,
  clearTimer: (key: string) => void,
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  timers: {},
  
  setTimer: (key, timer) => {
    const timers = { ...get().timers };
    timers[key] = {
      nowRef: timer?.nowRef ?? timers[key]?.nowRef ?? 0,
      counter: timer?.counter ?? timers[key]?.counter ?? 0,
      accumulated: timer?.accumulated ?? timers[key]?.accumulated ?? 0,
      remaining: timer?.remaining ?? timers[key]?.remaining ?? 0,
      interval: timer?.interval ?? timers[key]?.interval ?? 0,
      intervalRef: timer?.intervalRef ?? timers[key]?.intervalRef ?? undefined,
      tickInterval: timer?.tickInterval ?? timers[key]?.tickInterval ?? 0,
    };
    set({ timers });
  },
  
  clearTimer: (key) => {
    const currentTimers = { ...get().timers };
    const timer = currentTimers[key];
    if (timer?.intervalRef) {
      clearInterval(timer.intervalRef);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...timers } = currentTimers;
    
    set({ timers });
  },
  
  resetTimer: (key) => {
    const timers = { ...get().timers };
    const timer = timers[key];
    if (timer?.intervalRef) {
      clearInterval(timer.intervalRef);
    }
    
    timers[key] = {
      nowRef: 0,
      counter: 0,
      accumulated: 0,
      remaining: timer?.remaining ?? 0,
      interval: 0,
      intervalRef: undefined,
      tickInterval: timer?.tickInterval ?? 0,
    };
    
    set({ timers });
  },
  
  startTimer: (key, interval) => {
    const { timers } = get();
    const previousTimer = timers[key];
    
    if (previousTimer?.intervalRef) {
      clearInterval(previousTimer.intervalRef);
    }
    
    const baseTimer: TimerInternal = {
      nowRef: Date.now(),
      counter: previousTimer?.counter ?? 0,
      accumulated: previousTimer?.accumulated ?? 0,
      remaining: previousTimer?.remaining ?? 0,
      interval,
      intervalRef: undefined,
      tickInterval: Math.max(Math.min(interval / 10, ONE_SECOND), 10),
    };
    
    const intervalRef = setInterval(() => {
      set((state) => {
        const currentTimer = {
          nowRef: state.timers[key]?.nowRef ?? baseTimer.nowRef,
          counter: state.timers[key]?.counter ?? baseTimer.counter,
          accumulated: state.timers[key]?.accumulated ?? baseTimer.accumulated,
          remaining: state.timers[key]?.remaining ?? baseTimer.remaining,
          interval: state.timers[key]?.interval ?? baseTimer.interval,
          intervalRef: state.timers[key]?.intervalRef ?? baseTimer.intervalRef,
          tickInterval: state.timers[key]?.tickInterval ?? baseTimer.tickInterval,
        };
        const currentCounter = currentTimer.accumulated + (Date.now() - currentTimer.nowRef);
        
        if (
          Math.floor(currentTimer.counter / interval) === Math.floor(currentCounter / currentTimer.interval) &&
          Math.floor((currentTimer.remaining - currentTimer.counter) / interval) === Math.floor((currentTimer.remaining - currentCounter) / currentTimer.interval)
        ) {
          return state;
        }
        
        return {
          timers: {
            ...state.timers,
            [key]: {
              ...currentTimer,
              counter: currentCounter,
            },
          },
        };
      });
    }, baseTimer.tickInterval);
    
    set((state) => ({
      timers: {
        ...state.timers,
        [key]: {
          ...baseTimer,
          intervalRef,
        },
      },
    }));
  },
  
  pauseTimer: (key) => {
    set((state) => {
      const t = state.timers[key];
      if (!t) return state;
      
      if (t.intervalRef) {
        clearInterval(t.intervalRef);
      }
      
      const now = Date.now();
      const elapsedSinceLastStart = now - t.nowRef;
      const accumulated = t.accumulated + elapsedSinceLastStart;
      
      return {
        timers: {
          ...state.timers,
          [key]: {
            ...t,
            nowRef: now,
            accumulated,
            interval: 0,
            intervalRef: undefined,
          },
        },
      };
    });
  },
}));
