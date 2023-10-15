import React, { forwardRef, ReactElement, Ref } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { LoadingIcon } from '../icons';
import { ButtonProps } from './types';

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

const ButtonComponent = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  
  const {
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
  } = props;
  
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

export const Button = forwardRef(ButtonComponent) as (p: ButtonProps & {
  ref?: Ref<HTMLButtonElement>
}) => ReactElement;
