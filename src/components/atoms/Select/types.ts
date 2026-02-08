import type { Ref } from 'react';
import type { ReactNodeOrFunctionType } from '../../types';

export type SelectOptionType<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> = {
  value: T,
  key?: string,
  label: U,
  inputLabel?: V,
  disabled?: boolean
};
export type SelectOption2Type<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> = {
  value: T,
  label?: U,
  inputLabel?: V,
  disabled?: boolean
};

export interface SelectProps<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> {
  className?: string,
  /** @deprecated No longer used — native select handles its own dropdown */
  popoverClassName?: string,
  options: SelectOptionType<T, U, V>[],
  selectedOption: SelectOption2Type<T, U, V>,
  onChange?: (option: SelectOptionType<T, U, V>) => void,
  onBlur?: (event: { target: Ref<HTMLSelectElement> }) => void,
  disabled?: boolean,
  /** @deprecated No longer used — native select handles its own dropdown placement */
  optionsPlacement?: string,
  expand?: boolean,
  containerWidth?: number | 'child',
  /** @deprecated No longer supported — native select renders its own UI */
  children?: never,
}
