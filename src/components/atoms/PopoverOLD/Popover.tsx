import React, { useState } from 'react';
import { classNames, isTrigger, renderChildrenWithProps, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useTriggerWrapper, useWindowSize } from '../../../hooks';
import { BoundingClientRectType } from '../../../types';
import { Div, Portal } from '../index';
import { PopoverProps } from './types';

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
    keepMounted = false,
    popoverContentClassName,
    marginOfChildren = 12, // --pad-t: 12px;
  } = props;
  
  const {
    isOpen,
    outsideAlerterRef1,
    outsideAlerterRef2,
    outsideAlerterRef3,
    childBoundingClientRect,
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
  
  // useEffect(() => { // Why? bad performance with this:
  //   const timeout = setTimeout(() => {
  //     if (isOpen) {
  //       if (!isTrigger(triggerOn, 'hover')) {
  //         setOnMouseEnterCounter(1);
  //       }
  //       setOffVisible(0);
  //       if (!isTrigger(triggerOn, 'hover')) {
  //         setOnMouseEnterCounter(0);
  //       } else {
  //         setOnMouseEnterCounter(onMouseEnterCounter);
  //       }
  //       setOnVisible(0);
  //     }
  //   }, 200);
  //   return () => clearTimeout(timeout);
  // }, [isOpen, setOffVisible, setOnVisible, onMouseEnterCounter, setOnMouseEnterCounter, triggerOn]);
  
  const [ boundingClientRectContent, _setBoundingClientRectContent ] = useState<BoundingClientRectType>({
    bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0,
  });
  
  const setBoundingClientRectContent = (newValue: BoundingClientRectType) => {
    if (JSON.stringify(newValue) !== JSON.stringify(boundingClientRectContent) && newValue?.width && newValue?.height) {
      _setBoundingClientRectContent(newValue);
    }
  };
  
  const { width: clientWidth, height: clientHeight } = useWindowSize();
  
  type styleType = { width: number, height: number, left: number, top: number };
  const style: styleType = {
    width: childBoundingClientRect.width,
    height: childBoundingClientRect.height,
    left: 0,
    top: 0,
  };
  const stylePointer: styleType = {
    width: childBoundingClientRect.width,
    height: childBoundingClientRect.height,
    left: 0,
    top: 0,
  };
  
  if (placement === 'topLeft' || placement === 'top' || placement === 'topRight') {
    style.top = childBoundingClientRect.top - childBoundingClientRect.height - marginOfChildren;
    style.left = childBoundingClientRect.left;
    stylePointer.top = childBoundingClientRect.top - 4 - marginOfChildren; // 4: height of div
    stylePointer.left = childBoundingClientRect.left;
    stylePointer.height = 4;
  } else if (placement === 'rightTop' || placement === 'right' || placement === 'rightBottom') {
    style.top = childBoundingClientRect.top;
    style.left = childBoundingClientRect.left + childBoundingClientRect.width + marginOfChildren;
    stylePointer.top = childBoundingClientRect.top;
    stylePointer.left = childBoundingClientRect.left + childBoundingClientRect.width + marginOfChildren;
    stylePointer.width = 4;
  } else if (placement === 'bottomRight' || placement === 'bottom' || placement === 'bottomLeft') {
    style.top = childBoundingClientRect.top + childBoundingClientRect.height + marginOfChildren;
    style.left = childBoundingClientRect.left;
    stylePointer.top = childBoundingClientRect.top + childBoundingClientRect.height + marginOfChildren;
    stylePointer.left = childBoundingClientRect.left;
    stylePointer.height = 4;
  } else if (placement === 'leftTop' || placement === 'left' || placement === 'leftBottom') {
    style.top = childBoundingClientRect.top;
    style.left = childBoundingClientRect.left - childBoundingClientRect.width - marginOfChildren; // 4: width of div
    stylePointer.top = childBoundingClientRect.top;
    stylePointer.left = childBoundingClientRect.left - 4 - marginOfChildren;
    stylePointer.width = 4;
  } else if (placement === 'center') {
    style.top = childBoundingClientRect.top;
    style.left = childBoundingClientRect.left;
  } else if (placement === 'centerScreen') {
    style.top = clientHeight / 2 - (style.height / 2);
    style.left = clientWidth / 2 - (style.width / 2);
  }
  const marginScreen = 8;
  
  // left and right overflow
  let left = 0;
  let right = 0;
  
  if (placement === 'top' || placement === 'bottom' || placement === 'center') {
    left = style.left + (style.width / 2) - (boundingClientRectContent.width / 2) - marginScreen;
    right = style.left + (style.width / 2) + (boundingClientRectContent.width / 2) + marginScreen;
  }
  if (placement === 'topLeft' || placement === 'bottomLeft') {
    right = style.left + boundingClientRectContent.width + marginScreen;
    left = style.left - marginScreen;
  }
  if (placement === 'topRight' || placement === 'bottomRight') {
    left = style.left + style.width - boundingClientRectContent.width - marginScreen;
    right = style.left + style.width + marginScreen;
  }
  if (placement === 'rightTop' || placement === 'right' || placement === 'rightBottom') {
    right = style.left + boundingClientRectContent.width + marginScreen;
  }
  if (placement === 'leftBottom' || placement === 'left' || placement === 'leftTop') {
    left = style.left + style.width - boundingClientRectContent.width - marginScreen;
  }
  
  // top and bottom overflow
  let top = 0;
  let bottom = 0;
  
  if (placement === 'right' || placement === 'left' || placement === 'center') {
    top = style.top + (style.height / 2) - (boundingClientRectContent.height / 2) - marginScreen;
    bottom = style.top + (style.height / 2) + (boundingClientRectContent.height / 2) + marginScreen;
  }
  if (placement === 'rightTop' || placement === 'leftTop') {
    bottom = style.top + boundingClientRectContent.height + marginScreen;
    top = style.top - marginScreen;
  }
  if (placement === 'rightBottom' || placement === 'leftBottom') {
    top = style.top + style.height - boundingClientRectContent.height - marginScreen;
    bottom = style.top + style.height + marginScreen;
  }
  if (placement === 'bottom' || placement === 'bottomLeft' || placement === 'bottomRight') {
    bottom = style.top + boundingClientRectContent.height + marginScreen;
  }
  if (placement === 'top' || placement === 'topLeft' || placement === 'topRight') {
    top = style.top + style.height - boundingClientRectContent.height - marginScreen;
  }
  
  const leftOverflow = left < 0 ? -left : 0;
  const rightOverflow = right > clientWidth ? right - clientWidth : 0;
  style.left += leftOverflow;
  style.left -= rightOverflow;
  
  let topOverflow = top < 0 ? -top : 0;
  let bottomOverflow = bottom > clientHeight ? bottom - clientHeight : 0;
  
  style.top += topOverflow;
  style.top -= bottomOverflow;
  
  const display = isOpen && !!childBoundingClientRect.width;
  
  return (
    <>
      {/*{renderChildrenWithProps(typeof children === 'function' ? children({*/}
      {/*  isOpen: display,*/}
      {/*  onClose: setOffVisible,*/}
      {/*}) : children, childProps(children))}*/}
      {renderChildrenWithProps(children, childProps(children))}
      {(keepMounted || display) && (
        <Portal className="jk-popover-portal">
          {isOpen && !isTrigger(triggerOn, 'hover') && (
            <div className="jk-popover-overlay transparent" onClick={() => setOffVisible(triggerOffDelayInMs.click)} />
          )}
          <Div
            className={classNames('jk-popover-layout-pointer-before', placement, { showPopperArrow, display })}
            style={stylePointer}
            transition
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={outsideAlerterRef3}
          />
          <Div
            className={classNames('jk-popover-layout', placement, { display })}
            style={style}
            ref={outsideAlerterRef1}
            transition
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div
              ref={e => setBoundingClientRectContent(e?.getBoundingClientRect()?.toJSON())}
              className={popoverClassName}
            >
              <div className={classNames('jk-popover-content bc-we jk-border-radius-inline jk-pg-sm', popoverContentClassName)}>
                {renderReactNodeOrFunctionP1(content, { isOpen, onClose: setOffVisible })}
              </div>
            </div>
          </Div>
          <Div
            className={classNames('jk-popover-layout-pointer-after', placement, { showPopperArrow, display })}
            ref={outsideAlerterRef2}
            style={stylePointer}
            transition
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </Portal>
      )}
    </>
  );
};
