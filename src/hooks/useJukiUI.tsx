import { useContext } from 'react';
import { UIContext } from '../contexts/JukiUIProvider/context';

export const useJukiUI = () => {
  
  const { jukiAppDivRef, viewPortSize, viewPortWidth, viewPortHeight, components } = useContext(UIContext);
  
  return {
    jukiAppDivRef,
    viewPortSize,
    viewPortWidth,
    viewPortHeight,
    components,
  };
};
