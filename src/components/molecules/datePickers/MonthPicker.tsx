import { MONTH_NAMES, YEARS } from '@juki-team/commons';
import { useState } from 'react';
import { classNames } from '../../../helpers';
import { Div, Select, T } from '../../atoms';
import { NextButton, PreviousButton } from './commons';
import { MonthPickerProps } from './types';

export const MonthPicker = ({ date, onChange, isDisabled, isSelected }: MonthPickerProps) => {
  
  const [ viewDate, setViewDate ] = useState(date);
  
  const gridMonths: (Date[])[] = [];
  let dateCursor = new Date(viewDate.startOfYear());
  for (let i = 0; i < 4; i++) {
    gridMonths.push([]);
    for (let j = 0; j < 3; j++) {
      gridMonths[i]!.push(new Date(dateCursor));
      dateCursor = dateCursor.increaseMonth();
    }
  }
  
  return (
    <>
      <div className="jk-row jk-month-picker-header">
        <PreviousButton onClick={() => setViewDate(viewDate.decreaseYear())} />
        <Select
          options={YEARS.map(year => ({
            value: year,
            label: year,
            disabled: !!(isDisabled?.(new Date().changeYear(year)).year),
          }))}
          selectedOption={{ value: viewDate.getFullYear(), label: viewDate.getFullYear() }}
          onChange={({ value }) => setViewDate(viewDate.changeYear(value))}
        />
        <NextButton onClick={() => setViewDate(viewDate.increaseYear())} />
      </div>
      <div className="jk-date-picker-grid-months">
        {gridMonths.map((row, index) => (
          <div className="jk-row" key={index}>
            {row.map(date => {
              const disabled = !!isDisabled?.(date).month;
              const selected = !!isSelected?.(date).month;
              return (
                <Div
                  className={classNames('month jk-row', { disabled, selected })}
                  key={date.getTime()}
                  onClick={() => !disabled && onChange(date.changeYear(date.getFullYear()).changeMonth(date.getMonth()))}
                  onKeyDownClick
                >
                  <div><T>{MONTH_NAMES[date.getMonth()] ?? date.getMonth().toString()}</T></div>
                </Div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};
