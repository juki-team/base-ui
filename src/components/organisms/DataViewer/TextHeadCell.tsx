import React from 'react';
import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import { TextHeadCellProps } from './types';

export const TextHeadCell = ({ text, className }: TextHeadCellProps) => {
  return (
    <div className={classNames('text-head-field jk-row', className)}>
      {typeof text === 'string' ? <T className="tt-se">{text}</T> : text}
    </div>
  );
};
