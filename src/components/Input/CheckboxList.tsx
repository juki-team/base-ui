import React from 'react';
import { InputCheckbox } from './InputCheckbox';
import { CheckboxListProps } from './types';

export const CheckboxList = <T, >({ selectedOptions, options, onSelectOptions }: CheckboxListProps<T>) => {
  return (
    <div className="jk-checkbox-list jk-col filled gap">
      {options.map(({ value, label }) => (
        <InputCheckbox
          key={JSON.stringify(value)}
          onChange={() => {
            if (!!selectedOptions.find(option => option.value === value)) {
              onSelectOptions(selectedOptions.filter(option => JSON.stringify(option.value) !== JSON.stringify(value)));
            } else {
              onSelectOptions([...selectedOptions, { value, label }]);
            }
          }}
          checked={!!selectedOptions.find(option => option.value === value)}
          label={label}
        />
      ))}
    </div>
  );
};
