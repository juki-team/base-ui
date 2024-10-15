import { AnimatePresence } from 'framer-motion';
import * as motion from 'framer-motion/client';
import React, { memo, PropsWithChildren, useRef } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useKeyPress } from '../../../hooks/custom';
import { Button, CloseIcon, Portal } from '../../atoms';
import { DrawerViewProps } from './types';

export const DrawerView = memo((props: PropsWithChildren<DrawerViewProps>) => {
  
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="jk-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="jk-drawer-overlay" onClick={closeWhenClickOutside ? close : undefined}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="jk-drawer-layout"
            initial={{ x: '100vw' }}
            animate={{ x: 0, transition: { stiffness: 0 } }}
            exit={{ x: '100vw' }}
            ref={drawerLayoutRef}
            className={classNames('jk-drawer-layout', position, { open: isOpen })}
          >
            {closeIcon === undefined ? (
              <div className="jk-drawer-close-button" onClick={close}><Button icon={<CloseIcon />} type="light" />
              </div>
            ) : renderReactNodeOrFunctionP1(closeIcon, { isOpen, close })}
            <div className="jk-drawer-body">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}, ({ isOpen }, { isOpen: isOpenNext }) => {
  return isOpen === isOpenNext && !isOpen;
});
