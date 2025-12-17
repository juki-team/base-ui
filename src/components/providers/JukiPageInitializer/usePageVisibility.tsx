// https://github.com/pgilad/react-page-visibility
// https://github.com/pgilad/react-page-visibility/blob/master/src/utils.js
import { useEffect } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { getHandlerArgs, isSupported, visibility } from '../../helpers/visibility';

const isSupportedLocal = isSupported && !!visibility;

export const usePageVisibility = () => {
  
  const setIsVisible = usePageStore(store => store.setIsVisible);
  
  useEffect(() => {
    if (!isSupportedLocal) {
      return;
    }
    const handler = () => {
      const [ currentlyVisible ] = getHandlerArgs();
      setIsVisible(currentlyVisible);
    };
    
    handler();
    
    document.addEventListener(visibility!.event, handler);
    
    return () => {
      document.removeEventListener(visibility!.event, handler);
    };
  }, [ setIsVisible ]);
  
};
