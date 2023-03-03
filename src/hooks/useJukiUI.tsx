import { useContext } from 'react';
import { UIContext } from '../components';

export const useJukiUI = () => {
  
  const { isPageVisible, isPageFocus, viewPortSize, router, components, isOnline } = useContext(UIContext);
  
  return {
    isPageVisible,
    isPageFocus,
    viewPortSize,
    isOnline,
    components,
    router,
  };
};
