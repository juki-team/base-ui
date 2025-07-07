import React, { useEffect, useRef, useState } from 'react';
import { Button, T } from '../../../../atoms';
import { InputDate } from '../../../../molecules';
import { isDisabledEnd, isDisabledStart, isRangeSelected, isSelected, orDatePickerDateFun } from '../../commons/utils';
import { TableHeadFilterDateRangeProps } from './types';

export const TableHeadFilterDateRange = (props: TableHeadFilterDateRangeProps) => {
  
  const {
    onFilter,
    onReset,
    isDisabled,
    columnIndex,
    initialStartSelectedDate,
    initialEndSelectedDate,
    pickerType,
    visible,
    baseStartDate,
    baseEndDate,
  } = props;
  
  const [ start, setStart ] = useState<Date | null>(initialStartSelectedDate);
  const [ end, setEnd ] = useState<Date | null>(initialEndSelectedDate);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (visible) {
      buttonRef.current?.focus();
    }
  }, [ visible ]);
  
  return (
    <div className="jk-col gap jk-table-head-cell-filter-date-range jk-pg-sm">
      <div className="jk-row gap date-range nowrap">
        <div>
          <div className="jk-row center fw-bd"><T className="tt-se">from</T>&nbsp;:</div>
          <InputDate
            type={pickerType}
            date={start}
            onDatePick={setStart}
            onDateClean={() => setStart(null)}
            inline
            isDisabled={orDatePickerDateFun(isDisabled, isDisabledStart(end))}
            isSelected={orDatePickerDateFun(isSelected(start), isRangeSelected(start, end))}
            baseDate={baseStartDate}
            twoLines={pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' || pickerType === 'year-month-day-hours-minutes-seconds' || pickerType === 'year-month-day-hours-minutes' || pickerType === 'year-month-day-hours'}
          />
        </div>
        <div>
          <div className="jk-row center fw-bd"><T className="tt-se">to</T>&nbsp;:</div>
          <InputDate
            type={pickerType}
            date={end}
            onDatePick={setEnd}
            onDateClean={() => setEnd(null)}
            inline
            isDisabled={orDatePickerDateFun(isDisabled, isDisabledEnd(start))}
            isSelected={orDatePickerDateFun(isSelected(end), isRangeSelected(start, end))}
            baseDate={baseEndDate}
            twoLines={pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' || pickerType === 'year-month-day-hours-minutes-seconds' || pickerType === 'year-month-day-hours-minutes' || pickerType === 'year-month-day-hours'}
          />
        </div>
      </div>
      <div className="jk-row gap right buttons wh-100">
        <Button
          size="tiny" type="light" onClick={onReset}
          disabled={!(initialStartSelectedDate && initialEndSelectedDate && initialStartSelectedDate?.isValidDate() && initialEndSelectedDate?.isValidDate())}
        >
          <T className="tt-se">reset</T>
        </Button>
        <Button
          size="tiny"
          onClick={() => start && end && start?.isValidDate() && end?.isValidDate() && onFilter({
            columnIndex,
            startSelectedDate: start,
            endSelectedDate: end,
          })}
          disabled={!(start && end && start?.isValidDate() && end?.isValidDate())}
          ref={buttonRef}
        >
          <T className="tt-se">filter</T>
        </Button>
      </div>
    </div>
  );
};
