import { useRef } from 'react';

export const useStableRef = (initialValue: any) => {
  const searchVisiblesRef = useRef(initialValue);
  searchVisiblesRef.current = initialValue;
  return searchVisiblesRef;
};
