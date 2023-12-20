import React, { ReactNode, useId, useRef, useState } from 'react';
import { classNames } from '../../../helpers';
import { ReactNodeOrFunctionType } from '../../../types';
import { Select, SelectProps } from '../Select';
import { T } from '../T';
import { InputSelectProps } from './types';

export const InputSelect = <T, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) => {
  
  const {
    extend = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    onChange,
    onBlur,
    register: _register,
    selectedOption,
    ...selectProps
  } = props;
  
  const { setValue: registerSetValue, ...register } = _register || {};
  
  const [ value, setValue ] = useState<T>('' as T);
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const myOnChange: SelectProps<T, U, V>['onChange'] = onChange ? onChange : ({ value }) => {
    setValue(value);
    if ('name' in register) {
      registerSetValue?.(register?.name, value);
    }
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
      <input
        {...register}
        ref={(ref) => {
          inputRef.current = ref;
          if ('ref' in register) {
            register?.ref?.(ref);
          }
        }}
        value={value as string}
        style={{ display: 'none' }}
      />
      <Select
        {...selectProps}
        onChange={myOnChange}
        selectedOption={selectedOption ? selectedOption : {
          value,
          label: value ? undefined : <T>select an option</T> as U,
        }}
        onBlur={() => inputRef.current?.blur()}
      />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
    </div>
  );
};
