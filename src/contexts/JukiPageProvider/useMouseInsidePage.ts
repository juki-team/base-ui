import { useEffect } from 'react';
import { usePageStore } from '../../stores/page/usePageStore';

export function useMouseInsidePage() {
  
  const setIsMouseInside = usePageStore(store => store.setIsMouseInside);
  
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === 'HTML') {
        setIsMouseInside(false);
      }
    };
    
    const handleMouseOver = () => setIsMouseInside(true);
    
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [ setIsMouseInside ]);
  
}
