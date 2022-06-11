import React from 'react';
import { HOURS, MILLISECONDS, MINUTES, SECONDS } from '../../config/constants';
import { Select } from '../Input';
import { T } from '../Translate';
import { TimePickerProps } from './types';

export const TimePicker = ({
  baseDate,
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
            disabled: !!isDisabled?.(baseDate.changeHours(hour)).hours,
          }))}
          selectedOption={{ value: baseDate.getHours(), label: baseDate.getHours().padStart(2) }}
          onChange={({ value }) => onChange(baseDate.changeHours(value))}
        />
        {showMinutes && (
          <>
            :
            <Select
              options={MINUTES.map(minute => ({
                value: minute,
                label: minute.padStart(2),
                disabled: !!isDisabled?.(baseDate.changeMinutes(minute)).minutes,
              }))}
              selectedOption={{ value: baseDate.getMinutes(), label: baseDate.getMinutes().padStart(2) }}
              onChange={({ value }) => onChange(baseDate.changeMinutes(value))}
            />
            {showSeconds && (
              <>
                :
                <Select
                  options={SECONDS.map(second => ({
                    value: second,
                    label: second.padStart(2),
                    disabled: !!isDisabled?.(baseDate.changeSeconds(second)).seconds,
                  }))}
                  selectedOption={{ value: baseDate.getSeconds(), label: baseDate.getSeconds().padStart(2) }}
                  onChange={({ value }) => onChange(baseDate.changeSeconds(value))}
                />
                {showMilliseconds && (
                  <>
                    .
                    <Select
                      options={MILLISECONDS.map(millisecond => ({
                        value: millisecond,
                        label: millisecond.padStart(3),
                        disabled: !!isDisabled?.(baseDate.changeMilliseconds(millisecond)).milliseconds,
                      }))}
                      selectedOption={{ value: baseDate.getMilliseconds(), label: baseDate.getMilliseconds().padStart(3) }}
                      onChange={({ value }) => onChange(baseDate.changeMilliseconds(value))}
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
    </div>
  );
};
