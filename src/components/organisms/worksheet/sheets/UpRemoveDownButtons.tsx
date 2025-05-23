import React from 'react';
import { Button } from '../../../atoms';
import { ArrowDownwardIcon, ArrowUpwardIcon, DeleteIcon } from '../../../atoms/server';

interface UpRemoveDownButtonsProps<T> {
  index: number,
  length: number,
  onChange: (callback: ((newList: T[]) => T[])) => void,
}

export const UpRemoveDownButtons = <T, >({ index, length, onChange }: UpRemoveDownButtonsProps<T>) => {
  return (
    <div className="jk-col gap">
      <Button
        size="small"
        icon={<ArrowUpwardIcon />}
        disabled={index === 0}
        onClick={() => {
          onChange((list) => {
            const newSheets = [ ...list ];
            [ newSheets[index], newSheets[index - 1] ] = [ newSheets[index - 1], newSheets[index] ];
            return newSheets;
          });
        }}
      />
      <Button
        size="small"
        icon={<DeleteIcon />}
        onClick={() => {
          onChange((list) => list.filter((_, i) => i !== index));
        }}
      />
      <Button
        size="small"
        icon={<ArrowDownwardIcon />}
        disabled={index === length - 1}
        onClick={() => {
          onChange((list) => {
            const newSheets = [ ...list ];
            [ newSheets[index], newSheets[index + 1] ] = [ newSheets[index + 1], newSheets[index] ];
            return newSheets;
          });
        }}
      />
    </div>
  );
};
