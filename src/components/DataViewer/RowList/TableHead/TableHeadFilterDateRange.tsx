import React, { useEffect, useRef, useState } from 'react';
import { Button, InputDate, T } from '../../../index';
import { isDisabledEnd, isDisabledStart, isRangeSelected, isSelected, orDatePickerDateFun } from '../../utils';
import { TableHeadFilterDateRangeProps } from './types';

export const TableHeadFilterDateRange = ({
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
}: TableHeadFilterDateRangeProps) => {
  
  const [start, setStart] = useState<Date | null>(initialStartSelectedDate);
  const [end, setEnd] = useState<Date | null>(initialEndSelectedDate);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (visible) {
      buttonRef.current?.focus();
    }
  }, [visible]);
  
  return (
    <div className="jk-col gap jk-table-head-cell-filter-date-range">
      <div className="jk-row gap date-range">
        <div>
          <div className="jk-row center text-semi-bold"><T className="text-sentence-case">from</T>&nbsp;:</div>
          <InputDate
            type={pickerType}
            date={start}
            onDatePick={setStart}
            onDateClean={() => setStart(null)}
            inline
            isDisabled={orDatePickerDateFun(isDisabled, isDisabledStart(end))}
            isSelected={orDatePickerDateFun(isSelected(start), isRangeSelected(start, end))}
            baseDate={baseStartDate}
          />
        </div>
        <div>
          <div className="jk-row center text-semi-bold"><T className="text-sentence-case">to</T>&nbsp;:</div>
          <InputDate
            type={pickerType}
            date={end}
            onDatePick={setEnd}
            onDateClean={() => setEnd(null)}
            inline
            isDisabled={orDatePickerDateFun(isDisabled, isDisabledEnd(start))}
            isSelected={orDatePickerDateFun(isSelected(end), isRangeSelected(start, end))}
            baseDate={baseEndDate}
          />
        </div>
      </div>
      <div className="jk-row space-between buttons">
        <Button
          size="small" type="text" onClick={onReset}
          disabled={!(initialStartSelectedDate && initialEndSelectedDate && initialStartSelectedDate?.isValidDate() && initialEndSelectedDate?.isValidDate())}
        >
          <T>reset</T>
        </Button>
        <Button
          size="small"
          onClick={() => start && end && start?.isValidDate() && end?.isValidDate() && onFilter({
            columnIndex,
            startSelectedDate: start,
            endSelectedDate: end,
          })}
          disabled={!(start && end && start?.isValidDate() && end?.isValidDate())}
          ref={buttonRef}
        >
          <T>filter</T>
        </Button>
      </div>
    </div>
  );
};