import React, { useState } from 'react';
import { classNames } from '../../../helpers';
import { Button, DateLiteral, InputDateProps, PlusIcon, Popover, T } from '../../atoms';
import { DatePicker } from './DatePicker';

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
    inputLabel,
    disabled = false,
  } = props;
  const [ visible, setVisible ] = useState(false);
  
  const input = () => {
    
    if (inputLabel) {
      return inputLabel(props, () => setVisible(false));
    }
    
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
            type="light"
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
          onChange={date => onDatePick(date, () => setVisible(false))}
          type={type}
          isDisabled={isDisabled}
          isSelected={isSelected}
        />
      </div>
    );
  }
  
  return (
    <div className={classNames('jk-input-date-layout', { disabled })} style={extend ? { width: '100%' } : {}}>
      <Popover
        content={() => (
          <DatePicker
            todayButton={todayButton}
            date={date || baseDate}
            onChange={date => onDatePick(date, () => setVisible(false))}
            type={type}
            isDisabled={isDisabled}
            isSelected={isSelected}
          />
        )}
        marginOfChildren={1}
        triggerOn="click"
        placement="bottom"
        visible={disabled ? false : visible}
        onVisibleChange={(visible) => setVisible(visible)}
      >
        <div>{input()}</div>
      </Popover>
    </div>
  );
};
