import { Status } from '@juki-team/commons';
import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../../helpers';
import { Button, CheckIcon, WarningIcon } from '../../atoms';
import { ButtonLoaderProps } from './types';

// no use memo when there are callbacks on the props, or be careful
export const ButtonLoader = (props: ButtonLoaderProps) => {
  
  const {
    className = '',
    onClick,
    children,
    icon,
    setLoaderStatusRef,
    withIconTransition = false,
    ...restProps
  } = props;
  
  const [ loader, setLoader ] = useState<[ Status, number ]>([ Status.NONE, new Date().getTime() ]);
  const refTimeOut = useRef<ReturnType<typeof setTimeout>>();
  const _refLoader = useRef(loader);
  _refLoader.current = loader;
  useEffect(() => {
    setLoaderStatusRef?.((status, timestamp) => {
      if (typeof status === 'function') {
        setLoader(status(_refLoader.current));
      } else {
        setLoader([ status, timestamp || 0 ]);
      }
    });
  }, [ setLoaderStatusRef ]);
  useEffect(() => {
    if (loader[0] === Status.SUCCESS || loader[0] === Status.ERROR) {
      refTimeOut.current = setTimeout(() => setLoader(prevState => [ Status.NONE, prevState[1] ]), 1200);
    }
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, [ loader ]);
  
  const renderIcon = withIconTransition
    ? (loader[0] === Status.ERROR ? <WarningIcon /> : loader[0] === Status.SUCCESS ? <CheckIcon /> : icon)
    : icon;
  
  return (
    <Button
      className={classNames(className, {
        success: loader[0] === Status.SUCCESS,
        error: loader[0] === Status.ERROR,
        'pad-icon': withIconTransition ? (!renderIcon && loader[0] !== Status.LOADING) : false,
      })}
      onClick={event => onClick?.((status, timestamp) => {
        if (typeof status === 'function') {
          setLoader(status(loader));
        } else {
          setLoader([ status, timestamp || 0 ]);
        }
      }, loader, event)}
      loading={loader[0] === Status.LOADING}
      icon={renderIcon}
      withIconTransition={withIconTransition}
      {...restProps}
    >
      {children}
    </Button>
  );
};
