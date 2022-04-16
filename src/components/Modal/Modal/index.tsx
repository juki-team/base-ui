import React, { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import { CloseIcon } from '../../index';
import { classNames } from '../../../helpers';
import { ModalProps } from './types';

// ReactModal.setAppElement('#root'); // no works with nextjs

export const Modal = ({ onClose, isOpen, className, children, closeIcon = false }: PropsWithChildren<ModalProps>) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className={classNames('jk-modal jk-border-radius', className)}
      onRequestClose={onClose}
      portalClassName="jk-modal-container"
      ariaHideApp={false}
    >
      {closeIcon && <div className="jk-modal-close-button jk-row" onClick={onClose}><CloseIcon /></div>}
      <div className="jk-modal-body">
        {children}
      </div>
    </ReactModal>
  );
};

export * from './types';
