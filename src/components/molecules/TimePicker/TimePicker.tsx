import { HOURS, MILLISECONDS, MINUTES, SECONDS } from '@juki-team/commons/constants';
import { changeHours, changeMilliseconds, changeMinutes, changeSeconds, padStart } from '@juki-team/commons/helpers';
import { Button } from '../../atoms/Button/Button';
import { Select } from '../../atoms/Select/Select';
import { T } from '../../atoms/T/T';
import type { TimePickerProps } from '../DatePicker/types';

export function TimePicker(props: TimePickerProps) {
  const { todayButton = false, date, showMinutes, showSeconds, showMilliseconds, onChange, isDisabled } = props;

  return (
    <div className="jk-col jk-date-picker-grid-time center">
      <div className="jk-row">
        <Select
          options={HOURS.map((hour) => ({
            value: hour,
            label: padStart(hour, 2),
            disabled: !!isDisabled?.(changeHours(date, hour)).hours,
          }))}
          selectedOption={{ value: date.getHours(), label: padStart(date.getHours(), 2) }}
          onChange={({ value }) => onChange(changeHours(date, value))}
        />
        {showMinutes && (
          <>
            :
            <Select
              options={MINUTES.map((minute) => ({
                value: minute,
                label: padStart(minute, 2),
                disabled: !!isDisabled?.(changeMinutes(date, minute)).minutes,
              }))}
              selectedOption={{ value: date.getMinutes(), label: padStart(date.getMinutes(), 2) }}
              onChange={({ value }) => onChange(changeMinutes(date, value))}
            />
            {showSeconds && (
              <>
                :
                <Select
                  options={SECONDS.map((second) => ({
                    value: second,
                    label: padStart(second, 2),
                    disabled: !!isDisabled?.(changeSeconds(date, second)).seconds,
                  }))}
                  selectedOption={{ value: date.getSeconds(), label: padStart(date.getSeconds(), 2) }}
                  onChange={({ value }) => onChange(changeSeconds(date, value))}
                />
                {showMilliseconds && (
                  <>
                    .
                    <Select
                      options={MILLISECONDS.map((millisecond) => ({
                        value: millisecond,
                        label: padStart(millisecond, 3),
                        disabled: !!isDisabled?.(changeMilliseconds(date, millisecond)).milliseconds,
                      }))}
                      selectedOption={{ value: date.getMilliseconds(), label: padStart(date.getMilliseconds(), 3) }}
                      onChange={({ value }) => onChange(changeMilliseconds(date, value))}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="jk-row labels tx-s">
        <T className="cr-tx-sc">HH</T>
        {showMinutes && (
          <>
            :<T className="cr-tx-sc">MM</T>
            {showSeconds && (
              <>
                :<T className="cr-tx-sc">SS</T>
                {showMilliseconds && (
                  <>
                    .<T className="cr-tx-sc">MS</T>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      {todayButton && (
        <>
          <div className="jk-divider tiny" />
          <Button size="tiny" onClick={() => onChange(new Date())} style={{ height: 12 }}>
            today
          </Button>
        </>
      )}
    </div>
  );
}
