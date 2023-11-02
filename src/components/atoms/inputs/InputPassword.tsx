import React, { useState } from 'react';
import { Input, VisibilityIcon, VisibilityOffIcon } from '../index';
import { InputPasswordProps } from './types';

export const InputPassword = ({ className = '', onChange, register, ...props }: InputPasswordProps<string>) => {
  
  const [ type, setType ] = useState<'password' | 'text'>('password');
  
  return (
    <Input
      type={type}
      onChange={value => onChange?.(value)}
      register={register}
      icon={type === 'password'
        ? <VisibilityOffIcon onClick={() => setType('text')} />
        : <VisibilityIcon onClick={() => setType('password')} />}
      {...props}
    />
  );
};
