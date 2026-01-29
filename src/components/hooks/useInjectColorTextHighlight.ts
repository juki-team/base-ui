import { useEffect } from 'react';

export const useInjectColorTextHighlight = (colorTextHighlight?: string) => {
  
  useEffect(() => {
    document.querySelector('body')?.style.removeProperty('--cr-tx-ht');
    if (colorTextHighlight) {
      document.querySelector('body')?.style.setProperty('--cr-tx-ht', colorTextHighlight);
    }
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--cr-tx-ht');
    };
  }, [ colorTextHighlight ]);
};
