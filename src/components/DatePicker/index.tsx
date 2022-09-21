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
  date = new Date(),
  isDisabled,
  isSelected,
  type = 'year-month-day-hours-minutes-seconds',
  onChange,
}: DatePickerProps) => {
  
  const { showYears, showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds } = showOfDatePickerType(type);
  
  return (
    <div className="jk-date-picker-layout jk-col">
      {showYears && !showMonths && !showDays && (
        <YearPicker date={date} onChange={onChange} isSelected={isSelected} isDisabled={isDisabled} />
      )}
      {showYears && showMonths && !showDays && (
        <MonthPicker date={date} onChange={onChange} isSelected={isSelected} isDisabled={isDisabled} />
      )}
      {showYears && showMonths && showDays && (
        <DayPicker date={date} onChange={onChange} isSelected={isSelected} isDisabled={isDisabled} />
      )}
      {showHours && (
        <>
          {showYears && <div className="jk-divider tiny" />}
          <div className={classNames('jk-row jk-date-picker-time', { 'only-time': !showYears })}>
            {showYears && <div className="label-time tx-wd-bold text-sentence-case"><T>time</T>:</div>}
            <TimePicker
              date={date}
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
