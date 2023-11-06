import { useContext } from 'react';
import { UIContext } from '../contexts/JukiUIProvider/context';

export const useJukiUI = () => {
  
  const { ref, viewPortSize, components } = useContext(UIContext);
  
  return {
    ref,
    viewPortSize,
    components,
  };
};
