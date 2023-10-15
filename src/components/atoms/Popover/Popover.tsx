import React from 'react';
import {
  ArrowContainer,
  ContentRenderer,
  Popover as ReactPopover,
  PopoverAlign,
  PopoverPosition,
} from 'react-tiny-popover';
import { classNames, isTrigger, renderChildrenWithProps, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useTriggerWrapper } from '../../../hooks';
import { PlacementType, PopoverProps } from './types';

const placementPositionAlign: { [key in PlacementType]: { position: PopoverPosition, align: PopoverAlign } } = {
  topLeft: { position: 'top', align: 'start' },
  top: { position: 'top', align: 'center' },
  topRight: { position: 'top', align: 'end' },
  rightTop: { position: 'right', align: 'start' },
  right: { position: 'right', align: 'center' },
  rightBottom: { position: 'right', align: 'end' },
  bottomRight: { position: 'right', align: 'end' },
  bottom: { position: 'right', align: 'center' },
  bottomLeft: { position: 'right', align: 'start' },
  leftBottom: { position: 'left', align: 'end' },
  left: { position: 'right', align: 'center' },
  leftTop: { position: 'right', align: 'start' },
  center: { position: 'top', align: 'center' },
  centerScreen: { position: 'top', align: 'center' },
}

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
    triggerOff,
    triggerOnDelayInMs,
    triggerOffDelayInMs,
    withOutsideAlerter: !isTrigger(triggerOn, 'click'),
  });
  
  const popoverContent = (
    <div
      className={popoverClassName}
    >
      <div
        className={classNames('jk-popover-content bc-we jk-border-radius-inline jk-pad-sm', popoverContentClassName)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={outsideAlerterRef1}
      >
        {renderReactNodeOrFunctionP1(content, { isOpen, onClose: setOffVisible })}
      </div>
    </div>
  );
  
  return (
    <ReactPopover
      padding={marginOfChildren}
      isOpen={isOpen}
      positions={[ placementPositionAlign[placement].position, 'top', 'bottom', 'left', 'right' ]} // preferred positions by priority
      align={placementPositionAlign[placement].align}
      content={showPopperArrow ?
        (({ position, childRect, popoverRect }: ContentRenderer) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'blue'}
            arrowSize={8}
            // arrowStyle={{ opacity: 0.7 }}
            className="popover-arrow-container"
            arrowClassName="popover-arrow"
          >
            {popoverContent}
          </ArrowContainer>
        )) : popoverContent
      }
    >
      {renderChildrenWithProps(children, childProps(children))}
    </ReactPopover>
  )
};
