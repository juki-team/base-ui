// https://github.com/pgilad/react-page-visibility
// https://github.com/pgilad/react-page-visibility/blob/master/src/utils.js
import { useEffect } from 'react';
import { getHandlerArgs, isSupported, visibility } from '../../components/helpers/visibility';
import { usePageStore } from '../../stores/page/usePageStore';

const isSupportedLocal = isSupported && visibility;

export const usePageVisibility = () => {
  
  const setIsVisible = usePageStore(store => store.setIsVisible);
  
  useEffect(() => {
    if (isSupportedLocal) {
      const handler = () => {
        const [ currentlyVisible ] = getHandlerArgs();
        setIsVisible(currentlyVisible);
      };
      
      document.addEventListener(visibility?.event!, handler);
      
      return () => {
        document.removeEventListener(visibility?.event!, handler);
      };
    }
    return () => null;
  }, [ setIsVisible ]);
  
};
