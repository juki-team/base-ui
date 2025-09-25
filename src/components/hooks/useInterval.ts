import { useEffect, useRef } from 'react';

//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>(undefined);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [ callback ]);
  
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    
    if (delay) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => null;
  }, [ delay ]);
}
