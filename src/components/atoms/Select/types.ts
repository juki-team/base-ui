import type { LegacyRef, ReactNode } from 'react';
import type { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../../../types';
import type { PlacementType } from '../Popover/types';

export type SelectOptionType<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType> = {
  value: T,
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
  popoverClassName?: string,
  options: SelectOptionType<T, U, V>[],
  selectedOption: SelectOption2Type<T, U, V>,
  onChange?: (option: SelectOptionType<T, U, V>) => void,
  onBlur?: (event: { target: LegacyRef<HTMLDivElement> }) => void,
  // showOptions?: boolean,
  // onChangeShowOptions?: (value: boolean) => void,
  disabled?: boolean,
  optionsPlacement?: PlacementType,
  expand?: boolean,
  containerWidth?: number,
  children?: ReactNodeOrFunctionP1Type<{
    options: SelectOptionType<T, U, V>[],
    isOpen: boolean,
    disabled: boolean,
    optionSelected: SelectOptionType<T, U, V>,
    expandIcon: ReactNode,
  }>
}
