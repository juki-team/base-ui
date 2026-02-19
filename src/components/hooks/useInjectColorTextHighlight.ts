import { useEffect } from 'react';

export const useInjectColorTextHighlight = (colorTextHighlight?: string) => {
  
  useEffect(() => {
    document.body.style.removeProperty('--cr-tx-ht');
    if (colorTextHighlight) {
      document.body.style.setProperty('--cr-tx-ht', colorTextHighlight);
    }
    
    return () => {
      document.body.style.removeProperty('--cr-tx-ht');
    };
  }, [ colorTextHighlight ]);
};
