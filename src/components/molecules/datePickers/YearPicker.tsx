import React, { useState } from 'react';
import { classNames } from '../../../helpers';
import { Div } from '../../atoms';
import { NextButton, PreviousButton } from './commons';
import { YearPickerProps } from './types';

export const YearPicker = ({ date, onChange, isDisabled, isSelected }: YearPickerProps) => {
  
  const [ viewDate, setViewDate ] = useState(date);
  
  const gridYears: (Date[])[] = [];
  let dateCursor = new Date(viewDate);
  while (dateCursor.getFullYear() % 12) {
    dateCursor = dateCursor.decreaseYear();
  }
  for (let i = 0; i < 4; i++) {
    gridYears.push([]);
    for (let j = 0; j < 3; j++) {
      gridYears[i].push(new Date(dateCursor));
      dateCursor = dateCursor.increaseYear();
    }
  }
  
  return (
    <>
      <div className="jk-row jk-year-picker-header">
        <PreviousButton onClick={() => setViewDate(viewDate.decreaseYear(12))} />
        <div className="jk-row space-between years-label">
          <div>{gridYears[0][0].getFullYear()}</div>
          &nbsp;-&nbsp;
          <div>{gridYears[3][2].getFullYear()}</div>
        </div>
        <NextButton onClick={() => setViewDate(viewDate.increaseYear(12))} />
      </div>
      <div className="jk-date-picker-grid-years">
        {gridYears.map((row, index) => (
          <div className="jk-row" key={index}>
            {row.map(date => {
              const disabled = !!isDisabled?.(date).year;
              const selected = !!isSelected?.(date).year;
              return (
                <Div
                  className={classNames('year', { disabled, selected })}
                  key={date.getTime()}
                  onClick={() => !disabled && onChange(date.changeYear(date.getFullYear()))}
                  onKeyDownClick
                >
                  <div>{date.getFullYear()}</div>
                </Div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};
