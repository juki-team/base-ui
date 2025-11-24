import { useEffect } from 'react';
import { usePageStore } from '../../stores/page/usePageStore';

export const useOnline = () => {
  
  const setOnline = usePageStore(store => store.setOnline);
  
  useEffect(() => {
    
    const updateOnlineStatus = () => setOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [ setOnline ]);
  
};
