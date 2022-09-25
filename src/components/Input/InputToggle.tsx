import React, { MouseEventHandler } from 'react';
import { classNames } from '../../helpers';
import { InputToggleProps } from './types';

export const InputToggle = ({
  className,
  checked,
  onChange,
  type = 'rounded',
  leftLabel,
  rightLabel,
  size = 'regular',
  disabled = false,
}: InputToggleProps) => {
  
  const isDisabled = disabled || !onChange;
  const handleClick = (value: boolean): MouseEventHandler<HTMLParagraphElement> => event => {
    if (!isDisabled) {
      onChange?.(value);
    }
    event.preventDefault();
  };
  
  return (
    <label className={classNames('jk-input-toggle-wrapper', type, className, size, { disabled: isDisabled })}>
      <p onClick={handleClick(false)}>{leftLabel}</p>
      <input className="jk-input-toggle" type="checkbox" checked={checked}
             onChange={({ target: { checked } }) => isDisabled ? null : onChange?.(checked)} />
      <span className="jk-input-toggle-slider" />
      <p onClick={handleClick(true)}>{rightLabel}</p>
    </label>
  );
};
