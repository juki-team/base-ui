import { useRef } from 'react';

export const useStableRef = <T>(initialValue: T) => {
  const searchVisiblesRef = useRef(initialValue);
  searchVisiblesRef.current = initialValue;
  return searchVisiblesRef;
};
