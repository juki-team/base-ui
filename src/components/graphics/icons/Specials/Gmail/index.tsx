import React from 'react';
import { classNames } from '../../../../../helpers';
import { IconProps } from '../../types';
import Gmail from './Gmail';

export const GmailIcon = ({ size = 'regular', className = '', percent = 100, ...props }: IconProps & { percent?: number }) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)} style={{ position: 'relative' }}>
      <Gmail />
    </span>
  );
};
