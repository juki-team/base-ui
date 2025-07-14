import { useEffect } from 'react';
import { usePageStore } from '../../stores/page/usePageStore';

export const usePageFocus = () => {
  
  const setIsFocus = usePageStore(store => store.setIsFocus);
  
  useEffect(() => {
    const handlerOnFocus = () => setIsFocus(true);
    const handlerOnBlur = () => setIsFocus(false);
    
    window?.addEventListener('focus', handlerOnFocus);
    window?.addEventListener('blur', handlerOnBlur);
    
    return () => {
      window?.removeEventListener('focus', handlerOnFocus);
      window?.removeEventListener('blur', handlerOnBlur);
    };
  }, [ setIsFocus ]);
  
};
