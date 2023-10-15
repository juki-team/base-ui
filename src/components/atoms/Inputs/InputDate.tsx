import React from 'react';
import { classNames } from '../../../helpers';
import { Button, DatePicker, InputDateProps, PlusIcon, Popover, T } from '../../index';
import { DateLiteral } from './DateLiteral';

// Add label
export const InputDate = (props: InputDateProps) => {
  
  const {
    todayButton = false,
    date,
    onDatePick,
    onDateClean,
    inline = false,
    type = 'year-month-day-hours-minutes-seconds',
    isDisabled,
    isSelected,
    baseDate,
    twoLines = false,
    withDayName = false,
    extend = false,
  } = props;
  
  const input = () => {
    return date?.isValidDate() ? (
      <>
        <DateLiteral
          date={date}
          className={classNames('date-literal-label cr-pd')}
          show={type}
          twoLines={twoLines}
          withDayName={withDayName}
        />
        {onDateClean && (
          <Button
            icon={<PlusIcon rotate={45} />}
            size="small"
            type="text"
            className="clear-button"
            onClick={({ onClickEvent, onKeyDownEvent }) => {
              (onClickEvent || onKeyDownEvent)?.preventDefault();
              (onClickEvent || onKeyDownEvent)?.stopPropagation();
              onDateClean();
            }}
          />
        )}
      </>
    ) : (
      <div
        className={classNames('jk-row date-literal-label jk-border-radius-inline cr-pd placeholder', { 'two-lines': twoLines })}
      >
        <T>no date selected</T>
      </div>
    );
  };
  
  if (inline) {
    return (
      <div className="jk-input-date-layout">
        {input()}
        <DatePicker
          todayButton={todayButton}
          date={date || baseDate}
          onChange={date => onDatePick(date)}
          type={type}
          isDisabled={isDisabled}
          isSelected={isSelected}
        />
      </div>
    );
  }
  
  return (
    <div className="jk-input-date-layout" style={extend ? { width: '100%' } : {}}>
      <Popover
        content={() => (
          <DatePicker
            todayButton={todayButton}
            date={date || baseDate}
            onChange={date => onDatePick(date)}
            type={type}
            isDisabled={isDisabled}
            isSelected={isSelected}
          />
        )}
        triggerOn="click"
        placement="bottom"
        showPopperArrow
      >
        <div>{input()}</div>
      </Popover>
    </div>
  );
};
