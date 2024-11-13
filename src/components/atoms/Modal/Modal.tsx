import { Status } from '@juki-team/commons';
import { AnimatePresence } from 'framer-motion';
import * as motion from 'framer-motion/client';
import React, { KeyboardEvent, MouseEvent, PropsWithChildren, useState } from 'react';
import ReactModal from 'react-modal';
import { classNames } from '../../../helpers';
import { useSetLoaderStatus } from '../hooks';
import { CloseIcon, SpinIcon } from '../icons';
import { ModalProps } from './types';

// ReactModal.setAppElement('#root'); // no works with nextjs

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  
  const {
    onClose,
    isOpen,
    className,
    portalClassName,
    children,
    closeIcon = false,
    expand,
    closeWhenClickOutside = false,
    setLoaderStatusRef,
    onLoaderStatusChange,
    onAfterOpen,
  } = props;
  
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  const _refLoader = useSetLoaderStatus(loader, setLoader, setLoaderStatusRef, onLoaderStatusChange);
  
  const handleOnClose = (event?: MouseEvent | KeyboardEvent) => onClose((status) => {
    if (typeof status === 'function') {
      setLoader(status(_refLoader.current));
    } else {
      setLoader(status);
    }
  }, loader, { onRequestCloseModalEvent: event });
  
  return (
    <AnimatePresence presenceAffectsLayout>
      {isOpen && (
        <ReactModal
          isOpen={true}
          className={classNames('jk-modal jk-border-radius', className)}
          onRequestClose={handleOnClose}
          portalClassName={classNames('jk-modal-container', portalClassName, { expand: !!expand })}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={closeWhenClickOutside}
          onAfterOpen={onAfterOpen}
          overlayElement={(props, contentElement) => (
            // <AnimatePresence>
            <motion.div
              {...(props as {})}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // TODO
              // layout
              // className="TEST-1"
            >
              {contentElement}
            </motion.div>
            // </AnimatePresence>
          )}
          contentElement={(props, contentElement) => (
            // <AnimatePresence>
            isOpen && (<motion.div
                {...(props as {})}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }} // TODO
                // layout
                // className="TEST-2"
              >
                {contentElement}
              </motion.div>
            )
            // </AnimatePresence>
          )}
        >
          {closeIcon && (
            <div
              className="jk-modal-close-button jk-button light only-icon"
              onClick={loader !== Status.LOADING ? handleOnClose : undefined}
            >
              {loader === Status.LOADING ? <SpinIcon /> : <CloseIcon />}
            </div>
          )}
          <div className="jk-modal-body">
            {children}
          </div>
        </ReactModal>
      )}
    </AnimatePresence>
  );
};
