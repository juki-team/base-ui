import React, { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { SCROLL_WIDTH } from '../../../constants';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useKeyPress } from '../../../hooks';
import { Button, CloseIcon, Portal } from '../../atoms';
import { DrawerViewProps } from './types';

export const DrawerView = (props: PropsWithChildren<DrawerViewProps>) => {
  
  const {
    children,
    position = 'right',
    isOpen,
    onClose,
    closeWhenKeyEscape,
    closeWhenClickOutside,
    closeIcon,
  } = props;
  
  const drawerLayoutRef = useRef(null);
  const { height = 0, width = 0 } = useResizeDetector({ targetRef: drawerLayoutRef });
  const [ render, setRender ] = useState(0);
  useEffect(() => {
    setTimeout(() => setRender(1), 400); // to load html components
    setTimeout(() => setRender(2), 800);
  }, []);
  
  const close = () => {
    if (isOpen) {
      onClose?.(false);
    }
  };
  
  useKeyPress((event: KeyboardEvent) => {
    if (closeWhenKeyEscape && isOpen && event.code === 'Escape') {
      close();
    }
  });
  
  return (
    <Portal>
      {isOpen && <div className="jk-drawer-overlay" onClick={closeWhenClickOutside ? close : undefined} />}
      <div
        ref={drawerLayoutRef}
        className={classNames('jk-drawer-layout', position, { open: isOpen })}
        style={{
          zIndex: (render < 2 && !isOpen) ? -1 : undefined,
          opacity: (render < 2 && !isOpen) ? 0 : undefined,
          transition: 'right 400ms, left 400ms, top 400ms, bottom 400ms',
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
