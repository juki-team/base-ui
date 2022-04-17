import React, { PropsWithChildren } from 'react';
import { renderReactNodeOrFunction } from '../../../helpers';
import { Modal } from '../Modal';
import { SplitModalProps } from './types';

export const SplitModal = ({ isOpen, onClose, className, children, title, graphic, closeIcon }: PropsWithChildren<SplitModalProps>) => (
  <Modal isOpen={isOpen} className={className} onClose={onClose} closeIcon={closeIcon}>
    <div className="split-modal jk-row stretch block">
      <div className="jk-side-secondary jk-border-radius jk-col stretch jk-pad">
        <div className="title">{renderReactNodeOrFunction(title)}</div>
        <div className="graphic jk-row screen md lg hg">{renderReactNodeOrFunction(graphic)}</div>
      </div>
      <div className="jk-side-main jk-col stretch jk-pad">{children}</div>
    </div>
  </Modal>
);
