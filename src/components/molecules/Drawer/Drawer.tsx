import type { MouseEvent, Ref } from 'react';
import { useState } from 'react';
import { TriggerAction } from '../../../enums';
import { isTrigger, renderChildrenWithProps, renderReactNodeOrFunctionP1 } from '../../helpers';
import { DrawerView } from '../_lazy_/DrawerView';
import type { DrawerProps } from './types';

type DrawerChildElement = {
  props?: {
    ref?: Ref<HTMLElement>;
    onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
  };
};

export function Drawer(props: DrawerProps) {
  const {
    content,
    children,
    triggerOn = TriggerAction.CLICK,
    // triggerOnDelayInMs = { hover: 0, click: 0, none: 0 },
    position,
    closeIcon,
    closeOnEscape,
    closeOnOutside,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  // const { isOpen, childProps } = useTriggerWrapper({
  //   visible,
  //   onVisibleChange: setVisible,
  //   triggerOn: triggerOn,
  //   triggerOff: triggerOn,
  //   triggerOnDelayInMs,
  //   triggerOffDelayInMs: { hover: 0, click: 0, escape: 0, none: 0 },
  // });

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const toggle = isOpen ? close : open;

  const childProps = ({
    props: {
      ref = undefined,
      onMouseEnter = undefined,
      // onMouseLeave = undefined,
      onClick = undefined,
    } = {},
  }: DrawerChildElement) => ({
    ref: (e: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(e);
      }
    },
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      if (isTrigger(triggerOn, TriggerAction.HOVER)) {
        setIsOpen(true);
      }
      onMouseEnter?.(e);
    },
    onClick: (e: MouseEvent<HTMLElement>) => {
      if (isTrigger(triggerOn, TriggerAction.CLICK)) {
        setIsOpen((prevState) => !prevState);
      }
      onClick?.(e);
    },
  });

  return (
    <>
      <DrawerView
        isOpen={isOpen}
        position={position}
        closeWhenKeyEscape={closeOnEscape}
        closeWhenClickOutside={closeOnOutside}
        onClose={close}
        closeIcon={closeIcon}
      >
        {renderReactNodeOrFunctionP1(content, { isOpen, onOpen: open, onClose: close, toggle })}
      </DrawerView>
      {typeof children === 'function'
        ? renderChildrenWithProps(
            children({ isOpen, onOpen: open, onClose: close, toggle }),
            childProps(
              children({
                isOpen,
                onOpen: open,
                onClose: close,
                toggle,
              }),
            ),
          )
        : renderChildrenWithProps(children, childProps(children))}
    </>
  );
}
