import React from 'react';
import { classNames } from '../../../helpers';
import { ButtonLoader, ExclamationIcon, T, useJukiBase } from '../../index';
import { Modal } from '../index';
import { AlertModalProps } from './types';

export const AlertModal = ({ decline, accept, title, content, onCancel }: AlertModalProps) => {
  
  const { viewPortSize } = useJukiBase();
  
  return (
    <Modal isOpen={true} className="modal-alert" onClose={onCancel} closeIcon>
      <div className="modal-alert-title cr-py">
        <ExclamationIcon filledCircle className="cr-er" size="large" />
        <h3 className="cr-er">
          {title}
        </h3>
      </div>
      <div className="modal-alert-content">
        {content}
      </div>
      <div className={classNames('modal-alert-actions jk-row gap right', { nowrap: viewPortSize !== 'sm' })}>
        <ButtonLoader onClick={decline.onClick} type="outline" extend={viewPortSize === 'sm'}>
          {decline.label || <T>cancel</T>}
        </ButtonLoader>
        <ButtonLoader onClick={accept.onClick} extend={viewPortSize === 'sm'}>
          {accept.label || <T>ok</T>}
        </ButtonLoader>
      </div>
    </Modal>
  );
};

export * from './types';
