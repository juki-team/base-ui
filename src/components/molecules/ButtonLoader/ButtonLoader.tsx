import { Status } from '@juki-team/commons';
import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../../helpers';
import { Button, CheckIcon, ErrorIcon, SpinIcon } from '../../atoms';
import { useSetLoaderStatus } from '../../atoms/hooks';
import { ButtonLoaderProps } from './types';

// no use memo when there are callbacks on the props, or be careful
export const ButtonLoader = (props: ButtonLoaderProps) => {
  
  const {
    className = '',
    onClick,
    children,
    setLoaderStatusRef,
    disabled,
    icon,
    ...restProps
  } = props;
  
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  useSetLoaderStatus(loader, setLoader, setLoaderStatusRef);
  const refTimeOut = useRef<ReturnType<typeof setTimeout>>();
  
  useEffect(() => {
    if (loader === Status.SUCCESS || loader === Status.ERROR) {
      refTimeOut.current = setTimeout(() => setLoader(prevState => Status.NONE), 1200);
    }
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, [ loader ]);
  
  return (
    <Button
      className={classNames(className, 'jk-button-loader', {
        'with-loader-icon': loader !== Status.NONE,
        success: loader === Status.SUCCESS,
        error: loader === Status.ERROR,
        loading: loader === Status.LOADING,
        'only-icon': !children && !!icon,
      })}
      onClick={event => onClick?.((status) => {
        if (typeof status === 'function') {
          setLoader(status(loader));
        } else {
          setLoader(status);
        }
      }, loader, event)}
      disabled={disabled || loader !== Status.NONE}
      icon={!children && loader !== Status.NONE ? null : icon}
      {...restProps}
    >
      {children}
      {loader !== Status.NONE && (
        <div
          className="jk-row button-loader-icon"
        >
          {loader === Status.ERROR
            ? <ErrorIcon />
            : loader === Status.SUCCESS
              ? <CheckIcon />
              : loader === Status.LOADING && <SpinIcon />}
        </div>
      )}
    </Button>
  );
};
