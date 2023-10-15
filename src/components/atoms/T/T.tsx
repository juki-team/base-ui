import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '../../../helpers';
import { TProps } from './types';

export const T = ({ className = '', children }: TProps) => {
  
  const { t } = useTranslation();
  
  return <span className={classNames(className)}>{t(children)}</span>;
};
