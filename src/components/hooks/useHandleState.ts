import { useCallback, useEffect, useRef, useState } from 'react';

import type { NotUndefined } from '../types';
import { useStableRef } from './useStableRef';

export type Func<T> = ((prevState: NotUndefined<T>) => NotUndefined<T>);

export const useHandleState = <T, >(
  defaultState: NotUndefined<T>,
  initialState: NotUndefined<T> | undefined,
  onChange?: (value: NotUndefined<T>) => void,
): [ NotUndefined<T>, (value: NotUndefined<T> | Func<T>) => void ] => {
  const [ state, _setState ] = useState<NotUndefined<T>>(initialState ?? defaultState);
  useEffect(() => {
    if (initialState !== undefined) {
      _setState(initialState);
    }
  }, [ initialState ]);
  
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  
  const stateRef = useStableRef(state);
  
  const setState = useCallback((value: NotUndefined<T> | Func<T>) => {
    if (initialState === undefined || !onChangeRef.current) {
      _setState(value);
    } else {
      if (typeof value === 'function') {
        onChangeRef.current?.((value as Func<T>)?.(stateRef.current));
      } else {
        onChangeRef.current?.(value as NotUndefined<T>);
      }
    }
  }, [ initialState, stateRef ]);
  
  return [ state, setState ];
};
