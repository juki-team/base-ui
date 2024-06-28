import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const useStableState = <T, >(initialStableState: T): [ T, Dispatch<SetStateAction<T>> ] => {
  
  const [ state, setState ] = useState<T>(initialStableState);
  
  const initialStableStateString = JSON.stringify(initialStableState);
  const stateRef = useRef(JSON.stringify(state));
  stateRef.current = JSON.stringify(state);
  
  useEffect(() => {
    if (stateRef.current !== initialStableStateString) {
      setState(JSON.parse(initialStableStateString));
    }
  }, [ initialStableStateString ]);
  
  return [ state, setState ];
};
