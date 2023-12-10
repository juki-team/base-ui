import { useContext } from 'react';
import { TContext } from '../contexts/JukiTProvider/context';

export const useT = () => {
  
  const { t } = useContext(TContext);
  
  return { t };
};
