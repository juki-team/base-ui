import React from 'react';
import { classNames } from '../../../helpers';
import { jukiGlobalStore } from '../../../settings'; // to prevent circular dependency
import { TProps } from './types';

export const T = ({ className = '', children }: TProps) => {
  
  const { t } = jukiGlobalStore.getI18n();
  
  return <span className={classNames(className)}>{t(children)}</span>;
};
