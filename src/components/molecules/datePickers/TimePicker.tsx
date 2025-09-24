import { HOURS, MILLISECONDS, MINUTES, SECONDS } from '@juki-team/commons';
import { Button, Select, T } from '../../atoms';
import { TimePickerProps } from './types';

export const TimePicker = (props: TimePickerProps) => {
  
  const {
    todayButton = false,
    date,
    showMinutes,
    showSeconds,
    showMilliseconds,
    onChange,
    isDisabled,
  } = props;
  
  return (
    <div className="jk-col jk-date-picker-grid-time center">
      <div className="jk-row">
        <Select
          options={HOURS.map(hour => ({
            value: hour,
            label: hour.padStart(2),
            disabled: !!isDisabled?.(date.changeHours(hour)).hours,
          }))}
          selectedOption={{ value: date.getHours(), label: date.getHours().padStart(2) }}
          onChange={({ value }) => onChange(date.changeHours(value))}
        />
        {showMinutes && (
          <>
            :
            <Select
              options={MINUTES.map(minute => ({
                value: minute,
                label: minute.padStart(2),
                disabled: !!isDisabled?.(date.changeMinutes(minute)).minutes,
              }))}
              selectedOption={{ value: date.getMinutes(), label: date.getMinutes().padStart(2) }}
              onChange={({ value }) => onChange(date.changeMinutes(value))}
            />
            {showSeconds && (
              <>
                :
                <Select
                  options={SECONDS.map(second => ({
                    value: second,
                    label: second.padStart(2),
                    disabled: !!isDisabled?.(date.changeSeconds(second)).seconds,
                  }))}
                  selectedOption={{ value: date.getSeconds(), label: date.getSeconds().padStart(2) }}
                  onChange={({ value }) => onChange(date.changeSeconds(value))}
                />
                {showMilliseconds && (
                  <>
                    .
                    <Select
                      options={MILLISECONDS.map(millisecond => ({
                        value: millisecond,
                        label: millisecond.padStart(3),
                        disabled: !!isDisabled?.(date.changeMilliseconds(millisecond)).milliseconds,
                      }))}
                      selectedOption={{ value: date.getMilliseconds(), label: date.getMilliseconds().padStart(3) }}
                      onChange={({ value }) => onChange(date.changeMilliseconds(value))}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="jk-row labels tx-s">
        <T className="cr-g3">HH</T>
        {showMinutes && (
          <>
            :
            <T className="cr-g3">MM</T>
            {showSeconds && (
              <>
                :
                <T className="cr-g3">SS</T>
                {showMilliseconds && (
                  <>
                    .
                    <T className="cr-g3">MS</T>
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
          <Button size="tiny" onClick={() => onChange(new Date())} style={{ height: 12 }}>today</Button>
        </>
      )}
    </div>
  );
};
