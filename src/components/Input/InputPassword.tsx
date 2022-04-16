import React, { useState } from 'react';
import { classNames } from '../../helpers';
import { EyeIcon, EyeInvisibleIcon } from '../graphics';
import { InputProps } from './types';

export const InputPassword = ({ className = '', onChange, register, ...props }: InputProps<string>) => {
  const { onBlur: registerOnBlur, onChange: registerOnChange, ...restRegister } = register || {};
  const [type, setType] = useState('password');
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = registerOnBlur ? registerOnBlur : () => setFocused(false);
  
  return (
    <span className={classNames('jk-input-password-wrapper', { focused })}>
      <input
        type={type}
        className={classNames(className, 'jk-input-password jk-border-radius-inline')}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={registerOnChange ? registerOnChange : ({ target: { value } }) => onChange?.(value)}
        {...props}
        {...restRegister}
      />
      {type === 'password'
        ? <EyeInvisibleIcon onClick={() => setType('text')} className="input-icon" />
        : <EyeIcon onClick={() => setType('password')} className="input-icon" />}
    </span>
  );
};
