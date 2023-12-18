import React, { ReactNode, useId, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '../../../helpers';
import { ReactNodeOrFunctionType } from '../../../types';
import { Select, SelectProps } from '../Select';
import { T } from '../T';
import { InputSelectProps } from './types';

export const InputSelect = <T extends string, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) => {
  
  const {
    extend = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    onChange,
    onBlur,
    register,
    selectedOption,
    ...selectProps
  } = props;
  
  const [ value, setValue ] = useState<T>('' as T);
  
  const myRegister = (register ? (typeof register === 'function' ? register((v) => v) : register) : {} as Partial<UseFormRegisterReturn>);
  
  const myOnChange: SelectProps<T, U, V>['onChange'] = onChange ? onChange : ({ value }) => {
    setValue(value);
  }
  
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
      <input {...myRegister} value={value as string} style={{ display: 'none' }} />
      <Select
        {...selectProps}
        onChange={myOnChange}
        selectedOption={onChange && selectedOption ? selectedOption : {
          value,
          label: value ? undefined : <T>select an option</T> as U,
        }}
        onBlur={onBlur}
      />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
    </div>
  );
};
