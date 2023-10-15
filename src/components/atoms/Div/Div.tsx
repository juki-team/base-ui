import React, { DetailedHTMLProps, forwardRef, HTMLAttributes, ReactElement, Ref, useEffect, useState } from 'react';
import { classNames } from '../../../helpers';

type DivProps =
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & { onClick?: () => void, transition?: boolean, onKeyDownClick?: boolean | 'Enter' };

const DivComponent = ({
  onClick,
  children,
  className = '',
  transition,
  onKeyDownClick,
  ...props
}: DivProps, ref: Ref<HTMLDivElement>) => {
  
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (transition) {
      setShow(true);
    }
  }, [transition]);
  const newProps = { ...props };
  if (onKeyDownClick) {
    newProps.tabIndex = 0;
  }
  
  return (
    <div
      ref={ref}
      {...newProps}
      onKeyDown={event => {
        if (onClick && ((onKeyDownClick === true && event.code === 'Enter') || (event.code === onKeyDownClick))) {
          event.preventDefault();
          event.stopPropagation();
          onClick();
        }
      }}
      onClick={onClick}
      className={classNames(className, { 'jk-transition': !!transition, 'jk-transition-open': show })}
    >
      {children}
    </div>
  );
};

export const Div = forwardRef(DivComponent) as (p: DivProps & { ref?: Ref<HTMLDivElement> }) => ReactElement;
