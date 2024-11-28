import type { ReactElement, ReactNode } from 'react';
import type { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import type { DateDisplayType, ReactNodeOrFunctionType } from '../../../types';
import type { DatePickerDateFunType } from '../../molecules';
import type { ButtonType } from '../Button';
import type { SelectOption2Type, SelectProps } from '../Select';
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
  register?: UseFormRegisterReturn | ((setValueAs: (value: T) => void) => UseFormRegisterReturn),  //{ name: string, onBlur: ChangeHandler, onChange: ChangeHandler, ref: any },
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

export type InputPasswordProps<T> = Omit<InputProps<T>, 'type'>;

export type InputSelectProps<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> =
  Omit<InputProps<T>, 'type' | 'onChange' | 'value' | 'register'>
  & Omit<SelectProps<T, U, V>, 'selectedOption'> & { selectedOption?: SelectOption2Type<T, U, V>, }
  & { register?: UseFormRegisterReturn & { setValue: UseFormSetValue<any> } };

export type InputCellPhoneNumberProps<T> = Omit<InputProps<T>, 'type'>;

export type InputTextAreaProps = Omit<InputProps<string>, 'type'>;

export interface InputDateProps {
  disabled?: boolean,
  todayButton?: boolean,
  date: Date | null,
  onDatePick: (date: Date, onClose: () => void) => void,
  onDateClean?: () => void
  inline?: boolean,
  type?: DateDisplayType,
  isDisabled?: DatePickerDateFunType,
  isSelected?: DatePickerDateFunType,
  baseDate?: Date,
  twoLines?: boolean,
  extend?: boolean,
  withDayName?: boolean,
  inputLabel?: (inputDateProps: InputDateProps, onClose: () => void) => ReactNode,
}

export interface InputSubmitProps {
  name?: string,
  className?: string,
  extend?: boolean,
  type?: ButtonType,
  disabled?: boolean,
  value?: string,
}
