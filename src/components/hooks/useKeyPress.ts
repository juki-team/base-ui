import { useEffect } from 'react';

// not recommended, call every time
export function useKeyPress(handleKeyPress: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ handleKeyPress ]);
}
