import React, { useState } from 'react';
import { Div, Select, T } from '../index';
import { DAYS_2, MONTH_NAMES, YEARS } from '../../config/constants';
import { classNames } from '../../helpers';
import { NextButton, PreviousButton } from './commons';
import { DayPickerProps } from './types';

export const DayPicker = ({ baseDate, onChange, isDisabled, isSelected }: DayPickerProps) => {
  
  const [viewDate, setViewDate] = useState(baseDate);
  const gridDays: (Date[])[] = [];
  let dateCursor = new Date(viewDate.startOfMonth().startOfWeek());
  for (let i = 0; i < 6; i++) {
    gridDays.push([]);
    for (let j = 0; j < 7; j++) {
      gridDays[i].push(new Date(dateCursor));
      dateCursor = dateCursor.increaseDay();
    }
  }
  
  return (
    <>
      <div className="jk-row jk-day-picker-header">
        <Select
          options={YEARS.map(year => ({ value: year, label: year, disabled: !!(isDisabled?.(new Date().changeYear(year)).year) }))}
          optionSelected={{ value: viewDate.getFullYear(), label: viewDate.getFullYear() }}
          onChange={({ value }) => setViewDate(viewDate.changeYear(value))}
        />
        <PreviousButton onClick={() => setViewDate(viewDate.decreaseMonth())} />
        <Select
          options={MONTH_NAMES.map((month, index) => ({
            value: index,
            label: <T>{month}</T>,
            disabled: !!(isDisabled?.(viewDate.changeMonth(index)).month),
          }))}
          optionSelected={{ value: viewDate.getMonth(), label: <T>{MONTH_NAMES[viewDate.getMonth()]}</T> }}
          onChange={({ value }) => setViewDate(viewDate.changeMonth(value))}
        />
        <NextButton onClick={() => setViewDate(viewDate.increaseMonth())} />
      </div>
      <div className="jk-row jk-date-picker-days text-semi-bold">
        {DAYS_2.map(day => (
          <div className="day" key={day}>
            <div><T>{day}</T></div>
          </div>
        ))}
      </div>
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
                    onChange(baseDate.changeYear(date.getFullYear())
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
};