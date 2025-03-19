import React, { useEffect, useRef, useState } from 'react';
import { Button, T } from '../../../../atoms';
import { CheckboxList } from '../../../../molecules';
import { OptionType } from '../../../../molecules/types';
import { TableHeadFilterSelectProps } from './types';

export const TableHeadFilterSelect = (props: TableHeadFilterSelectProps) => {
  
  const {
    onFilter,
    onReset,
    columnIndex,
    options,
    initialSelectedOptions,
    visible,
  } = props;
  
  const [ selectedOptions, setSelectedOptions ] = useState<OptionType<string>[]>(initialSelectedOptions);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (visible) {
      buttonRef.current?.focus();
    }
    setSelectedOptions(initialSelectedOptions);
  }, [ initialSelectedOptions, visible ]);
  
  return (
    <div className="jk-col gap stretch jk-table-head-cell-filter-select jk-pg-sm jk-br-ie bc-we elevation-1">
      <div className="checkbox-list">
        <CheckboxList options={options} selectedOptions={selectedOptions} onSelectOptions={setSelectedOptions} />
      </div>
      <div className="jk-row right gap">
        <Button
          size="tiny"
          type="light"
          onClick={onReset}
          disabled={!initialSelectedOptions.length}
        >
          <T>reset</T>
        </Button>
        <Button
          size="tiny"
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
