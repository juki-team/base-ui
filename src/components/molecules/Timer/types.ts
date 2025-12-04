import { TimeDisplayType } from '../../types';

export interface TimerProps {
  remaining: number,
  // laps?: number,
  interval: number,
  literal?: boolean,
  inline?: boolean,
  ignoreLeadingZeros?: boolean,
  ignoreTrailingZeros?: boolean,
  maxSplit?: number,
  abbreviated?: boolean,
  type?: TimeDisplayType,
  resetTrigger?: number,
  className?: string,
  onTimeout?: () => void,
  timerKey?: string,
}

export interface TimerDisplayProps {
  counter: number,
  literal?: boolean,
  inline?: boolean,
  ignoreLeadingZeros?: boolean,
  ignoreTrailingZeros?: boolean,
  maxSplit?: number,
  minSplit?: number,
  abbreviated?: boolean,
  type?: TimeDisplayType,
  className?: string,
}
