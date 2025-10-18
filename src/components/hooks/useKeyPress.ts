import { useEffect } from 'react';

// not recommended, call every time
export function useKeyPress(handleKeyPress: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, { capture: true });
    return () => {
      document.removeEventListener('keydown', handleKeyPress, { capture: true });
    };
  }, [ handleKeyPress ]);
}
