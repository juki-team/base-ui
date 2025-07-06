import { motion } from 'motion/react';
import React, { forwardRef, ReactElement, Ref } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useSoundStore } from '../../../stores/sound/useSoundStore';
import { ButtonCmpProps, Duration } from '../../../types';

const buttonsVariants = (isDisabled: boolean, hasChildren: boolean) => ({
  whileHover: isDisabled ? {} : { scale: hasChildren ? 1.2 : 1.10, transition: { duration: Duration.FAST } },
  whileTap: isDisabled ? {
    x: [ '-1rem', '1rem', 0 ],
    transitionEnd: { x: 0 },
    transition: { duration: Duration.FAST },
  } : { scale: 0.9, transition: { duration: Duration.FAST } },
});

const ButtonComponent = (props: ButtonCmpProps, ref: Ref<HTMLButtonElement>) => {
  
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
    tooltipContent,
    ...restProps
  } = props;
  
  const sound = useSoundStore();
  
  const { viewPortSize } = useJukiUI();
  
  const size = (responsiveMobile && viewPortSize === 'sm') ? 'large' : _size;
  const hasChildren = !!children && (responsiveMobile ? viewPortSize !== 'sm' : true);
  
  return (
    <motion.button
      data-tooltip-id={!!tooltipContent ? 'jk-tooltip' : ''}
      data-tooltip-content={tooltipContent}
      ref={ref}
      variants={buttonsVariants(disabled, hasChildren)}
      whileHover="whileHover"
      whileTap="whileTap"
      type={submit ? 'submit' : 'button'}
      className={classNames(className, `jk-button ${type} jk-border-radius-inline`, size, {
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

export const Button = forwardRef(ButtonComponent) as (p: ButtonCmpProps & {
  ref?: Ref<HTMLButtonElement>
}) => ReactElement;
