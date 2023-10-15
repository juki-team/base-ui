import React, { PropsWithChildren } from 'react';
import { renderReactNodeOrFunction } from '../../../helpers';
import { Modal } from '../../atoms';
import { SplitModalProps } from './types';

export const SplitModal = ({
                             isOpen,
                             onClose,
                             className,
                             children,
                             title,
                             graphic,
                             closeIcon,
                             closeWhenClickOutside,
                             closeWhenKeyEscape,
                           }: PropsWithChildren<SplitModalProps>) => (
  <Modal
    isOpen={isOpen}
    className={className}
    onClose={onClose}
    closeIcon={closeIcon}
    closeWhenClickOutside={closeWhenClickOutside}
    closeWhenKeyEscape={closeWhenKeyEscape}
  >
    <div className="split-modal jk-row stretch block">
      <div className="jk-side-secondary jk-border-radius jk-col stretch jk-pad-lg">
        <div className="title">{renderReactNodeOrFunction(title)}</div>
        <div className="graphic jk-row screen md lg hg">{renderReactNodeOrFunction(graphic)}</div>
      </div>
      <div className="jk-side-main jk-col stretch jk-pad-lg">{children}</div>
    </div>
  </Modal>
);