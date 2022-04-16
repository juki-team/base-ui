import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '../../helpers';

export const useT = () => {
  
  const { t, i18n } = useTranslation();
  
  return { t, i18n };
};

export const T = ({ className = '', children }: { className?: string, children: string }) => {
  
  const { t } = useTranslation();
  
  return <span className={classNames(className)}>{t(children)}</span>;
};
