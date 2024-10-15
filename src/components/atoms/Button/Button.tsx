import * as motion from 'framer-motion/client';
import React, { forwardRef, ReactElement, Ref } from 'react';
import { Duration } from '../../../constants';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { ViewPortSizeType } from '../../../types';
import { ButtonProps } from './types';

const sizeViewPorts: { [key in ViewPortSizeType]: string } = {
  // sm: 'small',
  // md: 'regular',
  // lg: 'large',
  // hg: 'huge',
  '': '',
  sm: 'tiny',
  md: 'small',
  lg: 'regular',
  hg: 'regular',
};

const buttonsVariants = (isDisabled: boolean) => ({
  whileHover: isDisabled ? {} : { scale: 1.05 },
  whileTap: isDisabled ? {
    x: [ '-1rem', '1rem', 0 ],
    transitionEnd: {
      x: 0,
    },
  } : { scale: 0.9 },
  
});

const ButtonComponent = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  
  const {
    submit = false,
    type = 'primary',
    className,
    extend = false,
    icon,
    children,
    size: _size,
    onClick,
    disabled = false,
    responsive = false,
    responsiveMobile = false,
    ...restProps
  } = props;
  
  const { viewPortSize } = useJukiUI();
  
  const size = (responsiveMobile && viewPortSize === 'sm') ? 'large' : (_size || (responsive ? sizeViewPorts[viewPortSize] : 'regular'));
  const hasChildren = !!children && (responsiveMobile ? viewPortSize !== 'sm' : true);
  
  return (
    <motion.button
      ref={ref}
      variants={buttonsVariants(disabled)}
      whileHover="whileHover"
      whileTap="whileTap"
      transition={{
        duration: disabled ? Duration.FAST : Duration.NORMAL,
      }}
      type={submit ? 'submit' : 'button'}
      className={classNames(className, `clickable jk-button ${type} jk-border-radius-inline`, size, {
        extend,
        'only-icon': !hasChildren,
        disabled,
        icon: !!(icon),
      })}
      onClick={!disabled ? (event => onClick?.({ onClickEvent: event })) : undefined}
      onKeyDown={event => {
        if (event.code === 'Enter' && onClick && !disabled) {
          event.preventDefault();
          event.stopPropagation();
          onClick({ onKeyDownEvent: event });
        }
      }}
      {...restProps}
    >
      {icon}
      {hasChildren && children}
    </motion.button>
  );
};

// @ts-ignore
export const Button = forwardRef(ButtonComponent) as (p: ButtonProps & {
  ref?: Ref<HTMLButtonElement>
}) => ReactElement;
