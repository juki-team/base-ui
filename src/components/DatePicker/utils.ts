import { DatePickerType } from '../Input';

export const showOfDatePickerType = (type: DatePickerType) => {
  const showMilliseconds = type.includes('milliseconds');
  const showSeconds = type.includes('seconds');
  const showMinutes = type.includes('minutes');
  const showHours = type.includes('hours');
  const showDays = type.includes('day');
  const showMonths = type.includes('month');
  const showYears = type.includes('year');
  return { showYears, showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds };
};