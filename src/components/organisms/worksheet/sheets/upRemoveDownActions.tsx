import React from 'react';
import { T } from '../../../atoms';
import { ArrowDownwardIcon, ArrowUpwardIcon, DeleteIcon } from '../../../atoms/server';

interface UpRemoveDownButtonsProps<T> {
  index: number,
  length: number,
  onChange: (callback: ((newList: T[]) => T[])) => void,
}

export const upRemoveDownButtons = <T, >({ index, length, onChange }: UpRemoveDownButtonsProps<T>) => {
  
  const actionButtons = [];
  
  if (index !== 0) {
    actionButtons.push({
      icon: <ArrowUpwardIcon />,
      label: <T>move up</T>,
      onClick: () => {
        onChange((list) => {
          const newSheets = [ ...list ];
          [ newSheets[index], newSheets[index - 1] ] = [ newSheets[index - 1], newSheets[index] ];
          return newSheets;
        });
      },
      disabled: index === 0,
    });
  }
  
  actionButtons.push({
    icon: <DeleteIcon />,
    label: <T>remove</T>,
    onClick: () => {
      onChange((list) => list.filter((_, i) => i !== index));
    },
  });
  
  if (index !== length - 1) {
    actionButtons.push({
      icon: <ArrowDownwardIcon />,
      label: <T>move down</T>,
      onClick: () => {
        onChange((list) => {
          const newSheets = [ ...list ];
          [ newSheets[index], newSheets[index + 1] ] = [ newSheets[index + 1], newSheets[index] ];
          return newSheets;
        });
      },
      disabled: index === length - 1,
    });
  }
  
  return actionButtons;
};
