import type { ComponentPropsWithRef, CSSProperties } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { TextArea } from './TextArea';

export interface CmpTextAreaProps {
  value?: string,
  onChange?: (value: string) => void,
  style?: CSSProperties,
  className?: string,
  register?: UseFormRegisterReturn,
  onBlur?: () => void,
  disabled?: boolean,
  rows?: number,
}

export type TextAreaProps = ComponentPropsWithRef<typeof TextArea>;
