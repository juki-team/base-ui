import React, { ReactNode, useId } from 'react';
import { classNames } from '../../../helpers';
import { ReactNodeOrFunctionType } from '../../../types';
import { TextArea } from '../TextArea';
import { InputTextAreaProps } from './types';

export const InputTextArea = <T, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: InputTextAreaProps) => {
  
  const {
    extend = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    register,
    ...restProps
  } = props;
  
  const id = useId();
  
  return (
    <div
      className={classNames('jk-input-text-area-wrapper', {
        extend,
        [`label-${labelPlacement}`]: true,
        required,
        'no-label': !inputLabel,
      })}
    >
      <TextArea
        {...restProps}
        register={register ? typeof register === 'function' ? register((value) => value) : register : undefined}
      />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
    </div>
  );
};
