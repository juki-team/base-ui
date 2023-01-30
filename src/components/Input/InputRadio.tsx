import React from 'react';
import { classNames } from '../../helpers';
import { InputCheckboxProps } from './types';

export const InputRadio = ({ className = '', checked, disabled, onChange, label, ...props }: InputCheckboxProps) => {
  
  const isDisabled = disabled || !onChange;
  
  return (
    <label className={classNames('jk-input-radio-wrapper', className, { disabled: isDisabled })}>
      <input
        type="radio"
        className="jk-input-radio"
        onChange={({ target: { checked } }) => onChange?.(checked)}
        checked={checked}
        {...props}
      />
      {label}
    </label>
  );
};
