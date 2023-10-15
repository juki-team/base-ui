import { ReactNode } from 'react';
import { PlacementType } from '../Popover';
import { SelectOption2Type, SelectOptionType } from '../Select';

export interface MultiSelectProps<T, U extends ReactNode, V extends ReactNode> {
  className?: string,
  options: SelectOptionType<T, U, V>[],
  selectedOptions: SelectOption2Type<T, U, V>[],
  onChange?: (options: SelectOptionType<T, U, V>[]) => void,
  showOptions?: boolean,
  onChangeShowOptions?: (value: boolean) => void,
  disabled?: boolean,
  optionsPlacement?: PlacementType,
  extend?: boolean,
}
