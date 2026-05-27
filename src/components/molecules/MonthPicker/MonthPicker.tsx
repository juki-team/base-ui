import { MONTH_NAMES, YEARS } from '@juki-team/commons/constants';
import { changeMonth, changeYear, decreaseYear, increaseMonth, increaseYear, startOfYear } from '@juki-team/commons/helpers';
import { useState } from 'react';
import { Div, Select, T } from '../../atoms';
import { classNames } from '../../helpers/commons';
import type { MonthPickerProps } from '../DatePicker/types';
import { NextButton } from '../NextButton/NextButton';
import { PreviousButton } from '../PreviousButton/PreviousButton';

export function MonthPicker({ date, onChange, isDisabled, isSelected }: MonthPickerProps) {
  const [viewDate, setViewDate] = useState(date);

  const gridMonths: Date[][] = [];
  let dateCursor = new Date(startOfYear(viewDate));
  for (let i = 0; i < 4; i++) {
    const row: Date[] = [];
    gridMonths.push(row);
    for (let j = 0; j < 3; j++) {
      row.push(new Date(dateCursor));
      dateCursor = increaseMonth(dateCursor);
    }
  }

  return (
    <>
      <div className="jk-row jk-month-picker-header">
        <PreviousButton onClick={() => setViewDate(decreaseYear(viewDate))} />
        <Select
          options={YEARS.map((year) => ({
            value: year,
            label: year,
            disabled: !!isDisabled?.(changeYear(new Date(), year)).year,
          }))}
          selectedOption={{ value: viewDate.getFullYear(), label: viewDate.getFullYear() }}
          onChange={({ value }) => setViewDate(changeYear(viewDate, value))}
        />
        <NextButton onClick={() => setViewDate(increaseYear(viewDate))} />
      </div>
      <div className="jk-date-picker-grid-months">
        {gridMonths.map((row) => (
          <div className="jk-row" key={row[0]?.getTime()}>
            {row.map((date) => {
              const disabled = !!isDisabled?.(date).month;
              const selected = !!isSelected?.(date).month;
              return (
                <Div
                  className={classNames('month jk-row', { disabled, selected })}
                  key={date.getTime()}
                  onClick={() => !disabled && onChange(changeMonth(changeYear(date, date.getFullYear()), date.getMonth()))}
                  onKeyDownClick
                >
                  <div>
                    <T>{MONTH_NAMES[date.getMonth()] ?? date.getMonth().toString()}</T>
                  </div>
                </Div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
