import { Period } from '../../../types';

export interface TimerLabeledProps {
  startDate: Date,
  endDate: Date,
  currentDate?: Date,
  labels?: { [key in Period]?: string },
  laps?: number,
  literal?: boolean,
}

export interface TimerProps {
  currentTimestamp: number,
  laps?: number,
  interval?: number,
  literal?: boolean,
  ignoreLeadingZeros?: boolean,
  ignoreTrailingZeros?: boolean,
}
