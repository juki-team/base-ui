import type { DateDisplayType, TimeDisplayType } from '../types';

export const showOfDateDisplayType = (type: DateDisplayType) => {
  const showMilliseconds = type.includes('milliseconds');
  const showSeconds = type.includes('seconds');
  const showMinutes = type.includes('minutes');
  const showHours = type.includes('hours');
  const showDays = type.includes('day');
  const showMonths = type.includes('month');
  const showYears = type.includes('year');
  return { showYears, showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds };
};

export const showOfTimeDisplayType = (type: TimeDisplayType) => {
  const showWeeks = type.includes('weeks');
  const showDays = type.includes('days');
  const showHours = type.includes('hours');
  const showMinutes = type.includes('minutes');
  const showSeconds = type.includes('seconds');
  const showMilliseconds = type.includes('milliseconds');
  return { showWeeks, showDays, showHours, showMinutes, showSeconds, showMilliseconds };
};
