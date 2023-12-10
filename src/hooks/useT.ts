import { consoleError } from '@juki-team/commons';
import { useContext } from 'react';
import { TContext } from '../contexts/JukiTProvider/context';

export const useT = () => {
  
  const { i18n } = useContext(TContext);
  
  // @ts-ignore
  if (i18n?.mocked) {
    consoleError('i18n not configured');
  }
  
  return i18n;
};
