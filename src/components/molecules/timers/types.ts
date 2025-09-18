import { Period } from '../../../types';

export type TimeDisplayType =
  'weeks'
  | 'weeks-days'
  | 'weeks-days-hours'
  | 'weeks-days-hours-minutes'
  | 'weeks-days-hours-minutes-seconds'
  | 'weeks-days-hours-minutes-seconds-milliseconds'
  | 'days'
  | 'days-hours'
  | 'days-hours-minutes'
  | 'days-hours-minutes-seconds'
  | 'days-hours-minutes-seconds-milliseconds'
  | 'hours'
  | 'hours-minutes'
  | 'hours-minutes-seconds'
  | 'hours-minutes-seconds-milliseconds'
  | 'minutes'
  | 'minutes-seconds'
  | 'minutes-seconds-milliseconds'
  | 'seconds'
  | 'seconds-milliseconds'
  | 'milliseconds';

export interface TimerLabeledProps {
  startDate: Date,
  endDate: Date,
  currentDate?: Date,
  labels?: { [key in Period]?: string },
  // laps?: number,
  literal?: boolean,
  inline?: boolean,
  abbreviated?: boolean,
  type?: TimeDisplayType,
}

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
}
