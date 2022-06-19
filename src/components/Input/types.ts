import { PropsWithChildren, ReactNode } from 'react';
import { ChangeHandler } from 'react-hook-form';
import { ReactNodeOrFunctionType } from '../../types';
import { ButtonType, PlacementType } from '../index';

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
  block?: boolean,
  onClick?: () => void,
  autoFocus?: boolean,
  placeholder?: string,
  register?: { name: string, onBlur: ChangeHandler, onChange: ChangeHandler, ref: any },
  // types
  type?: 'text' | 'number' | 'password' | 'email' | 'file',
  accept?: string,
  size?: number | 'auto',
  step?: number | 'auto',
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

export type InputPasswordProps<T> = Omit<InputProps<T>, 'type'>

export interface InputSubmitProps {
  name?: string,
  className?: string,
  block?: boolean,
  type?: ButtonType,
  disabled?: boolean,
  value?: string,
}

export interface InputCheckboxProps {
  name?: string,
  onChange?: (newValue: boolean) => void,
  checked: boolean,
  className?: string,
  label?: ReactNode,
  disabled?: boolean,
}

export type FieldEditableProps<T> = PropsWithChildren<{
  value: T,
  onChange: (value: T) => void,
  hotChange?: boolean,
  type?: 'text' | 'email',
}>

export type SelectOptionType<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> = { value: T, label: U, inputLabel?: V, disabled?: boolean };
export type SelectOption2Type<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> = { value: T, label?: U, inputLabel?: V, disabled?: boolean };

export interface SelectProps<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> {
  className?: string,
  options: SelectOptionType<T, U, V>[],
  selectedOption: SelectOption2Type<T, U, V>,
  onChange?: (option: SelectOptionType<T, U, V>) => void,
  showOptions?: boolean,
  onChangeShowOptions?: (value: boolean) => void,
  disabled?: boolean,
  optionsPlacement?: PlacementType,
  extend?: boolean,
}

export interface MultiSelectProps<T, U extends ReactNode, V extends ReactNode> {
  className?: string,
  options: SelectOptionType<T, U, V>[],
  selectedOptions: SelectOption2Type<T, U, V>[],
  onChange?: (options: SelectOptionType<T, U, V>[]) => void,
  showOptions?: boolean,
  onChangeShowOptions?: (value: boolean) => void,
  disabled?: boolean,
  optionsPlacement?: PlacementType,
  block?: boolean,
}

export interface SelectSearchableProps<T, U extends ReactNode, V extends ReactNode> extends MultiSelectProps<T, U, V> {
  rowHeightOption?: number,
  onFilter?: (props: { search: string, option: SelectOptionType<T, U, V>, options: SelectOptionType<T, U, V>[], selectedOptions: SelectOption2Type<T, U, V>[] }) => boolean,
  multiselect?: boolean,
}

export interface InputToggleProps {
  onChange: (newValue: boolean) => void,
  checked: boolean,
  type?: 'rounded' | 'square',
  className?: string,
  leftLabel?: ReactNode,
  rightLabel?: ReactNode,
}

export type OptionType<T> = { value: T, label: ReactNode };

export interface CheckboxListProps<T> {
  selectedOptions: OptionType<T>[],
  options: OptionType<T>[],
  onSelectOptions: (options: OptionType<T>[]) => void,
}

export type DatePickerType =
  'year'
  | 'year-month'
  | 'year-month-day'
  | 'year-month-day-hours'
  | 'year-month-day-hours-minutes'
  | 'year-month-day-hours-minutes-seconds'
  | 'year-month-day-hours-minutes-seconds-milliseconds'
  | 'hours'
  | 'hours-minutes'
  | 'hours-minutes-seconds'
  | 'hours-minutes-seconds-milliseconds';

export type DatePickerDateFunType = (date: Date) => ({ year?: boolean, month?: boolean, day?: boolean, hours?: boolean, minutes?: boolean, seconds?: boolean, milliseconds?: boolean });

export interface DatePickerProps {
  baseDate?: Date,
  onChange: (date: Date) => void,
  type?: DatePickerType,
  isDisabled?: DatePickerDateFunType,
  isSelected?: DatePickerDateFunType,
}

export interface InputDateProps {
  date: Date | null,
  onDatePick: (date: Date) => void,
  onDateClean?: () => void
  inline?: boolean,
  type?: DatePickerType,
  isDisabled?: DatePickerDateFunType,
  isSelected?: DatePickerDateFunType,
  baseDate?: Date,
  twoLines?: boolean,
  extend?: boolean,
}

export interface DateLiteralProps {
  date: Date,
  className?: string,
  show?: DatePickerType,
  twoLines?: boolean,
}
