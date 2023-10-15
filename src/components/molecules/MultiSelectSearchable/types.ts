import { ReactNode } from 'react';
import { MultiSelectProps, SelectOption2Type, SelectOptionType } from '../../atoms';

export interface SelectSearchableProps<T, U extends ReactNode, V extends ReactNode> extends MultiSelectProps<T, U, V> {
  rowHeightOption?: number,
  onFilter?: (props: {
    search: string,
    option: SelectOptionType<T, U, V>,
    options: SelectOptionType<T, U, V>[],
    selectedOptions: SelectOption2Type<T, U, V>[]
  }) => boolean,
  multiselect?: boolean,
}
