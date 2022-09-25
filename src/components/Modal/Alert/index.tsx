import React from 'react';
import { Modal } from '../index';
import { ButtonLoader, ExclamationIcon, T } from '../../index';
import { AlertModalProps } from './types';

export const AlertModal = ({ decline, accept, title, content, onCancel }: AlertModalProps) => (
  <Modal isOpen={true} className="modal-alert" onClose={onCancel} closeIcon>
    <div className="modal-alert-title cr-py">
      <ExclamationIcon filledCircle />
      <div>
        {title}
      </div>
    </div>
    <div className="modal-alert-content">
      {content}
    </div>
    <div className="modal-alert-actions jk-row gap right">
      <ButtonLoader onClick={decline.onClick} type="text">
        {decline.label || <T>cancel</T>}
      </ButtonLoader>
      <ButtonLoader onClick={accept.onClick}>
        {accept.label || <T>ok</T>}
      </ButtonLoader>
    </div>
  </Modal>
);

export * from './types';
