import React, { ReactNode, useId } from 'react';
import { classNames } from '../../../helpers';
import { ReactNodeOrFunctionType } from '../../../types';
import { Select } from '../Select';
import { InputSelectProps } from './types';

export const InputSelect = <T, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) => {
  
  const {
    extend = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    onChange,
    onBlur,
    register,
    ...selectProps
  } = props;
  
  const { onChange: onChangeRegister, onBlur: onBlurRegister, name } = register || {};
  
  const id = useId();
  
  return (
    <div
      className={classNames(`jk-input-select-wrapper`, {
        extend,
        [`label-${labelPlacement}`]: true,
        required,
        'no-label': !inputLabel,
      })}
    >
      <Select
        {...selectProps}
        onChange={onChangeRegister ? ({ value }) => onChangeRegister({ target: { value, name } }) : onChange}
        onBlur={onBlurRegister ? () => onBlurRegister({ target: { name } }) : onBlur}
      />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
    </div>
  );
};
