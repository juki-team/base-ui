import { isObjectJson, isStringJson } from '@juki-team/commons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const useStableState = <T, >(initialStableState: T, deps?: (string | number | boolean)[]): [ T, Dispatch<SetStateAction<T>> ] => {
  
  const [ state, setState ] = useState<T>(initialStableState);
  
  const initialStableStateString = isObjectJson(initialStableState) ? JSON.stringify(initialStableState) : '';
  const stateRef = useRef<string>('');
  stateRef.current = isObjectJson(state) ? JSON.stringify(state) : '';
  
  useEffect(() => {
    if (stateRef.current !== initialStableStateString && isStringJson(initialStableStateString)) {
      setState(JSON.parse(initialStableStateString));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ initialStableStateString, ...(deps || []) ]);
  
  return [ state, setState ];
};
