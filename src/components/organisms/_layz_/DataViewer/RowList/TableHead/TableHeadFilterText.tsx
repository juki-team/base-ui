import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../../atoms/Button/Button';
import { Input } from '../../../../../atoms/Input/Input';
import { T } from '../../../../../atoms/T/T';
import type { TableHeadFilterTextProps } from './types';

export const TableHeadFilterText = (props: TableHeadFilterTextProps) => {
  const { onFilter, onReset, columnIndex, initialText, visible } = props;

  const [value, setValue] = useState(initialText);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: keyboard-only handler captures Enter from the inner Input to apply filter
    <div
      className="jk-col gap stretch jk-table-head-cell-filter-text jk-pg-sm"
      onKeyDown={(event) => {
        if (event.code === 'Enter') {
          event.preventDefault();
          onFilter({ columnIndex, text: value });
        }
      }}
    >
      <Input onChange={(newValue) => setValue(newValue)} value={value} expand autoFocus ref={inputRef} />
      <div className="jk-row right gap">
        <Button size="tiny" type="secondary" onClick={onReset} disabled={initialText === ''}>
          <T className="tt-se">reset</T>
        </Button>
        <Button size="tiny" onClick={() => onFilter({ columnIndex, text: value })} disabled={initialText === value}>
          <T className="tt-se">filter</T>
        </Button>
      </div>
    </div>
  );
};
