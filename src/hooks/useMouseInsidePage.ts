import { useEffect, useState } from 'react';

export function useMouseInsidePage() {
  const [ isMouseInside, setIsMouseInside ] = useState(true);
  
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === 'HTML') {
        setIsMouseInside(false);
      }
    };
    
    const handleMouseOver = () => {
      if (!isMouseInside) {
        setIsMouseInside(true);
      }
    };
    
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [ isMouseInside ]);
  
  return isMouseInside;
}
