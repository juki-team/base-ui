import { useEffect } from 'react';
import { useStableRef } from './useStableRef';

//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useStableRef(callback);
  
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    
    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => null;
  }, [ delay, savedCallback ]);
}
