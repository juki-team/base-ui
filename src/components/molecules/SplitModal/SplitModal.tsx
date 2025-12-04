import { cloneElement, type CSSProperties, type PropsWithChildren, type ReactElement } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { usePageStore } from '../../../stores/page/usePageStore';
import { Modal } from '../../atoms';
import type { ModalButtonLoaderEventType } from '../../atoms/Modal/types';
import { renderReactNodeOrFunction } from '../../helpers';
import type { SplitModalProps } from './types';

export function SplitModal<T extends ModalButtonLoaderEventType, >(props: PropsWithChildren<SplitModalProps<T>>) {
  
  const {
    children,
    title,
    graphic,
    ...modalProps
  } = props;
  
  const { height: sideMainHeight = 0, ref: sideMainRef } = useResizeDetector();
  const { height: titleSideSecondaryHeight = 0, ref: titleSideSecondaryRef } = useResizeDetector();
  const isSmallScreen = usePageStore(store => store.viewPort.isSmallScreen);
  
  return (
    <Modal<T>
      {...modalProps}
    >
      <div className="split-modal jk-row stretch block">
        <div
          className="jk-side-secondary bc-py cr-pt jk-br jk-col nowrap stretch jk-pg-lg"
          style={{
            '--side-main-height': sideMainHeight + 'px',
            '--title-side-main-height': titleSideSecondaryHeight + 'px',
          } as CSSProperties}
        >
          <div className="title" ref={titleSideSecondaryRef}>{renderReactNodeOrFunction(title)}</div>
          {!isSmallScreen && (
            <div className="graphic jk-row pn-re">
              {renderReactNodeOrFunction(graphic)}
            </div>
          )}
        </div>
        <div className="jk-side-main jk-col stretch jk-pg-lg">
          {cloneElement(children, { ref: sideMainRef } as ReactElement<{}>['props'])}
        </div>
      </div>
    </Modal>
  );
}
