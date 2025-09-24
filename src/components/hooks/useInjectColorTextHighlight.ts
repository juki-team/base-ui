import { useEffect } from 'react';

export const useInjectColorTextHighlight = (colorTextHighlight?: string) => {
  
  useEffect(() => {
    if (colorTextHighlight) {
      document.querySelector('body')?.style.removeProperty('--t-color-text-highlight');
      document.querySelector('body')?.style.setProperty('--t-color-text-highlight', colorTextHighlight);
    }
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--t-color-text-highlight');
    };
  }, [ colorTextHighlight ]);
};
