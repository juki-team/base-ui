import React from 'react';
import { classNames } from '../../helpers';
import { T } from '../index';
import { DatePickerProps } from '../Input';
import { DayPicker } from './DayPicker';
import { MonthPicker } from './MonthPicker';
import { TimePicker } from './TimerPicker';
import { showOfDatePickerType } from './utils';
import { YearPicker } from './YearPicker';

export const DatePicker = ({
  baseDate = new Date(),
  isDisabled,
  isSelected,
  type = 'year-month-day-hours-minutes-seconds',
  onChange,
}: DatePickerProps) => {
  
  const { showYears, showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds } = showOfDatePickerType(type);
  
  return (
    <div className="jk-date-picker-layout jk-col">
      {showYears && !showMonths && !showDays && (
        <YearPicker baseDate={baseDate} onChange={onChange} isSelected={isSelected} isDisabled={isDisabled} />
      )}
      {showYears && showMonths && !showDays && (
        <MonthPicker baseDate={baseDate} onChange={onChange} isSelected={isSelected} isDisabled={isDisabled} />
      )}
      {showYears && showMonths && showDays && (
        <DayPicker baseDate={baseDate} onChange={onChange} isSelected={isSelected} isDisabled={isDisabled} />
      )}
      {showHours && (
        <>
          {showYears && <div className="jk-divider tiny" />}
          <div className={classNames('jk-row jk-date-picker-time', { 'only-time': !showYears })}>
            {showYears && <div className="label-time tx-wd-bold text-sentence-case"><T>time</T>:</div>}
            <TimePicker
              baseDate={baseDate}
              onChange={onChange}
              showMinutes={showMinutes}
              showSeconds={showSeconds}
              showMilliseconds={showMilliseconds}
              // isSelected={isSelected}
              isDisabled={isDisabled}
            />
          </div>
        </>
      )}
    </div>
  );
};

export * from './DayPicker';
export * from './MonthPicker';
export * from './TimerPicker';
export * from './YearPicker';
export * from './types';
export * from './utils';
