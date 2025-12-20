import { useState } from 'react';
import { Input } from '../Input/Input';
import type { InputPasswordProps } from '../Input/types';
import { VisibilityIcon, VisibilityOffIcon } from '../server';

export function InputPassword({ onChange, register, ...props }: InputPasswordProps) {
  
  const [ type, setType ] = useState<'password' | 'text'>('password');
  
  return (
    <Input
      type={type}
      onChange={(value, event) => onChange?.(value, event)}
      register={register}
      icon={type === 'password'
        ? <VisibilityOffIcon onClick={() => setType('text')} />
        : <VisibilityIcon onClick={() => setType('password')} />}
      {...props}
    />
  );
}
