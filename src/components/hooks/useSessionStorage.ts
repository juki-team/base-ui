import { useCallback } from 'react';
import { useStableState } from './useStableState';

export const useSessionStorage = (key: string, initialState: string | null, defaultState: string | null = null): [ string, (value: string | number) => void, () => void ] => {
  const [ state, _setState ] = useStableState(
    initialState !== null
      ? initialState
      : (sessionStorage.getItem(key) ?? defaultState ?? ''),
    [ key ]);
  const setState = useCallback((value: string | number) => {
    sessionStorage.setItem(key, value + '');
    _setState(value + '');
  }, [ _setState, key ]);
  
  const deleteState = useCallback(() => {
    sessionStorage.removeItem(key);
    _setState('');
  }, [ _setState, key ]);
  
  return [ state, setState, deleteState ];
};
