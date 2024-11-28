import { Status } from '@juki-team/commons';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { LoaderStatusOnClickType, SetLoaderStatusOnClickType } from '../../molecules/types';

export const useSetLoaderStatus = (loader: Status, setLoader: Dispatch<SetStateAction<Status>>, setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void, onLoaderStatusChange?: (status: LoaderStatusOnClickType) => void) => {
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
};
