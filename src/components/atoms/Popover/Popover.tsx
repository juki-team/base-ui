import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { Transition } from 'motion';
import { Variants } from 'motion-dom';
import { AnimatePresence, motion } from 'motion/react';
import { cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { Duration } from '../../../enums';
import { isTrigger, renderReactNodeOrFunctionP1 } from '../../../helpers';

import { TriggerOnActionsType } from '../../types';
import { PopoverProps } from './types';

interface PopoverOptions {
  initialOpen?: boolean,
  placement?: Placement,
  modal?: boolean,
  open?: boolean,
  onOpenChange?: (open: boolean) => void,
  triggerOn?: TriggerOnActionsType | TriggerOnActionsType[],
  offset?: number,
  padding?: number,
}

export function usePopover({
                             initialOpen = false,
                             placement = 'bottom',
                             modal,
                             open: controlledOpen,
                             onOpenChange: setControlledOpen,
                             triggerOn = 'click',
                             offset: _offset,
                             padding = 4,
                           }: PopoverOptions) {
  const [ uncontrolledOpen, setUncontrolledOpen ] = useState(initialOpen);
  
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;
  
  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(_offset),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding,
      }),
      shift({ padding }),
    ],
  });
  
  const context = data.context;
  
  const click = useClick(context, {
    enabled: controlledOpen === undefined && isTrigger(triggerOn, 'click'),
  });
  const hover = useHover(context, {
    enabled: controlledOpen === undefined && isTrigger(triggerOn, 'hover'),
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  
  const interactions = useInteractions([ click, dismiss, hover, role ]);
  
  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      ...interactions,
      ...data,
      modal,
    }),
    [ isOpen, setIsOpen, interactions, data, modal ],
  );
}

