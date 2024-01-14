import React, { memo } from 'react';
import { classNames } from '../../../helpers';
import { useT } from '../../../hooks/useT'; // to prevent circular dependency
import { TProps } from './types';

export const T = memo(({ className = '', children }: TProps) => {
  
  const { t } = useT();
  
  return <span className={classNames(className)}>{t(children)}</span>;
});
