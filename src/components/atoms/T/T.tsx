import React from 'react';
import { classNames } from '../../../helpers';
import { useT } from '../../../hooks/useT';
import { TProps } from './types';

export const T = ({ className = '', children }: TProps) => {
  
  const { t } = useT();
  
  return <span className={classNames(className)}>{t(children)}</span>;
};
