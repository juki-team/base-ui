import { forwardRef, type Ref } from 'react';
import { classNames, showOfDateDisplayType } from '../../helpers';
import { Button, T } from '../../atoms';
import { DayPicker } from '../DayPicker/DayPicker';
import { MonthPicker } from '../MonthPicker/MonthPicker';
import { TimePicker } from '../TimePicker/TimePicker';
import { YearPicker } from '../YearPicker/YearPicker';
import type { DatePickerProps } from './types';

function DatePickerComponent(props: DatePickerProps, ref: Ref<HTMLDivElement>) {
  
  const {
    todayButton = false,
    date = new Date(),
    isDisabled,
    isSelected,
    type = 'year-month-day-hours-minutes-seconds',
    onChange,
  } = props;
  
  const {
    showYears,
    showMonths,
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    showMilliseconds,
  } = showOfDateDisplayType(type);
  
  return (
    <div className="jk-date-picker-layout jk-col jk-pg-sm" ref={ref}>
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
          {showYears && <div className="jk-divider tiny" style={{ marginTop: -6 }} />}
          <div className={classNames('jk-row center jk-date-picker-time', { 'only-time': !showYears })}>
            {showYears && <div className="label-time fw-bd tt-se"><T>time</T>:&nbsp;</div>}
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
      {todayButton && (
        <div className="jk-row left extend">
          <div className="jk-divider tiny" />
          <Button type="light" size="tiny" onClick={() => onChange(new Date())}>
            <T>select today</T>
          </Button>
        </div>
      )}
    </div>
  );
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(DatePickerComponent);
