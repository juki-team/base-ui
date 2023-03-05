import { Status } from '@juki-team/commons';
import React, { forwardRef, ReactElement, Ref, useEffect, useRef, useState } from 'react';
import { LoadingIcon, useJukiUI } from '../../';
import { classNames } from '../../helpers';
import { CheckIcon, WarningIcon } from '../graphics';
import { ButtonLoaderProps, ButtonProps } from './types';

const sizeViewPorts = {
  // sm: 'small',
  // md: 'regular',
  // lg: 'large',
  // hg: 'huge',
  sm: 'tiny',
  md: 'small',
  lg: 'regular',
  hg: 'regular',
};

const ButtonComponent = ({
  submit = false,
  type = 'primary',
  className = '',
  extend = false,
  icon,
  children,
  loading = false,
  size: _size,
  onClick,
  disabled = false,
  responsive = false,
  responsiveMobile = false,
  withIconTransition = false,
  ...restProps
}: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { viewPortSize } = useJukiUI();
  
  const size = (responsiveMobile && viewPortSize === 'sm') ? 'large' : (_size || (responsive ? sizeViewPorts[viewPortSize] : 'regular'));
  const hasChildren = !!children && (responsiveMobile ? viewPortSize !== 'sm' : true);
  
  return (
    <button
      ref={ref}
      type={submit ? 'submit' : 'button'}
      className={classNames(className, `clickable jk-button-${type} jk-border-radius-inline`, size, {
        extend,
        'only-icon': !hasChildren,
        disabled,
        icon: !!(icon || loading),
        loading,
      })}
      onClick={(!disabled && !loading) ? (event => onClick?.({ onClickEvent: event })) : undefined}
      onKeyDown={event => {
        if (event.code === 'Enter' && onClick && !disabled) {
          event.preventDefault();
          event.stopPropagation();
          onClick({ onKeyDownEvent: event });
        }
      }}
      {...restProps}
    >
      {withIconTransition ? (loading ? <LoadingIcon /> : icon) : icon}
      {hasChildren && <span className="button-label">{children}</span>}
    </button>
  );
};

export const Button = forwardRef(ButtonComponent) as (p: ButtonProps & { ref?: Ref<HTMLButtonElement> }) => ReactElement;

// no use memo when there are callbacks on the props, or be careful

export const ButtonLoader = ({
  className = '',
  onClick,
  children,
  icon,
  setLoaderStatusRef,
  withIconTransition = false,
  ...restProps
}: ButtonLoaderProps) => {
  
  const [loader, setLoader] = useState<[Status, number]>([Status.NONE, new Date().getTime()]);
  const refTimeOut = useRef<ReturnType<typeof setTimeout>>();
  const _refLoader = useRef(loader);
  _refLoader.current = loader;
  useEffect(() => {
    setLoaderStatusRef?.((status, timestamp) => {
      if (typeof status === 'function') {
        setLoader(status(_refLoader.current));
      } else {
        setLoader([status, timestamp || 0]);
      }
    });
  }, [setLoaderStatusRef]);
  useEffect(() => {
    if (loader[0] === Status.SUCCESS || loader[0] === Status.ERROR) {
      refTimeOut.current = setTimeout(() => setLoader(prevState => [Status.NONE, prevState[1]]), 1200);
    }
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, [loader]);
  
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
          setLoader([status, timestamp || 0]);
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

export * from './types';
