import { Status } from '@juki-team/commons';
import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react';
import type { LoaderStatusOnClickType, SetLoaderStatusOnClickType } from '../types';

export function useSetLoaderStatus(loader: Status, setLoader: Dispatch<SetStateAction<Status>>, setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void, onLoaderStatusChange?: (status: LoaderStatusOnClickType) => void) {
  const _refLoader = useRef(loader);
  _refLoader.current = loader;
  useEffect(() => {
    setLoaderStatusRef?.((status) => {
      if (typeof status === 'function') {
        setLoader(status(_refLoader.current));
      } else {
        setLoader(status);
      }
    });
  }, [ setLoaderStatusRef, setLoader ]);
  
  useEffect(() => {
    onLoaderStatusChange?.(loader);
  }, [ onLoaderStatusChange, loader ]);
  
  return _refLoader;
}
