import { useMemo, useRef } from 'react';

export const useMemoizedArray = <T>(externalArray: T[]) => {
  const prevArrayRef = useRef(externalArray);
  return useMemo(() => {
    if (prevArrayRef.current === externalArray) return prevArrayRef.current;
    
    if (prevArrayRef.current.length !== externalArray.length) {
      prevArrayRef.current = externalArray;
      return externalArray;
    }
    
    for (let i = 0; i < externalArray.length; i += 1) {
      if (externalArray[i] !== prevArrayRef.current[i]) {
        prevArrayRef.current = externalArray;
        return externalArray;
      }
    }
    
    return prevArrayRef.current;
  }, [ externalArray ]);
};
