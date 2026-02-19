import { useRef } from 'react';

export const useStableRef = <T>(initialValue: T) => {
  const ref = useRef(initialValue);
  ref.current = initialValue;
  return ref;
};
