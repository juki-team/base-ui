import type { ReactNode } from 'react';
import { DateDisplayType } from '../../../types';

export interface YearPickerProps {
  date: Date,
  onChange: (date: Date) => void,
  isDisabled?: (date: Date) => ({ year?: boolean }),
  isSelected?: (date: Date) => ({ year?: boolean }),
}

export interface MonthPickerProps {
  date: Date,
  onChange: (date: Date) => void,
  isDisabled?: (date: Date) => ({ year?: boolean, month?: boolean }),
  isSelected?: (date: Date) => ({ year?: boolean, month?: boolean }),
}

export interface DayPickerProps {
  date: Date,
  onChange: (date: Date) => void,
  isDisabled?: (date: Date) => ({ year?: boolean, month?: boolean, day?: boolean }),
  isSelected?: (date: Date) => ({ year?: boolean, month?: boolean, day?: boolean }),
}

export interface TimePickerProps {
  todayButton?: boolean,
  date: Date,
  showMinutes: boolean,
  showSeconds: boolean,
  showMilliseconds: boolean,
  onChange: (date: Date) => void,
  isDisabled?: (date: Date) => ({ hours?: boolean, minutes?: boolean, seconds?: boolean, milliseconds?: boolean }),
  // isSelected?: (date: Date) => ({ hours?: boolean, minutes?: boolean, seconds?: boolean, milliseconds?: boolean }),
}

export type DatePickerDateFunType = (date: Date) => ({
  year?: boolean,
  month?: boolean,
  day?: boolean,
  hours?: boolean,
  minutes?: boolean,
  seconds?: boolean,
  milliseconds?: boolean
});

export interface DatePickerProps {
  todayButton?: boolean,
  date?: Date,
  onChange: (date: Date) => void,
  type?: DateDisplayType,
  isDisabled?: DatePickerDateFunType,
  isSelected?: DatePickerDateFunType,
}

export interface InputDateProps {
  disabled?: boolean,
  todayButton?: boolean,
  date: Date | null,
  onDatePick: (date: Date, onClose: () => void) => void,
  onDateClean?: () => void
  inline?: boolean,
  type?: DateDisplayType,
  isDisabled?: DatePickerDateFunType,
  isSelected?: DatePickerDateFunType,
  baseDate?: Date,
  twoLines?: boolean,
  extend?: boolean,
  withDayName?: boolean,
  inputLabel?: (inputDateProps: InputDateProps, onClose: () => void) => ReactNode,
}
