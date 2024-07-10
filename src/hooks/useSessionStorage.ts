import { useCallback } from 'react';
import { useStableState } from './useStableState';

export const useSessionStorage = (key: string, initialState: string | null): [ string, (value: string) => void, () => void ] => {
  const [ state, _setState ] = useStableState(initialState !== null ? initialState : (sessionStorage.getItem(key) || ''), [ key ]);
  const setState = useCallback((value: string) => {
    sessionStorage.setItem(key, value);
    _setState(value);
  }, [ _setState, key ]);
  
  const deleteState = useCallback(() => {
    sessionStorage.removeItem(key);
    _setState('');
  }, [ _setState, key ]);
  
  return [ state, setState, deleteState ];
};
