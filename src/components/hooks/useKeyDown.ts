import { useEffect } from 'react';
import { useStableRef } from './useStableRef';

export function useKeyDown(handleKeyPress: (event: KeyboardEvent) => void) {
  const handleKeyPressRef = useStableRef(handleKeyPress);
  
  useEffect(() => {
    const handler = (event: KeyboardEvent) => handleKeyPressRef.current(event);
    document.addEventListener('keydown', handler, { capture: true });
    return () => {
      document.removeEventListener('keydown', handler, { capture: true });
    };
  }, [ handleKeyPressRef ]);
}
