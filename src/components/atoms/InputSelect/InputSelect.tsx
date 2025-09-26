import { type ReactNode, useId, useRef, useState } from 'react';
import { classNames } from '../../helpers';
import type { ReactNodeOrFunctionType } from '../../types';
import type { InputSelectProps } from '../Input/types';
import { Select } from '../Select/Select';
import type { SelectProps } from '../Select/types';
import { T } from '../T/T';

export function InputSelect<T, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) {
  
  const {
    expand = false,
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
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const myOnChange: SelectProps<T, U, V>['onChange'] = onChange ? onChange : ({ value }) => {
    setValue(value);
    if ('name' in register) {
      registerSetValue?.(register?.name, value, { shouldTouch: true });
    }
  };
  
  const id = useId();
  
  return (
    <div
      className={classNames('jk-wrapper-input jk-wrapper-input-select', {
        expand,
        [`label-${labelPlacement}`]: true,
        required,
        'no-label': !inputLabel,
      })}
    >
      {_register && (
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
      )}
      <Select
        {...selectProps}
        onChange={myOnChange}
        selectedOption={selectedOption ? selectedOption : {
          value,
          label: value ? undefined : <T className="tt-se">select an option</T> as U,
        }}
        onBlur={() => inputRef.current?.blur()}
      />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
    </div>
  );
}
