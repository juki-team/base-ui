import { useContext } from 'react';
import { UIContext } from '../contexts/JukiUIProvider/context';


export const useJukiUI = () => {
  
  const { ref, isPageVisible, isPageFocus, viewPortSize, router, components, isOnline } = useContext(UIContext);
  
  return {
    ref,
    isPageVisible,
    isPageFocus,
    viewPortSize,
    isOnline,
    components,
    router,
  };
};
