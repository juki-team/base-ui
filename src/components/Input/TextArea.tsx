import React, { CSSProperties } from 'react';
import { classNames } from '../../helpers';

export interface TextAreaProps {
  value: string,
  onChange?: (value: string) => void,
  style?: CSSProperties,
  className?: string,
}

export const TextArea = ({ value, onChange, style, className }: TextAreaProps) => {
  return (
    <textarea
      className={classNames('jk-input-textarea jk-border-radius-inline', className)}
      value={value}
      onChange={({ target }) => onChange?.(target.value)}
      disabled={!onChange}
      rows={Math.max(value.split('\n').length, 2)}
      style={style}
    />
  );
};
