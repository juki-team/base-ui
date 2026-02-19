import { areArraysDifferent } from '@juki-team/commons';
import { useMemo, useRef } from 'react';

export const useMemoizedArray = <T>(externalArray: T[]) => {
  const prevArrayRef = useRef(externalArray);
  return useMemo(() => {
    if (areArraysDifferent(prevArrayRef.current, externalArray)) {
      prevArrayRef.current = externalArray;
      return externalArray;
    }
    return prevArrayRef.current;
  }, [ externalArray ]);
};
