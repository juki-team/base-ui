import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(clickOutside: (event: MouseEvent) => void, ref: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        clickOutside(event);
      }
    }
    
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ clickOutside, ref ]);
}

export function useOutsideAlerterAnd(clickOutside: (event: MouseEvent) => void, ...refs: any) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      
      let and = false;
      for (const ref of refs) {
        if (ref.current?.contains(event.target)) {
          and = true;
        }
      }
      if (!and) {
        clickOutside(event);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ clickOutside, refs ]);
}
