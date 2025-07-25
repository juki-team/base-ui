import React, { useId } from 'react';
import { classNames } from '../../../helpers';
import { TextArea } from '../TextArea/TextArea';
import { InputTextAreaProps } from './types';

export const InputTextArea = (props: InputTextAreaProps) => {
  
  const {
    className,
    expand = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    register,
    ...restProps
  } = props;
  
  const id = useId();
  
  return (
    <div
      className={classNames('jk-wrapper-input jk-wrapper-input-text-area', className, {
        expand,
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
