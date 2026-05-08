import type { TimeDisplayType } from '../../../types';

export interface TimerDisplayProps {
  counter: number;
  literal?: boolean;
  inline?: boolean;
  ignoreLeadingZeros?: boolean;
  ignoreTrailingZeros?: boolean;
  maxSplit?: number;
  minSplit?: number;
  abbreviated?: boolean;
  type?: TimeDisplayType;
  className?: string;
}
