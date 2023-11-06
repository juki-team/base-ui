import { ReactElement, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { DateDisplayType } from '../../../types';
import { DatePickerDateFunType } from '../../molecules';
import { ButtonType } from '../Button';
import { T as TCmp } from '../T';

export interface InputCommonsProps<T> {
  id?: string,
  onChange?: (newValue: T) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  value?: T,
  name?: string,
  disabled?: boolean,
  // offline?: boolean
  className?: string,
  extend?: boolean,
  onClick?: () => void,
  autoFocus?: boolean,
  placeholder?: string,
  register?: UseFormRegisterReturn, //{ name: string, onBlur: ChangeHandler, onChange: ChangeHandler, ref: any },
  // types
  type?: 'text' | 'number' | 'password' | 'email' | 'file' | 'files',
  accept?: string,
  size?: number | 'auto',
  step?: number | 'auto',
  label?: string | ReactElement<typeof TCmp>,
  icon?: ReactNode,
  labelPlacement?: 'top-border' | 'top' | 'left',
  required?: boolean,
}

// export interface InputFileProps<T> extends InputCommonsProps<T> {
//   type?: 'file',
//   accept?: string,
//   size?: never,
//   step?: never,
// }
//
// export interface InputEmailProps<T> extends InputCommonsProps<T> {
//   type?: 'email',
//   accept?: never,
//   size?: never,
//   step?: never,
// }
//
// export interface InputNumberProps<T> extends InputCommonsProps<T> {
//   type?: 'number',
//   accept?: never,
//   size?: number | 'auto',
//   step?: number,
// }
//
// export interface InputTextProps<T> extends InputCommonsProps<T> {
//   type?: 'text' | 'password',
//   accept?: never,
//   size?: number | 'auto',
//   step?: never,
// }

export type InputProps<T> = InputCommonsProps<T>;

export interface InputCheckboxProps {
  name?: string,
  onChange?: (newValue: boolean) => void,
  checked: boolean,
  className?: string,
  label?: ReactNode,
  disabled?: boolean,
}

export interface InputToggleProps {
  onChange?: (newValue: boolean) => void,
  checked: boolean,
  type?: 'rounded' | 'square',
  className?: string,
  leftLabel?: ReactNode,
  rightLabel?: ReactNode,
  size?: 'tiny' | 'small' | 'regular' | 'large',
  disabled?: boolean,
}

export type InputPasswordProps<T> = Omit<InputProps<T>, 'type'>

export interface InputDateProps {
  todayButton?: boolean,
  date: Date | null,
  onDatePick: (date: Date) => void,
  onDateClean?: () => void
  inline?: boolean,
  type?: DateDisplayType,
  isDisabled?: DatePickerDateFunType,
  isSelected?: DatePickerDateFunType,
  baseDate?: Date,
  twoLines?: boolean,
  extend?: boolean,
  withDayName?: boolean,
}

export interface InputSubmitProps {
  name?: string,
  className?: string,
  extend?: boolean,
  type?: ButtonType,
  disabled?: boolean,
  value?: string,
}
