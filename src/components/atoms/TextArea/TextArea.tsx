import React from 'react';
import { classNames } from '../../../helpers';
import { TextAreaProps } from './types';

export const TextArea = ({ value, onChange, style, className, register, onBlur, disabled }: TextAreaProps) => {
  
  const { onChange: registerOnChange, onBlur: registerOnBlur, ref: registerRef, ...restRegister } = register || {};
  
  return (
    <textarea
      {...restRegister}
      ref={registerRef}
      className={classNames('jk-input-textarea jk-border-radius-inline', className, { disabled: !!disabled })}
      value={value}
      onChange={registerOnChange ? registerOnChange : ({ target }) => onChange?.(target.value)}
      onBlur={registerOnBlur ? registerOnBlur : onBlur}
      disabled={disabled}
      rows={Math.max((value || '').split('\n').length, 2)}
      style={style}
    />
  );
};
