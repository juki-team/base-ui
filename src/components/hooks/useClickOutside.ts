import { RefObject, useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickOutside(clickOutside: (event: MouseEvent) => void, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && event.target && !ref.current.contains(event.target as Node)) {
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
