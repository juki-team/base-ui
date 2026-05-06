import type { CSSProperties } from 'react';
import type { DateDisplayType } from '../../../types';

export interface DateLiteralProps {
  date: Date;
  className?: string;
  show?: DateDisplayType;
  twoLines?: boolean;
  withDayName?: boolean;
  style?: CSSProperties;
}
