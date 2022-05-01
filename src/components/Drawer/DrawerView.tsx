import React, { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { SCROLL_WIDTH } from '../../constants';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useKeyPress } from '../../hooks';
import { Portal } from '../Basic';
import { Button, CloseIcon, DrawerViewProps } from '../index';

export const DrawerView = ({
  children,
  position = 'right',
  isOpen,
  onClose,
  closeOnEscape,
  closeOnOutside,
  closeIcon,
}: PropsWithChildren<DrawerViewProps>) => {
  
  const drawerLayoutRef = useRef(null);
  const { height = 0, width = 0 } = useResizeDetector({ targetRef: drawerLayoutRef });
  const [firstRender, setFirstRender] = useState(isOpen);
  useEffect(() => {
    const timeout = setTimeout(() => setFirstRender(true), 400);
    return () => clearTimeout(timeout);
  }, [firstRender]);
  
  const close = () => {
    if (isOpen) {
      onClose?.(false);
    }
  };
  
  useKeyPress((event: KeyboardEvent) => {
    if (closeOnEscape && isOpen && event.code === 'Escape') {
      close();
    }
  });
  
  return (
    <Portal>
      {isOpen && <div className="jk-drawer-overlay" onClick={closeOnOutside ? close : undefined} />}
      <div
        ref={drawerLayoutRef}
        className={classNames('jk-drawer-layout', position, { open: isOpen })}
        style={{
          opacity: firstRender ? '1' : '0',
          transition: firstRender ? 'right 0.4s, left 0.4s, top 0.4s, bottom 0.4s' : '',
          '--height-jk-drawer-layout': (height + SCROLL_WIDTH * 2) + 'px',
          '--width-jk-drawer-layout': (width + SCROLL_WIDTH * 2) + 'px',
        } as CSSProperties}
      >
        {closeIcon === undefined ? (
          <div className="jk-drawer-close-button" onClick={close}><Button icon={<CloseIcon />} type="text" /></div>
        ) : renderReactNodeOrFunctionP1(closeIcon, { isOpen, close })}
        <div className="jk-drawer-body">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export * from './types';
