import React from 'react';
import { ArrowContainer, Popover as ReactPopover, PopoverAlign, PopoverPosition } from 'react-tiny-popover';
import { classNames, isTrigger, renderChildrenWithProps, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useTriggerWrapper } from '../../../hooks/useTriggerWrapper';
import { Modal } from '../Modal';
import { PlacementType, PopoverProps } from './types';

const placementPositionAlign: { [key in PlacementType]: { position: PopoverPosition, align: PopoverAlign } } = {
  topLeft: { position: 'top', align: 'start' },
  top: { position: 'top', align: 'center' },
  topRight: { position: 'top', align: 'end' },
  rightTop: { position: 'right', align: 'start' },
  right: { position: 'right', align: 'center' },
  rightBottom: { position: 'right', align: 'end' },
  bottomRight: { position: 'bottom', align: 'end' },
  bottom: { position: 'bottom', align: 'center' },
  bottomLeft: { position: 'bottom', align: 'start' },
  leftBottom: { position: 'left', align: 'end' },
  left: { position: 'left', align: 'center' },
  leftTop: { position: 'left', align: 'start' },
  center: { position: 'top', align: 'center' },
  centerScreen: { position: 'top', align: 'center' },
};

const CustomComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  renderChildrenWithProps(props.children, props.childProps({ props: { ref } }))
));

export const Popover = (props: PopoverProps) => {
  
  const {
    children,
    content,
    placement = 'top',
    visible,
    onVisibleChange,
    triggerOn = 'hover',
    triggerOff = triggerOn,
    triggerOnDelayInMs = { hover: 0, click: 0, none: 0 },
    triggerOffDelayInMs = { hover: 0, click: 0, escape: 0, none: 0 },
    popoverClassName,
    showPopperArrow = false,
    // keepMounted = false,
    popoverContentClassName,
    marginOfChildren = 12, // --pad-t: 12px;
  } = props;
  
  const withOutsideAlerter = !isTrigger(triggerOn, 'click');
  const {
    isOpen,
    outsideAlerterRef1,
    childProps,
    onMouseEnter,
    onMouseLeave,
    setOffVisible,
  } = useTriggerWrapper({
    visible,
    onVisibleChange,
    triggerOn,
    triggerOff: typeof triggerOff === 'string' ? (triggerOff === 'click' ? [] : triggerOff) : triggerOff.filter(t => t !== 'click'),
    triggerOnDelayInMs,
    triggerOffDelayInMs,
    withOutsideAlerter,
  });
  const { jukiAppDiv, viewPortSize } = useJukiUI();
  const isMobileViewPort = viewPortSize === 'sm';
  
  const popoverContent = (
    <div className={classNames('jk-popover-layout', popoverClassName)}>
      <div
        className={classNames('jk-popover-content bc-we jk-border-radius-inline', popoverContentClassName, { 'elevation-1': !showPopperArrow })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={outsideAlerterRef1}
      >
        {renderReactNodeOrFunctionP1(content, { isOpen, onClose: setOffVisible })}
      </div>
    </div>
  );
  
  
  if (isMobileViewPort) {
    return (
      <>
        <CustomComponent childProps={childProps}>
          {children}
        </CustomComponent>
        <Modal
          onClose={() => setOffVisible(0)}
          isOpen={isOpen}
          closeWhenClickOutside
          closeWhenKeyEscape
          className="small-viewport-popover"
        >
          {popoverContent}
        </Modal>
      </>
    );
  }
  
  return (
    <ReactPopover
      boundaryElement={jukiAppDiv}
      padding={marginOfChildren}
      isOpen={isOpen}
      positions={[ placementPositionAlign[placement].position, 'top', 'bottom', 'left', 'right' ]} // preferred positions by priority
      align={placementPositionAlign[placement].align}
      onClickOutside={() => {
        if (isTrigger(triggerOff, 'click')) {
          setOffVisible(0);
        }
      }}
      content={showPopperArrow ?
        (({ position, childRect, popoverRect }) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'var(--t-color-white)'}
            arrowSize={8}
            className="popover-arrow-container"
            arrowClassName="popover-arrow"
            style={{ filter: 'drop-shadow(0 0 2px var(--t-color-shadow-dark))' }}
          >
            {popoverContent}
          </ArrowContainer>
        )) : popoverContent
      }
    >
      <CustomComponent childProps={childProps}>
        {children}
      </CustomComponent>
    </ReactPopover>
  );
};
