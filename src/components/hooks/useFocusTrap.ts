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
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  // Read .current during render so React tracks it as a dependency.
  // This ensures the effect re-runs when the element mounts after isActive is true.
  const container = containerRef.current;

  useEffect(() => {
    if (!isActive || !container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      );

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
  }, [ container, isActive ]);
}
