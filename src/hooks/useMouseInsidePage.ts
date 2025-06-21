import { useEffect, useState } from 'react';

export function useMouseInsidePage() {
  const [ isMouseInside, setIsMouseInside ] = useState(true);
  
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      // Si el mouse sale completamente del documento (e.g. a otra ventana/pantalla)
      if (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === 'HTML') {
        setIsMouseInside(false);
        console.log('Mouse salió completamente del documento');
      }
    };
    
    const handleMouseOver = () => {
      if (!isMouseInside) {
        setIsMouseInside(true);
        console.log('Mouse volvió a entrar al documento');
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
