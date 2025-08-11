import { Status } from '@juki-team/commons';
import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from '../../../helpers';
import { SetLoaderStatusOnClickType } from '../../molecules/ButtonLoader/types';
import { useSetLoaderStatus } from '../hooks/useSetLoaderStatus';
import { Portal } from '../Portal/Portal';
import { CloseIcon, SpinIcon } from '../server';
import { ModalButtonLoaderEventType, ModalProps } from './types';

export const Modal = <T extends ModalButtonLoaderEventType, >(props: ModalProps<T>) => {
  
  const {
    onClose,
    isOpen,
    className,
    containerClassName,
    children,
    closeIcon = false,
    expand = false,
    closeOnClickOverlay = true,
    closeOnKeyEscape = true,
    setLoaderStatusRef,
    onLoaderStatusChange,
  } = props;
  
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  const _refLoader = useSetLoaderStatus(loader, setLoader, setLoaderStatusRef, onLoaderStatusChange);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  
  const setLoaderStatusOnClick: SetLoaderStatusOnClickType = useCallback((status) => {
    if (typeof status === 'function') {
      setLoader(status(_refLoader.current));
    } else {
      setLoader(status);
    }
  }, [ _refLoader ]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnKeyEscape) {
        onCloseRef.current?.(setLoaderStatusOnClick, loader, { onKeyDownEvent: event });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ loader, setLoaderStatusOnClick, closeOnKeyEscape ]);
  
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div className={classNames('jk-modal-container', containerClassName, { expand })}>
            <motion.div
              className="jk-modal-overlay jk-overlay jk-overlay-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOnClickOverlay
                ? (event) => onCloseRef.current?.(setLoaderStatusOnClick, loader, { overlayOnClickEvent: event })
                : undefined}
            />
            <motion.div
              className={classNames('jk-modal-content jk-border-radius elevation-3', className)}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              {closeIcon && (
                <div
                  className="jk-modal-close-button wh-100"
                  onClick={loader !== Status.LOADING
                    ? (event) => onCloseRef.current?.(setLoaderStatusOnClick, loader, { closeButtonOnClickEvent: event })
                    : undefined}
                >
                  <div className="jk-button light only-icon jk-br-ie">
                    {loader === Status.LOADING ? <SpinIcon /> : <CloseIcon />}
                  </div>
                </div>
              )}
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
