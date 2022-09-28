// https://github.com/pgilad/react-page-visibility
// https://github.com/pgilad/react-page-visibility/blob/master/src/utils.js
import { useEffect, useState } from 'react';

import { getHandlerArgs, isSupported, visibility } from '../helpers';

const isSupportedLocal = isSupported && visibility;

export const usePageVisibility = () => {
  const [initiallyVisible] = getHandlerArgs();
  
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  
  useEffect(() => {
    if (isSupportedLocal) {
      const handler = () => {
        const [currentlyVisible] = getHandlerArgs();
        
        setIsVisible(currentlyVisible);
      };
      
      document.addEventListener(visibility?.event!, handler);
      
      return () => {
        document.removeEventListener(visibility?.event!, handler);
      };
    }
    return () => null;
  }, []);
  
  return isVisible;
};

export const usePageFocus = () => {
  
  const [isFocus, setIsFocus] = useState(true);
  
  useEffect(() => {
    const handlerOnFocus = () => setIsFocus(true);
    const handlerOnBlur = () => setIsFocus(false);
    
    document.addEventListener('focus', handlerOnFocus);
    document.addEventListener('blur', handlerOnBlur);
    
    return () => {
      document.removeEventListener('focus', handlerOnFocus);
      document.removeEventListener('blur', handlerOnBlur);
    };
  }, []);
  
  return isFocus;
};
