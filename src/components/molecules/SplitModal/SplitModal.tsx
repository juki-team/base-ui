import React, { cloneElement, CSSProperties, PropsWithChildren, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { renderReactNodeOrFunction } from '../../../helpers';
import { Modal } from '../../atoms';
import { SplitModalProps } from './types';

export const SplitModal = (props: PropsWithChildren<SplitModalProps>) => {
  
  const {
    isOpen,
    onClose,
    className,
    children,
    title,
    graphic,
    closeIcon,
    closeWhenClickOutside,
    closeWhenKeyEscape,
  } = props;
  
  const [ , setRender ] = useState(0);
  
  const { height: sideMainHeight = 0, ref: sideMainRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const { height: titleSideSecondaryHeight = 0, ref: titleSideSecondaryRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  
  return (
    <Modal
      isOpen={isOpen}
      className={className}
      onClose={onClose}
      closeIcon={closeIcon}
      closeWhenClickOutside={closeWhenClickOutside}
      closeWhenKeyEscape={closeWhenKeyEscape}
      onAfterOpen={() => setRender(Date.now)}
    >
      <div className="split-modal jk-row stretch block">
        <div
          className="jk-side-secondary jk-border-radius jk-col nowrap stretch jk-pad-lg"
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
        <div className="jk-side-main jk-col stretch jk-pad-lg">
          {cloneElement(children, { ref: sideMainRef })}
        </div>
      </div>
    </Modal>
  )
}
