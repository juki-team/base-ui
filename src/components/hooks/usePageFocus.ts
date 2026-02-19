import { useEffect, useRef } from 'react';
import { QueryParamKey } from '../../enums';
import { useRouterStore } from '../../stores/router/useRouterStore';

export const usePageFocus = () => {
  
  const searchParams = useRouterStore(state => state.searchParams);
  const pageFocus = searchParams.get(QueryParamKey.PAGE_FOCUS);
  const scrolled = useRef(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let render = 0;
    
    if (pageFocus) {
      
      scrolled.current = false;
      
      const go = () => {
        render++;
        const element = document.getElementById(pageFocus);
        if (element) {
          element.focus();
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          scrolled.current = true;
        } else {
          if (render < 50) {
            timeoutId = setTimeout(go, 200);
          }
        }
      };
      
      if (!scrolled.current) {
        go();
      }
    }
    
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [ pageFocus ]);
  
};
