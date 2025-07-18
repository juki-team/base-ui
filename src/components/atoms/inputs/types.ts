import type { ComponentPropsWithRef, KeyboardEventHandler, ReactElement, ReactNode } from 'react';
import type { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import type { ReactNodeOrFunctionType } from '../../../types';
import type { ButtonType } from '../Button/types';
import type { SelectOption2Type, SelectProps } from '../Select/types';
import { T as TCmp } from '../T/T';
import { TextAreaProps } from '../TextArea/types';
import { Input } from './Input';

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
  inputClassName?: string,
  labelClassName?: string,
  expand?: boolean,
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
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
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

export type CmpInputProps<T> = InputCommonsProps<T>;

export type InputProps<T> = ComponentPropsWithRef<typeof Input<T>>;

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

export type InputPasswordProps = Omit<InputProps<string>, 'type'>;

export type InputSelectProps<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> =
  Omit<InputProps<T>, 'type' | 'onChange' | 'value' | 'register'>
  & Omit<SelectProps<T, U, V>, 'selectedOption'> & { selectedOption?: SelectOption2Type<T, U, V>, }
  & { register?: UseFormRegisterReturn & { setValue: UseFormSetValue<any> } };

export type InputCellPhoneNumberProps = Omit<InputProps<string>, 'type'>;

export type InputTextAreaProps = Omit<InputProps<string>, 'type'> & TextAreaProps;

export interface InputSubmitProps {
  name?: string,
  className?: string,
  extend?: boolean,
  type?: ButtonType,
  disabled?: boolean,
  value?: string,
}

export interface InputRadioProps extends InputCheckboxProps {
}
