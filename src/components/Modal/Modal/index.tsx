import { Status } from '@juki-team/commons';
import React, { KeyboardEvent, MouseEvent, PropsWithChildren, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { classNames } from '../../../helpers';
import { CloseIcon, LoadingIcon } from '../../index';
import { ModalProps } from './types';

// ReactModal.setAppElement('#root'); // no works with nextjs

export const Modal = ({
  onClose,
  isOpen,
  className,
  children,
  closeIcon = false,
  expand,
  closeWhenClickOutside = false,
}: PropsWithChildren<ModalProps>) => {
  
  const [loader, setLoader] = useState<[Status, number]>([Status.NONE, 0]);
  const _refLoader = useRef(loader);
  
  _refLoader.current = loader;
  
  const handleOnClose = (event?: MouseEvent | KeyboardEvent) => onClose((status, timestamp) => {
    if (typeof status === 'function') {
      setLoader(status(_refLoader.current));
    } else {
      setLoader([status, timestamp || 0]);
    }
  }, loader, { onRequestCloseModalEvent: event });
  
  return (
    <ReactModal
      isOpen={isOpen}
      className={classNames('jk-modal jk-border-radius', className)}
      onRequestClose={handleOnClose}
      portalClassName={classNames('jk-modal-container', { expand: !!expand })}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={closeWhenClickOutside}
    >
      {closeIcon && (
        <div className="jk-modal-close-button jk-row">
          {loader[0] === Status.LOADING ? <LoadingIcon /> : <CloseIcon className="clickable" onClick={handleOnClose} />}
        </div>
      )}
      <div className="jk-modal-body">
        {children}
      </div>
    </ReactModal>
  );
};

export * from './types';
