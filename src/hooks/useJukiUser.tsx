import { useContext } from 'react';
import { UIContext } from '../components';

export const useJukiUI = () => {
  
  const { isPageVisible, isPageFocus, viewPortSize } = useContext(UIContext);
  
  return {
    isPageVisible,
    isPageFocus,
    viewPortSize,
  };
};
