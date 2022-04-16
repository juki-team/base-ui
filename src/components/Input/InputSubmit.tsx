import React from 'react';
import { classNames } from '../../helpers';
import { InputSubmitProps } from './types';

export const InputSubmit = ({ className, type = 'primary', disabled = false, ...props }: InputSubmitProps) => {
  return (
    <input type="submit" className={classNames(className || '', `jk-input-submit jk-button-${type}`, { disabled })} {...props} />
  );
};
