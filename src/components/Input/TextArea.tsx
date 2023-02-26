import React, { CSSProperties, Ref } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '../../helpers';

export interface TextAreaProps {
  value?: string,
  onChange?: (value: string) => void,
  style?: CSSProperties,
  className?: string,
  register?: UseFormRegisterReturn,
  onBlur?: () => void,
}

export const TextArea = ({
  value,
  onChange,
  style,
  className,
  register,
  onBlur,
}: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
  const { onChange: registerOnChange, onBlur: registerOnBlur, ref: registerRef, ...restRegister } = register || {};
  return (
    <textarea
      {...restRegister}
      ref={registerRef || ref}
      className={classNames('jk-input-textarea jk-border-radius-inline', className)}
      value={value}
      onChange={registerOnChange ? registerOnChange : ({ target }) => onChange?.(target.value)}
      onBlur={registerOnBlur ? registerOnBlur : onBlur}
      disabled={!onChange}
      rows={Math.max((value || '').split('\n').length, 2)}
      style={style}
    />
  );
};
