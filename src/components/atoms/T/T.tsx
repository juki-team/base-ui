import React from 'react';
import { classNames } from '../../../helpers';
import { useI18nStore } from '../../../stores';
import { TProps } from './types';

export const T = ({ className = '', children, style }: TProps) => {
  
  const t = useI18nStore(state => state.i18n.t);
  
  return <span className={classNames(className)} style={style}>{t(children)}</span>;
};
