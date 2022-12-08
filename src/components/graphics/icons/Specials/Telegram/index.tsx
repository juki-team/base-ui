import React from 'react';
import { classNames } from '../../../../../helpers';
import { IconProps } from '../../types';
import Balloon from './Balloon';

export const BalloonIcon = ({ size = 'regular', className = '', percent = 100, ...props }: IconProps & { percent?: number }) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)} style={{ position: 'relative' }}>
      <Balloon percent={Math.min(Math.max(1, percent), 100)} />
    </span>
  );
};