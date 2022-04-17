import React, { useState } from 'react';
import { classNames } from '../../helpers';
import { EyeIcon, EyeInvisibleIcon } from '../graphics';
import { Input } from './Input';
import { InputPasswordProps } from './types';

export const InputPassword = ({ className = '', onChange, register, ...props }: InputPasswordProps<string>) => {
  
  const [type, setType] = useState<'password' | 'text'>('password');
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  
  return (
    <span className={classNames('jk-input-password-wrapper', { focused })}>
      <Input
        type={type}
        className={classNames(className, 'jk-input-password jk-border-radius-inline')}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={value => onChange?.(value)}
        register={register}
        {...props}
      />
      {type === 'password'
        ? <EyeInvisibleIcon onClick={() => setType('text')} className="input-icon" />
        : <EyeIcon onClick={() => setType('password')} className="input-icon" />}
    </span>
  );
};
