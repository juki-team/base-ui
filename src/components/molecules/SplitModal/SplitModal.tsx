import React, { cloneElement, CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { renderReactNodeOrFunction } from '../../../helpers';
import { Modal } from '../../atoms';
import { ModalButtonLoaderEventType } from '../../atoms/Modal/types';
import { SplitModalProps } from './types';

export const SplitModal = <T extends ModalButtonLoaderEventType, >(props: PropsWithChildren<SplitModalProps<T>>) => {
  
  const {
    isOpen,
    onClose,
    className,
    children,
    title,
    graphic,
    closeIcon,
    closeOnClickOverlay,
    closeOnKeyEscape,
  } = props;
  
  const { height: sideMainHeight = 0, ref: sideMainRef } = useResizeDetector();
  const { height: titleSideSecondaryHeight = 0, ref: titleSideSecondaryRef } = useResizeDetector();
  
  return (
    <Modal<T>
      isOpen={isOpen}
      className={className}
      onClose={onClose}
      closeIcon={closeIcon}
      closeOnClickOverlay={closeOnClickOverlay}
      closeOnKeyEscape={closeOnKeyEscape}
    >
      <div className="split-modal jk-row stretch block">
        <div
          className="jk-side-secondary jk-border-radius jk-col nowrap stretch jk-pg-lg"
          style={{
            '--side-main-height': sideMainHeight + 'px',
            '--title-side-main-height': titleSideSecondaryHeight + 'px',
          } as CSSProperties}
        >
          <div className="title" ref={titleSideSecondaryRef}>{renderReactNodeOrFunction(title)}</div>
          <div className="graphic jk-row screen md lg hg">
            {renderReactNodeOrFunction(graphic)}
          </div>
        </div>
        <div className="jk-side-main jk-col stretch jk-pg-lg">
          {cloneElement(children, { ref: sideMainRef } as ReactElement<{}>['props'])}
        </div>
      </div>
    </Modal>
  );
};
