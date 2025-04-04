import type { CSSProperties } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface TextAreaProps {
  value?: string,
  onChange?: (value: string) => void,
  style?: CSSProperties,
  className?: string,
  register?: UseFormRegisterReturn,
  onBlur?: () => void,
  disabled?: boolean,
  rows?: number,
}
