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
