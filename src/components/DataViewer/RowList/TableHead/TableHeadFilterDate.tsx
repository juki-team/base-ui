import React, { useEffect, useRef, useState } from 'react';
import { Button, InputDate, T } from '../../../index';
import { TableHeadFilterDateProps } from './types';

export const TableHeadFilterDate = ({
  onFilter,
  onReset,
  isDisabled,
  columnIndex,
  initialSelectedDate,
  pickerType,
  visible,
  baseDate,
}: TableHeadFilterDateProps) => {
  
  const [value, setValue] = useState<Date | null>(initialSelectedDate);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (visible) {
      buttonRef.current?.focus();
    }
  }, [visible]);
  
  return (
    <div className="jk-col gap jk-table-head-cell-filter-date">
      <InputDate
        type={pickerType}
        date={value}
        onDatePick={date => setValue(date)}
        onDateClean={() => setValue(null)}
        inline
        isDisabled={isDisabled}
        isSelected={date => ({
          year: !!value && date.isSameYear(value),
          month: !!value && date.isSameMonth(value),
          date: !!value && date.isSameDay(value),
          hours: !!value && date.isSameHour(value),
          minutes: !!value && date.isSameMinute(value),
          seconds: !!value && date.isSameSecond(value),
          milliseconds: !!value && date.isSameMillisecond(value),
        })}
        baseDate={baseDate}
        twoLines={pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' || pickerType === 'year-month-day-hours-minutes-seconds' || pickerType === 'year-month-day-hours-minutes' || pickerType === 'year-month-day-hours'}
      />
      <div className="jk-row right gap buttons">
        <Button size="tiny" type="text" onClick={onReset} disabled={!initialSelectedDate?.isValidDate()}>
          <T>reset</T>
        </Button>
        <Button
          size="tiny"
          onClick={() => value && onFilter({ columnIndex, selectedDate: value })}
          disabled={!value?.isValidDate()}
          ref={buttonRef}
        >
          <T>filter</T>
        </Button>
      </div>
    </div>
  );
};