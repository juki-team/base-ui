import React, { useState } from 'react';
import { renderChildrenWithProps, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useTriggerWrapper } from '../../hooks';
import { DrawerView } from './DrawerView';
import { DrawerProps } from './types';

export const Drawer = ({
  content,
  children,
  triggerOn = 'click',
  triggerOnDelayInMs = { hover: 0, click: 0, none: 0 },
  position,
  closeIcon,
  closeOnEscape,
  closeOnOutside,
}: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  
  const { isOpen, childProps } = useTriggerWrapper({
    visible,
    onVisibleChange: setVisible,
    triggerOn: triggerOn,
    triggerOff: triggerOn,
    triggerOnDelayInMs,
    triggerOffDelayInMs: { hover: 0, click: 0, escape: 0, none: 0 },
  });
  
  const onClose = () => setVisible(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  const toggle = isOpen ? close : open;
  
  return (
    <>
      <DrawerView
        isOpen={isOpen}
        position={position}
        closeOnEscape={closeOnEscape}
        closeOnOutside={closeOnOutside}
        onClose={onClose}
        closeIcon={closeIcon}
      >
        {renderReactNodeOrFunctionP1(content, { isOpen, open, close, toggle })}
      </DrawerView>
      {typeof children === 'function' ?
        renderChildrenWithProps(children({ isOpen, open, close, toggle }), childProps(children({ isOpen, open, close, toggle }))) :
        renderChildrenWithProps(children, childProps(children))}
    </>
  );
};

export * from './DrawerView';