import { useContext } from 'react';
import { PageContext } from '../contexts/JukiPageProvider/context';

export const useJukiPage = () => {
  
  const { isOnline, isPageFocus, isPageVisible } = useContext(PageContext);
  
  return {
    isOnline,
    isPageFocus,
    isPageVisible,
  };
};
