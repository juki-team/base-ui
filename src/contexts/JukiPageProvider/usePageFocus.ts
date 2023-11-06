import { useEffect, useState } from 'react';

export const usePageFocus = () => {
  
  const [ isFocus, setIsFocus ] = useState(true);
  
  useEffect(() => {
    const handlerOnFocus = () => setIsFocus(true);
    const handlerOnBlur = () => setIsFocus(false);
    
    window?.addEventListener('focus', handlerOnFocus);
    window?.addEventListener('blur', handlerOnBlur);
    
    return () => {
      window?.removeEventListener('focus', handlerOnFocus);
      window?.removeEventListener('blur', handlerOnBlur);
    };
  }, []);
  
  return isFocus;
};
