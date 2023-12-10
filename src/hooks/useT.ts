import { useContext } from 'react';
import { TContext } from '../contexts/JukiTProvider/context';

export const useT = () => {
  
  const { i18n } = useContext(TContext);
  
  if (!i18n) {
    console.error('i18n not configured');
  }
  
  return i18n;
};
