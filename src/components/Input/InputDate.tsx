import React from 'react';
import { classNames } from '../../helpers';
import { Button, DatePicker, InputDateProps, PlusIcon, Popover, T } from '../index';
import { DateLiteral } from './DateLiteral';

export const InputDate = ({
  date,
  onDatePick,
  onDateClean,
  inline = false,
  type = 'year-month-day-hours-minutes-seconds',
  isDisabled,
  isSelected,
  baseDate,
  twoLines = false,
  extend = false,
}: InputDateProps) => {
  
  const input = () => {
    return date?.isValidDate() ? (
      <>
        <DateLiteral
          date={date}
          className={classNames('date-literal-label color-primary-dark')}
          show={type}
          twoLines={twoLines}
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
        className={classNames('jk-row date-literal-label jk-border-radius-inline color-primary-dark placeholder', { 'two-lines': twoLines })}
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
          baseDate={baseDate}
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
            baseDate={baseDate}
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