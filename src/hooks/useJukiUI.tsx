import { useContext } from 'react';
import { UIContext } from '../contexts/JukiUIProvider/context';

export const useJukiUI = () => {
  
  const { jukiAppDiv, viewPortSize, viewPortWidth, viewPortHeight, components } = useContext(UIContext);
  
  return {
    jukiAppDiv,
    viewPortSize,
    viewPortWidth,
    viewPortHeight,
    components,
  };
};
