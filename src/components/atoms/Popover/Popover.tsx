import React from 'react';
import { ArrowContainer, PopoverAlign, PopoverPosition } from 'react-tiny-popover';
import { classNames, isTrigger, renderChildrenWithProps, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../../hooks';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { Popover as ReactPopover } from './ReactTinyPopover.Popover';
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
    showPopperArrow = false,
    popoverContentClassName,
    marginOfChildren = 12, // --pad-t: 12px;
  } = props;
  
  const [ isOpen, setIsOpen ] = useHandleState(false, visible, onVisibleChange);
  
  const { jukiAppDivRef } = useJukiUI();
  // const isMobileViewPort = viewPortSize === 'sm';
  
  const popoverContent = (
    <div className={classNames('jk-popover-content jk-br-ie bc-we', popoverContentClassName)}>
      {renderReactNodeOrFunctionP1(content, { isOpen, onClose: () => setIsOpen(false) })}
    </div>
  );
  
  const childProps = ({
                        props: {
                          ref = undefined,
                          onMouseEnter = undefined,
                          onMouseLeave = undefined,
                          onClick = undefined,
                        } = {},
                      }: any) => ({
    ref: (e: any) => {
      ref?.(e);
    },
    onMouseEnter: (e: any) => {
      if (isTrigger(triggerOn, 'hover')) {
        setIsOpen(true);
      }
      onMouseEnter?.(e);
    },
    onMouseLeave: (e: any) => {
      if (isTrigger(triggerOff, 'hover')) {
        setIsOpen(false);
      }
      onMouseLeave?.(e);
    },
    onClick: (e: any) => {
      if (isTrigger(triggerOn, 'click')) {
        setIsOpen(prevState => !prevState);
      }
      onClick?.(e);
    },
  });
  
  // if (isMobileViewPort) {
  //   return (
  //     <>
  //       <CustomComponent childProps={childProps}>
  //         {children}
  //       </CustomComponent>
  //       <Modal
  //         onClose={(() => setIsOpen(false))}
  //         isOpen={isOpen}
  //         closeWhenClickOutside
  //         closeWhenKeyEscape
  //         className="small-viewport-popover"
  //       >
  //         {popoverContent}
  //       </Modal>
  //     </>
  //   );
  // }
  
  return (
    <ReactPopover
      boundaryElement={jukiAppDivRef.current ? jukiAppDivRef.current : undefined}
      padding={marginOfChildren}
      isOpen={isOpen}
      positions={[ placementPositionAlign[placement].position, 'top', 'bottom', 'left', 'right' ]} // preferred positions by priority
      align={placementPositionAlign[placement].align}
      onClickOutside={() => {
        if (isTrigger(triggerOff, 'click')) {
          setIsOpen(false);
        }
      }}
      showPopperArrow={showPopperArrow}
      content={showPopperArrow ?
        (({ position, childRect, popoverRect }) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'var(--t-color-white)'}
            arrowSize={8}
            className="popover-arrow-container jk-br-ie"
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
