import { type RefObject, useEffect } from 'react';

/**
 * Hook to trap focus within a container element
 * Useful for modals, dialogs, and other overlay components to ensure keyboard users
 * can't accidentally tab out of the focused area
 *
 * @param containerRef - React ref to the container element
 * @param isActive - Whether the focus trap should be active
 *
 * @example
 * ```tsx
 * const modalRef = useRef<HTMLDivElement>(null);
 * useFocusTrap(modalRef, isOpen);
 *
 * return <div ref={modalRef} tabIndex={-1}>...</div>
 * ```
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    
    const getFocusableElements = (): HTMLElement[] => {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');
      
      return Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors),
      );
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
      const focusableElements = getFocusableElements();
      
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [ containerRef, isActive ]);
}
