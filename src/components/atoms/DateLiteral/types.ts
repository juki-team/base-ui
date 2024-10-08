import { CSSProperties } from 'react';
import { DateDisplayType } from '../../../types';

export interface DateLiteralProps {
  date: Date,
  className?: string,
  show?: DateDisplayType,
  twoLines?: boolean,
  withDayName?: boolean,
  style?: CSSProperties,
}
