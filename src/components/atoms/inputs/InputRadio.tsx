import React from 'react';
import { classNames } from '../../../helpers';
import { InputRadioProps } from './types';

export const InputRadio = ({ className, checked, disabled, onChange, label, ...props }: InputRadioProps) => {
  
  const isDisabled = disabled || !onChange;
  
  return (
    <label className={classNames('jk-wrapper-input jk-wrapper-input-radio', className, { disabled: isDisabled })}>
      <input
        type="radio"
        className={classNames('jk-input-radio', { disabled: isDisabled })}
        onChange={isDisabled ? undefined : ({ target: { checked } }) => {
          onChange?.(checked);
        }}
        checked={checked}
        disabled={isDisabled}
        {...props}
      />
      {label}
    </label>
  );
};
