import React, { memo } from 'react';
import { classNames } from '../../../helpers';
import { jukiGlobalStore } from '../../../settings'; // to prevent circular dependency
import { TProps } from './types';

export const T = memo(({ className = '', children }: TProps) => {
  
  const { t } = jukiGlobalStore.getI18n();
  
  return <span className={classNames(className)}>{t(children)}</span>;
});
