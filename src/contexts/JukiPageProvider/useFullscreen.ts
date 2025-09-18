import { useEffect } from 'react';
import { usePageStore } from '../../stores/page/usePageStore';

export const useFullscreen = () => {
  
  const setIsFullscreen = usePageStore(store => store.setIsFullscreen);
  
  useEffect(() => {
    
    const updateOnlineStatus = () => setIsFullscreen(!!document.fullscreenElement);
    
    window.addEventListener('fullscreenchange', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('fullscreenchange', updateOnlineStatus);
    };
  }, [ setIsFullscreen ]);
  
};
