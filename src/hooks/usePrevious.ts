import { useEffect, useRef } from 'react';

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
