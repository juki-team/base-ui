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
  ignoreLeadingZeros?: boolean,
  ignoreTrailingZeros?: boolean,
  maxSplit?: number,
}
