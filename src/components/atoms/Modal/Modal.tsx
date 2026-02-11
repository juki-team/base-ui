import { Status } from '@juki-team/commons';
import { AnimatePresence, motion } from 'motion/react';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from '../../helpers';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useSetLoaderStatus } from '../../hooks/useSetLoaderStatus';
import { useStableRef } from '../../hooks/useStableRef';
import type { SetLoaderStatusOnClickType } from '../../types';
import { Portal } from '../Portal/Portal';
import { CloseIcon, SpinIcon } from '../server';
import type { ModalButtonLoaderEventType, ModalProps } from './types';

export function Modal<T extends ModalButtonLoaderEventType>(props: ModalProps<T>) {
  
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
    ariaLabelledBy,
    ariaDescribedBy,
    setLoaderStatusRef,
    onLoaderStatusChange,
  } = props;
  
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  const _refLoader = useSetLoaderStatus(loader, setLoader, setLoaderStatusRef, onLoaderStatusChange);
  const onCloseRef = useStableRef(onClose);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  useFocusTrap(modalRef, isOpen);
  
  const setLoaderStatusOnClick: SetLoaderStatusOnClickType = useCallback((status) => {
    if (typeof status === 'function') {
      setLoader(status(_refLoader.current));
    } else {
      setLoader(status);
    }
  }, [ _refLoader ]);
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      // document.body.style.overflow = '';
      
      previousFocusRef.current?.focus();
    }
    
    return () => {
      // document.body.style.overflow = '';
    };
  }, [ isOpen ]);
  
  useEffect(() => {
    if (!isOpen || !closeOnKeyEscape) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current?.(setLoaderStatusOnClick, loader, { onKeyDownEvent: event });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ loader, setLoaderStatusOnClick, closeOnKeyEscape, isOpen, onCloseRef ]);
  
  const handleOverlayClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (closeOnClickOverlay) {
      onCloseRef.current?.(setLoaderStatusOnClick, loader, { overlayOnClickEvent: event });
    }
  }, [ closeOnClickOverlay, loader, onCloseRef, setLoaderStatusOnClick ]);
  
  const handleCloseClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (loader !== Status.LOADING) {
      onCloseRef.current?.(setLoaderStatusOnClick, loader, { closeButtonOnClickEvent: event });
    }
  }, [ loader, onCloseRef, setLoaderStatusOnClick ]);
  
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div
            className={classNames('jk-modal-container', containerClassName, { expand })}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
          >
            <motion.div
              className="jk-modal-overlay jk-overlay jk-overlay-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOverlayClick}
            />
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              key="modal-content"
              className={classNames('jk-modal-content jk-br elevation-3', className)}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              {closeIcon && (
                <div className="jk-modal-close-button wh-100">
                  <button
                    type="button"
                    className="jk-button light only-icon jk-br-ie"
                    aria-label="Close modal"
                    disabled={loader === Status.LOADING}
                    onClick={handleCloseClick}
                  >
                    {loader === Status.LOADING ? (
                      <SpinIcon aria-hidden="true" />
                    ) : (
                      <CloseIcon aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
