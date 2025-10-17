import { TimeDisplayType } from '../../types';

export interface TimerProps {
  currentTimestamp: number,
  // laps?: number,
  interval?: number,
  literal?: boolean,
  inline?: boolean,
  ignoreLeadingZeros?: boolean,
  ignoreTrailingZeros?: boolean,
  abbreviated?: boolean,
  type?: TimeDisplayType,
  pause?: boolean,
  resetTrigger?: number,
  className?: string,
  onTimeout?: () => void,
}
