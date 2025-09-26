import { InputCheckbox } from '../../atoms';
import type { CheckboxListProps } from './types';

export function CheckboxList<T, >({ selectedOptions, options, onSelectOptions }: CheckboxListProps<T>) {
  return (
    <div className="jk-checkbox-list jk-col stretch">
      {options.map(({ value, label }, index) => (
        <InputCheckbox
          key={`${JSON.stringify(value)}_${index}`}
          onChange={() => {
            if (!!selectedOptions.find(option => option.value === value)) {
              onSelectOptions(selectedOptions.filter(option => JSON.stringify(option.value) !== JSON.stringify(value)));
            } else {
              onSelectOptions([ ...selectedOptions, { value, label } ]);
            }
          }}
          checked={!!selectedOptions.find(option => option.value === value)}
          label={label}
        />
      ))}
    </div>
  );
};
