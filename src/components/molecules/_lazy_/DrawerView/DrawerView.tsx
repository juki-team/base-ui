import { AnimatePresence, motion } from 'motion/react';
import { memo, useRef } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../../helpers';
import { Button, Portal } from '../../../atoms';
import { useKeyPress } from '../../../hooks/useKeyPress';
import { CloseIcon } from '../../../server';
import type { DrawerViewProps } from '../../Drawer/types';

function DrawerViewComponent(props: DrawerViewProps) {
  
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
            className={classNames('jk-drawer-layout elevation-2', position, { open: isOpen })}
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
}

const DrawerView = memo(DrawerViewComponent, ({ isOpen }, { isOpen: isOpenNext }) => {
  return isOpen === isOpenNext && !isOpen;
});

export default DrawerView;
