import { PropsWithChildren, ReactNode } from 'react';
import { ChangeHandler } from 'react-hook-form';
import { ButtonType, placementType } from '../index';

export interface InputProps<T> {
  onChange?: (newValue: T) => void,
  value?: T,
  name?: string,
  type?: 'text' | 'number' | 'email',
  // offline?: boolean
  className?: string,
  block?: boolean,
  onClick?: () => void,
  autoFocus?: boolean,
  placeholder?: string,
  register?: { name: string, onBlur: ChangeHandler, onChange: ChangeHandler, ref: any },
}

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

export type SelectOptionType<T, U extends ReactNode> = { value: T, label: U, disabled?: boolean };
export type SelectOption2Type<T, U extends ReactNode> = { value: T, label?: U, disabled?: boolean };

export interface SelectProps<T, U extends ReactNode> {
  className?: string,
  options: SelectOptionType<T, U>[],
  optionSelected: SelectOption2Type<T, U>,
  onChange?: (option: SelectOptionType<T, U>) => void,
  showOptions?: boolean,
  onChangeShowOptions?: (value: boolean) => void,
  disabled?: boolean,
  optionsPlacement?: placementType,
}

export interface MultiSelectProps<T, U extends ReactNode> {
  className?: string,
  options: SelectOptionType<T, U>[],
  optionsSelected: SelectOption2Type<T, U>[],
  onChange?: (options: SelectOptionType<T, U>[]) => void,
  showOptions?: boolean,
  onChangeShowOptions?: (value: boolean) => void,
  disabled?: boolean,
  optionsPlacement?: placementType,
  block?: boolean,
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
}

export interface DateLiteralProps {
  date: Date,
  className?: string,
  show?: DatePickerType,
  twoLines?: boolean,
}
