import { useCallback, useEffect, useState } from 'react';
import { NotUndefined } from '../types';

type F<T> = ((prevState: NotUndefined<T>) => NotUndefined<T>);

export const useHandleState = <T, >(
  defaultState: NotUndefined<T>,
  initialState: NotUndefined<T> | undefined,
  onChange?: (value: NotUndefined<T>) => void,
): [ NotUndefined<T>, (value: NotUndefined<T> | F<T>) => void ] => {
  const [ state, _setState ] = useState<NotUndefined<T>>(initialState || defaultState);
  useEffect(() => {
    if (initialState !== undefined) {
      _setState(initialState);
    }
  }, [ initialState ]);
  
  const setState = useCallback((value: NotUndefined<T> | F<T>) => {
    if (initialState === undefined || !onChange) {
      _setState(value);
    } else {
      if (typeof value === 'function') {
        onChange?.((value as F<T>)?.(state));
      } else {
        onChange?.(value as NotUndefined<T>);
      }
    }
  }, [ initialState, onChange, state ]);
  
  return [ state, setState ];
};
