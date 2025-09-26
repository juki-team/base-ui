import { forwardRef, type Ref, useEffect, useState } from 'react';
import { classNames } from '../../../helpers';
import type { DivProps } from './types';

function DivComponent(_props: DivProps, ref: Ref<HTMLDivElement>) {
  
  const {
    onClick,
    children,
    className,
    transition,
    onKeyDownClick,
    ...props
  } = _props;
  
  const [ show, setShow ] = useState(false);
  useEffect(() => {
    if (transition) {
      setShow(true);
    }
  }, [ transition ]);
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
}

export const Div = forwardRef(DivComponent);
