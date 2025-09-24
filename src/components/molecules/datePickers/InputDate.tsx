import { classNames } from '../../../helpers';
import { Button, DateLiteral, Popover, T } from '../../atoms';
import { PlusIcon } from '../../server';
import { DatePicker } from './DatePicker';
import { InputDateProps } from './types';

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
  
  const input = () => {
    
    if (inputLabel) {
      return inputLabel(props, () => null);
    }
    
    return date?.isValidDate() ? (
      <div className="jk-row gap jk-input-date jk-br-ie">
        <DateLiteral
          date={date}
          className="flex-1 cr-pd"
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
      </div>
    ) : (
      <div
        className={classNames('jk-row jk-input-date jk-br-ie cr-pd placeholder', { 'two-lines': twoLines })}
        style={{ height: 24 }}
      >
        <T className="tt-se">no date selected</T>
      </div>
    );
  };
  
  if (inline) {
    return (
      <div className="jk-date-picker-layout">
        {input()}
        <DatePicker
          todayButton={todayButton}
          date={date || baseDate}
          onChange={date => onDatePick(date, () => null)}
          type={type}
          isDisabled={isDisabled}
          isSelected={isSelected}
        />
      </div>
    );
  }
  
  return (
    <div className={classNames('jk-date-picker-layout', { disabled })} style={extend ? { width: '100%' } : {}}>
      <Popover
        popoverClassName="bc-we jk-br-ie elevation-1"
        content={() => (
          <DatePicker
            todayButton={todayButton}
            date={date || baseDate}
            onChange={date => onDatePick(date, () => null)}
            type={type}
            isDisabled={isDisabled}
            isSelected={isSelected}
          />
        )}
        offset={4}
        placement="bottom"
        triggerOn="click"
        open={disabled ? false : undefined}
        // onOpenChange={(visible) => setVisible(visible)}
      >
        <div>{input()}</div>
      </Popover>
    </div>
  );
};
