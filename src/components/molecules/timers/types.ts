import { Period } from '../../../enums';
import { TimeDisplayType } from '../../types';

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
