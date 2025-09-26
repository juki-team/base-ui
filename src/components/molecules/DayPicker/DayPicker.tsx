import { MONTH_NAMES, YEARS } from '@juki-team/commons';
import { useState } from 'react';
import { DAYS_2 } from '../../../constants';
import { classNames } from '../../helpers';
import { Div, Select, T } from '../../atoms';
import type { DayPickerProps } from '../DatePicker/types';
import { NextButton } from '../NextButton/NextButton';
import { PreviousButton } from '../PreviousButton/PreviousButton';

export function DayPicker({ date, onChange, isDisabled, isSelected }: DayPickerProps) {
  
  const [ viewDate, setViewDate ] = useState(date);
  const gridDays: (Date[])[] = [];
  let dateCursor = new Date(viewDate.startOfMonth().startOfWeek());
  for (let i = 0; i < 6; i++) {
    gridDays.push([]);
    for (let j = 0; j < 7; j++) {
      gridDays[i]!.push(new Date(dateCursor));
      dateCursor = dateCursor.increaseDay();
    }
  }
  
  return (
    <>
      <div className="jk-row jk-day-picker-header">
        <Select
          options={YEARS.map(year => ({
            value: year,
            label: year,
            disabled: !!(isDisabled?.(new Date().changeYear(year)).year),
          }))}
          selectedOption={{ value: viewDate.getFullYear(), label: viewDate.getFullYear() }}
          onChange={({ value }) => setViewDate(viewDate.changeYear(value))}
        />
        <PreviousButton onClick={() => setViewDate(viewDate.decreaseMonth())} />
        <Select
          options={MONTH_NAMES.map((month, index) => ({
            value: index,
            label: <T>{month}</T>,
            disabled: !!(isDisabled?.(viewDate.changeMonth(index)).month),
          }))}
          selectedOption={{
            value: viewDate.getMonth(),
            label: <T>{MONTH_NAMES[viewDate.getMonth()] ?? viewDate.getMonth().toString()}</T>,
          }}
          onChange={({ value }) => setViewDate(viewDate.changeMonth(value))}
        />
        <NextButton onClick={() => setViewDate(viewDate.increaseMonth())} />
      </div>
      <div className="jk-row jk-date-picker-days fw-bd">
        {DAYS_2.map(day => (
          <div className="day" key={day}>
            <div><T>{day}</T></div>
          </div>
        ))}
      </div>
      <div className="jk-divider tiny" style={{ marginBottom: -6 }} />
      <div className="jk-date-picker-grid-dates">
        {gridDays.map((row, index) => (
          <div className="jk-row" key={index}>
            {row.map(date => {
              const disabled = !!isDisabled?.(date).day;
              const selected = !!isSelected?.(date).day;
              return (
                <Div
                  className={classNames('date jk-row', {
                    disabled,
                    selected,
                    'is-next-month': date.getMonth() > viewDate.getMonth(),
                    'is-previous-month': date.getMonth() < viewDate.getMonth(),
                  })}
                  key={date.getTime()}
                  onClick={() => !disabled &&
                    onChange(date.changeYear(date.getFullYear())
                      .changeMonth(date.getMonth())
                      .changeDay(date.getDate()))
                  }
                  onKeyDownClick
                >
                  <div>{date.getDate()}</div>
                </Div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
