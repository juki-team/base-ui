import { useEffect, useState } from 'react';
import { classNames } from '../../helpers';
import type { DivProps } from './types';

export function Div(props: DivProps) {
  const { ref, onClick, children, className, transition, onKeyDownClick, ...newProps } = props;

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (transition) {
      setShow(true);
    }
  }, [transition]);

  if (onKeyDownClick) {
    newProps.tabIndex = 0;
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      ref={ref}
      {...newProps}
      onKeyDown={(event) => {
        if (onClick && ((onKeyDownClick === true && event.code === 'Enter') || event.code === onKeyDownClick)) {
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
