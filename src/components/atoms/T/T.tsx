import React from 'react';
import { classNames } from '../../../helpers';
import { jukiGlobalStore } from '../../../settings'; // to prevent circular dependency
import { TProps } from './types';

export const T = ({ className = '', children, style }: TProps) => {
  
  const { t, language } = jukiGlobalStore.getI18n();
  
  return <span className={classNames(className)} style={style} key={language}>{t(children)}</span>;
};
