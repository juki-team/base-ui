import { Status } from '@juki-team/commons/enums';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'motion/react';
import { type MouseEvent, useCallback, useEffect, useEffectEvent, useRef, useState } from 'react';
import { classNames } from '../../helpers/commons';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useLoaderStatusSync } from '../../hooks/useLoaderStatusSync';
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

  const [loader, setLoader] = useState<Status>(Status.NONE);
  const _refLoader = useLoaderStatusSync(loader, setLoader, setLoaderStatusRef, onLoaderStatusChange);
  const onCloseRef = useStableRef(onClose);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useFocusTrap(modalRef, isOpen);

  const setLoaderStatusOnClick: SetLoaderStatusOnClickType = useCallback(
    (status) => {
      if (typeof status === 'function') {
        setLoader(status(_refLoader.current));
      } else {
        setLoader(status);
      }
    },
    [_refLoader],
  );

  useEffect(() => {
    if (!isOpen) {
      previousFocusRef.current?.focus();
      return;
    }
    previousFocusRef.current = document.activeElement as HTMLElement;
    const focusTimeoutId = setTimeout(() => {
      modalRef.current?.focus();
    }, 100);
    return () => clearTimeout(focusTimeoutId);
  }, [isOpen]);

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    onCloseRef.current?.(setLoaderStatusOnClick, loader, { onKeyDownEvent: event });
  });

  useEffect(() => {
    if (!(isOpen && closeOnKeyEscape)) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleEscape(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnKeyEscape, isOpen]);

  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (closeOnClickOverlay) {
        onCloseRef.current?.(setLoaderStatusOnClick, loader, { overlayOnClickEvent: event });
      }
    },
    [closeOnClickOverlay, loader, onCloseRef, setLoaderStatusOnClick],
  );

  const handleCloseClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (loader !== Status.LOADING) {
        onCloseRef.current?.(setLoaderStatusOnClick, loader, { closeButtonOnClickEvent: event });
      }
    },
    [loader, onCloseRef, setLoaderStatusOnClick],
  );

  return (
    <Portal>
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {isOpen && (
            // Focus trap is handled manually via useFocusTrap; aria-modal kept explicit because we
            // render <dialog open> (not via showModal), so it is not implicitly modal per spec.
            <dialog
              open
              className={classNames('jk-modal-container', containerClassName, { expand })}
              aria-modal="true"
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
            >
              <m.div
                className="jk-modal-overlay jk-overlay jk-overlay-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleOverlayClick}
              />
              <m.div
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
                      className="jk-button bc-sf-hi only-icon jk-br-ie"
                      aria-label="Close modal"
                      disabled={loader === Status.LOADING}
                      onClick={handleCloseClick}
                    >
                      {loader === Status.LOADING ? <SpinIcon aria-hidden="true" /> : <CloseIcon aria-hidden="true" />}
                    </button>
                  </div>
                )}
                {children}
              </m.div>
            </dialog>
          )}
        </AnimatePresence>
      </LazyMotion>
    </Portal>
  );
}
