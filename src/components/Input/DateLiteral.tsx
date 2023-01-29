import { DAY_NAMES, MONTH_NAMES } from '@juki-team/commons';
import React from 'react';
import { classNames } from '../../helpers';
import { showOfDatePickerType } from '../DatePicker';
import { T } from '../Translate';
import { DateLiteralProps } from './types';

export const DateLiteral = ({
  date,
  className,
  show = 'year-month-day-hours-minutes-seconds',
  twoLines,
  withDayName,
}: DateLiteralProps) => {
  
  const { showYears, showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds } = showOfDatePickerType(show);
  
  return (
    <div className={classNames('date-literal jk-border-radius-inline', {
      'jk-row gap nowrap center': !twoLines,
      'jk-col nowrap': !!twoLines,
    }, className)}>
      <div>
        {withDayName && <><T>{DAY_NAMES[date.getDay()]}</T>,&nbsp;</>}
        {showDays && <>{date.getDate()}&nbsp;</>}
        {showMonths && <><T>{MONTH_NAMES[date.getMonth()]}</T>&nbsp;</>}
        {showYears && date.getFullYear()}
      </div>
      {showHours && (
        <div className="cr-g3">
          {date.getHours().padStart(2)}
          {showMinutes && <>&nbsp;:&nbsp;{date.getMinutes().padStart(2)}</>}
          {showSeconds && <>&nbsp;:&nbsp;{date.getSeconds().padStart(2)}</>}
          {showMilliseconds && <>&nbsp;.&nbsp;{date.getMilliseconds().padStart(3)}</>}
        </div>
      )}
    </div>
  );
};
