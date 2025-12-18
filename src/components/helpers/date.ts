import { MONTH_NAMES } from '@juki-team/commons';
import { i18n } from 'i18next';
import { DateLiteralProps } from '../atoms/DateLiteral/types';
import { DateDisplayType, TimeDisplayType } from '../types';

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

export const getDateLiteral = (date: Date, show: Required<DateLiteralProps>['show'], t: i18n['t']) => {
  
  const {
    showYears,
    showMonths,
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    showMilliseconds,
  } = showOfDateDisplayType(show);
  
  return (
    // withDayName && <><T>{DAY_NAMES[date.getDay()]}</T>,&nbsp;</>}
    (showDays ? date.getDate() : '') +
    (showMonths ? ' ' + t(MONTH_NAMES[date.getMonth()] || '') : '') +
    (showYears ? ' ' + date.getFullYear() : '') +
    (showHours ? (
      ', ' + date.getHours().padStart(2) +
      (showMinutes ? ':' + date.getMinutes().padStart(2) : '') +
      (showSeconds ? ':' + date.getSeconds().padStart(2) : '') +
      (showMilliseconds ? '.' + date.getMilliseconds().padStart(3) : '')
    ) : '')
  );
};
