import React from 'react';
import { classNames } from '../../../helpers';
import { InputCheckboxProps } from './types';

export const InputCheckbox = ({ className, checked, disabled, onChange, label, ...props }: InputCheckboxProps) => {
  
  const isDisabled = disabled || !onChange;
  
  return (
    <div className={classNames('jk-input-checkbox-wrapper', className, { disabled: isDisabled })}>
      <input
        type="checkbox"
        className="jk-input-checkbox jk-border-radius-inline"
        onChange={({ target: { checked } }) => onChange?.(checked)}
        checked={checked}
        {...props}
      />
      <label>
        {label}
      </label>
    </div>
  );
};
