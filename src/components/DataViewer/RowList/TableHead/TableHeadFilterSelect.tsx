import React, { useEffect, useRef, useState } from 'react';
import { Button, CheckboxList, OptionType, T } from '../../../index';
import { TableHeadFilterSelectProps } from './types';

export const TableHeadFilterSelect = ({
  onFilter,
  onReset,
  columnIndex,
  options,
  initialSelectedOptions,
  visible,
}: TableHeadFilterSelectProps) => {
  
  const [selectedOptions, setSelectedOptions] = useState<OptionType<string>[]>(initialSelectedOptions);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (visible) {
      buttonRef.current?.focus();
    }
    setSelectedOptions(initialSelectedOptions);
  }, [initialSelectedOptions, visible]);
  
  return (
    <div className="jk-col gap filled jk-table-head-cell-filter-select">
      <div className="checkbox-list">
        <CheckboxList options={options} selectedOptions={selectedOptions} onSelectOptions={setSelectedOptions} />
      </div>
      <div className="jk-row space-between">
        <Button
          size="small"
          type="text"
          onClick={onReset}
          disabled={!initialSelectedOptions.length}
        >
          <T>reset</T>
        </Button>
        <Button
          size="small"
          onClick={() => onFilter({ columnIndex, selectedOptions })}
          disabled={JSON.stringify(initialSelectedOptions.map(({ value }) => value)) === JSON.stringify(selectedOptions.map(({ value }) => value))}
          ref={buttonRef}
        >
          <T>filter</T>
        </Button>
      </div>
    </div>
  );
};