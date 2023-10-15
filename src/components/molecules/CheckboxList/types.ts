import { ReactNode } from 'react';

export type OptionType<T> = { value: T, label: ReactNode };

export interface CheckboxListProps<T> {
  selectedOptions: OptionType<T>[],
  options: OptionType<T>[],
  onSelectOptions: (options: OptionType<T>[]) => void,
}
