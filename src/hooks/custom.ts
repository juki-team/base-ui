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

// Hook
export function usePrevious<T>(value: T, initialValue?: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>(initialValue as T);
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [ value ]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
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
