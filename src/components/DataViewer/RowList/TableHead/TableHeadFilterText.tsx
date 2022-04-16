import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, T } from '../../../index';
import { TableHeadFilterTextProps } from './types';

export const TableHeadFilterText = ({ onFilter, onReset, columnIndex, initialText, visible }: TableHeadFilterTextProps) => {
  
  const [value, setValue] = useState(initialText);
  
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);
  
  return (
    <div
      className="jk-col gap filled jk-table-head-cell-filter-text"
      onKeyDown={event => {
        if (event.code === 'Enter') {
          event.preventDefault();
          onFilter({ columnIndex, text: value });
        }
      }}
    >
      <Input onChange={newValue => setValue(newValue)} value={value} block autoFocus ref={inputRef} />
      <div className="jk-row space-between">
        <Button
          size="small"
          type="text"
          onClick={onReset}
          disabled={initialText === ''}
        >
          <T>reset</T>
        </Button>
        <Button size="small" onClick={() => onFilter({ columnIndex, text: value })} disabled={initialText === value}>
          <T>filter</T>
        </Button>
      </div>
    </div>
  );
};