import type { ReactNode } from 'react';
import type { PlacementType } from '../_lazy_/Popover/types';
import type { SelectOption2Type, SelectOptionType } from '../Select/types';

export interface MultiSelectProps<T, U extends ReactNode, V extends ReactNode> {
  className?: string,
  options: SelectOptionType<T, U, V>[],
  selectedOptions: SelectOption2Type<T, U, V>[],
  onChange?: (options: SelectOptionType<T, U, V>[], lastOptionChanged: SelectOptionType<T, U, V> | undefined) => void,
  showOptions?: boolean,
  onChangeShowOptions?: (value: boolean) => void,
  disabled?: boolean,
  optionsPlacement?: PlacementType,
  expand?: boolean,
  children?: ReactNode,
  containerWidth?: number | 'child',
}
