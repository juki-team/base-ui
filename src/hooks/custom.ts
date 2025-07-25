import { useEffect, useRef, useState } from 'react';

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

// not recommended, call every time
export function useKeyPress(handleKeyPress: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ handleKeyPress ]);
}

// https://usehooks.com/useWindowSize/
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [ windowSize, setWindowSize ] = useState({ width: 0, height: 0 });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
