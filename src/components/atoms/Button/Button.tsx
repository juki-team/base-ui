import { motion } from 'motion/react';
import React, { forwardRef, ReactElement, Ref } from 'react';
import { classNames } from '../../../helpers';
import { useSound } from '../../../hooks';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { Duration } from '../../../types';
import { ButtonProps } from './types';

const buttonsVariants = (isDisabled: boolean) => ({
  whileHover: isDisabled ? {} : { scale: 1.05, transition: { duration: Duration.FAST } },
  whileTap: isDisabled ? {
    x: [ '-1rem', '1rem', 0 ],
    transitionEnd: {
      x: 0,
    },
  } : { scale: 0.9, transition: { duration: Duration.FAST } },
  
});

const ButtonComponent = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  
  const {
    submit = false,
    type = 'primary',
    className,
    expand = false,
    icon,
    children,
    size: _size = 'regular',
    onClick,
    disabled = false,
    responsiveMobile = false,
    ...restProps
  } = props;
  const sound = useSound();
  
  const { viewPortSize } = useJukiUI();
  
  const size = (responsiveMobile && viewPortSize === 'sm') ? 'large' : _size;
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
        expand,
        'only-icon': !hasChildren,
        disabled,
        icon: !!(icon),
      })}
      onClick={!disabled
        ? (event => {
          onClick?.({ onClickEvent: event });
          sound.playClick();
        })
        : () => {
          sound.playError(0.1);
        }}
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
