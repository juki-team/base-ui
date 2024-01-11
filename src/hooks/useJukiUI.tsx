import { useContext } from 'react';
import { UIContext } from '../contexts/JukiUIProvider/context';

export const useJukiUI = () => {
  
  const { ref, viewPortSize, viewPortWidth, viewPortHeight, components } = useContext(UIContext);
  
  return {
    ref,
    viewPortSize,
    viewPortWidth,
    viewPortHeight,
    components,
  };
};
