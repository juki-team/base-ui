import React from 'react';
import { T } from '../../../atoms';
import { ButtonSizeType } from '../../../atoms/Button/types';
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
      size: 'tiny' as ButtonSizeType,
      label: <T className="tt-se">move up</T>,
      onClick: () => {
        onChange((list) => {
          const newSheets = [ ...list ];
          const next = newSheets[index - 1];
          if (newSheets[index] && next) {
            [ newSheets[index], newSheets[index - 1] ] = [ next, newSheets[index] ];
          }
          return newSheets;
        });
      },
      disabled: index === 0,
    });
  }
  
  actionButtons.push({
    icon: <DeleteIcon />,
    size: 'tiny' as ButtonSizeType,
    label: <T className="tt-se">remove</T>,
    onClick: () => {
      onChange((list) => list.filter((_, i) => i !== index));
    },
  });
  
  if (index !== length - 1) {
    actionButtons.push({
      icon: <ArrowDownwardIcon />,
      size: 'tiny' as ButtonSizeType,
      label: <T className="tt-se">move down</T>,
      onClick: () => {
        onChange((list) => {
          const newSheets = [ ...list ];
          const next = newSheets[index + 1];
          if (newSheets[index] && next) {
            [ newSheets[index], newSheets[index + 1] ] = [ next, newSheets[index] ];
          }
          return newSheets;
        });
      },
      disabled: index === length - 1,
    });
  }
  
  return actionButtons;
};