const getPlacementVariants = (placement: Placement): Variants => {
  const common = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: Duration.FAST, ease: [ 0.25, 0.1, 0.25, 1 ] } as Transition,
    },
    exit: {
      opacity: 0,
      transition: { duration: Duration.NORMAL, ease: 'easeInOut' } as Transition,
    },
  };
  
  switch (placement) {
    case 'top-start':
      return {
        ...common,
        hidden: { ...common.hidden, scaleY: 0, scaleX: 0, transformOrigin: 'bottom left' },
        visible: { ...common.visible, scaleY: 1, scaleX: 1, transformOrigin: 'bottom left' },
        exit: { ...common.exit, scaleY: 0, scaleX: 0, transformOrigin: 'bottom left' },
      };
    case 'top-end':
      return {
        ...common,
        hidden: { ...common.hidden, scaleY: 0, scaleX: 0, transformOrigin: 'bottom right' },
        visible: { ...common.visible, scaleY: 1, scaleX: 1, transformOrigin: 'bottom right' },
        exit: { ...common.exit, scaleY: 0, scaleX: 0, transformOrigin: 'bottom right' },
      };
    case 'top':
      return {
        ...common,
        hidden: { ...common.hidden, scaleY: 0, transformOrigin: 'bottom' },
        visible: { ...common.visible, scaleY: 1, transformOrigin: 'bottom' },
        exit: { ...common.exit, scaleY: 0, transformOrigin: 'bottom' },
      };
    case 'bottom-start':
      return {
        ...common,
        hidden: { ...common.hidden, scaleY: 0, scaleX: 0, transformOrigin: 'top left' },
        visible: { ...common.visible, scaleY: 1, scaleX: 1, transformOrigin: 'top left' },
        exit: { ...common.exit, scaleY: 0, scaleX: 0, transformOrigin: 'top left' },
      };
    case 'bottom-end':
      return {
        ...common,
        hidden: { ...common.hidden, scaleY: 0, scaleX: 0, transformOrigin: 'top right' },
        visible: { ...common.visible, scaleY: 1, scaleX: 1, transformOrigin: 'top right' },
        exit: { ...common.exit, scaleY: 0, scaleX: 0, transformOrigin: 'top right' },
      };
    case 'bottom':
      return {
        ...common,
        hidden: { ...common.hidden, scaleY: 0, transformOrigin: 'top' },
        visible: { ...common.visible, scaleY: 1, transformOrigin: 'top' },
        exit: { ...common.exit, scaleY: 0, transformOrigin: 'top' },
      };
    case 'left-start':
      return {
        ...common,
        hidden: { ...common.hidden, scaleX: 0, scaleY: 0, transformOrigin: 'right top' },
        visible: { ...common.visible, scaleX: 1, scaleY: 1, transformOrigin: 'right top' },
        exit: { ...common.exit, scaleX: 0, scaleY: 0, transformOrigin: 'right top' },
      };
    case 'left-end':
      return {
        ...common,
        hidden: { ...common.hidden, scaleX: 0, scaleY: 0, transformOrigin: 'right bottom' },
        visible: { ...common.visible, scaleX: 1, scaleY: 1, transformOrigin: 'right bottom' },
        exit: { ...common.exit, scaleX: 0, scaleY: 0, transformOrigin: 'right bottom' },
      };
    case 'left':
      return {
        ...common,
        hidden: { ...common.hidden, scaleX: 0, transformOrigin: 'right' },
        visible: { ...common.visible, scaleX: 1, transformOrigin: 'right' },
        exit: { ...common.exit, scaleX: 0, transformOrigin: 'right' },
      };
    case 'right-start':
      return {
        ...common,
        hidden: { ...common.hidden, scaleX: 0, scaleY: 0, transformOrigin: 'left top' },
        visible: { ...common.visible, scaleX: 1, scaleY: 1, transformOrigin: 'left top' },
        exit: { ...common.exit, scaleX: 0, scaleY: 0, transformOrigin: 'left top' },
      };
    case 'right-end':
      return {
        ...common,
        hidden: { ...common.hidden, scaleX: 0, scaleY: 0, transformOrigin: 'left bottom' },
        visible: { ...common.visible, scaleX: 1, scaleY: 1, transformOrigin: 'left bottom' },
        exit: { ...common.exit, scaleX: 0, scaleY: 0, transformOrigin: 'left bottom' },
      };
    case 'right':
      return {
        ...common,
        hidden: { ...common.hidden, scaleX: 0, transformOrigin: 'left' },
        visible: { ...common.visible, scaleX: 1, transformOrigin: 'left' },
        exit: { ...common.exit, scaleX: 0, transformOrigin: 'left' },
      };
    default:
      return common;
  }
};

export function Popover({
                          children,
                          triggerOn = 'hover',
                          open,
                          onOpenChange,
                          placement = 'top',
                          content,
                          popoverClassName,
                          offset,
                          modal: _modal = false,
                        }: PopoverProps) {
  
  const {
    context: floatingContext,
    refs,
    floatingStyles,
    modal,
    getFloatingProps,
    isOpen,
    setIsOpen,
    getReferenceProps,
  } = usePopover({
    open,
    onOpenChange: typeof open === 'undefined' ? undefined : onOpenChange,
    modal: _modal,
    placement,
    initialOpen: false,
    triggerOn,
    offset,
  });
  const onOpenChangeRef = useRef(onOpenChange);
  
  onOpenChangeRef.current = onOpenChange;
  
  useEffect(() => {
    if (typeof open === 'undefined') {
      onOpenChangeRef.current?.(isOpen);
    }
  }, [ open, isOpen ]);
  
  return (
    <>
      {isValidElement(children) && cloneElement(children, {
        // @ts-ignore
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={floatingContext} modal={modal}>
              <div
                ref={refs.setFloating}
                style={{ ...floatingStyles, zIndex: 'var(--z-index-popover)' }}
                {...getFloatingProps()}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={getPlacementVariants(placement)}
                  className={popoverClassName}
                  style={{ maxHeight: 'calc(var(--vh, 1vh) * 90)', overflowY: 'auto' }}
                >
                  {renderReactNodeOrFunctionP1(content, { isOpen, onClose: () => setIsOpen(false) })}
                </motion.div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
}
