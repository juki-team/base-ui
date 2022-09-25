import React from 'react';
import { HOURS, MILLISECONDS, MINUTES, SECONDS } from '../../config/constants';
import { Button } from '../Button';
import { Select } from '../Input';
import { T } from '../Translate';
import { TimePickerProps } from './types';

export const TimePicker = ({
  todayButton = false,
  date,
  showMinutes,
  showSeconds,
  showMilliseconds,
  onChange,
  isDisabled,
}: TimePickerProps) => {
  
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
      <div className="jk-row labels text-s">
        <T className="color-gray-3">HH</T>
        {showMinutes && (
          <>
            :
            <T className="color-gray-3">MM</T>
            {showSeconds && (
              <>
                :
                <T className="color-gray-3">SS</T>
                {showMilliseconds && (
                  <>
                    .
                    <T className="color-gray-3">MS</T>
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
