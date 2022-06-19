import React, { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import { classNames } from '../../../helpers';
import { CloseIcon } from '../../index';
import { ModalProps } from './types';

// ReactModal.setAppElement('#root'); // no works with nextjs

export const Modal = ({ onClose, isOpen, className, children, closeIcon = false, expand, shouldCloseOnOverlayClick = false }: PropsWithChildren<ModalProps>) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className={classNames('jk-modal jk-border-radius', className)}
      onRequestClose={onClose}
      portalClassName={classNames('jk-modal-container', { expand: !!expand })}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {closeIcon && <div className="jk-modal-close-button jk-row jk-pad-sm" onClick={onClose}><CloseIcon /></div>}
      <div className="jk-modal-body">
        {children}
      </div>
    </ReactModal>
  );
};

export * from './types';
