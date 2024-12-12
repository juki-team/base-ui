import { AnimatePresence, motion } from 'motion/react';
import React, {
  cloneElement,
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { PopoverPosition, PopoverState, usePopover } from 'react-tiny-popover';
import { useMemoizedArray } from '../../../hooks';
import { PopoverPortal } from './ReactTinyPopover.PopoverPortal';
import { useHandlePrevValues } from './ReactTinyPopover.useHandlePrevValues';
import { EMPTY_RECT, rectsAreEqual } from './ReactTinyPopover.util';
import { ReactTinyPopoverProps } from './types';

const DEFAULT_POSITIONS: PopoverPosition[] = [ 'top', 'left', 'right', 'bottom' ];

const PopoverInternal = forwardRef(
  (
    {
      isOpen,
      children,
      content,
      positions: externalPositions = DEFAULT_POSITIONS,
      align = 'center',
      padding: _padding = 0,
      // padding = 0,
      reposition = true,
      parentElement = window.document.body,
      boundaryElement = parentElement,
      containerClassName,
      containerStyle,
      transform,
      transformMode = 'absolute',
      boundaryInset = 0,
      onClickOutside,
      clickOutsideCapture = false,
      showPopperArrow,
    }: ReactTinyPopoverProps,
    externalRef: Ref<HTMLElement>,
  ) => {
    const padding = showPopperArrow ? _padding - 3 : _padding;
    const positions = useMemoizedArray(
      Array.isArray(externalPositions) ? externalPositions : [ externalPositions ],
    );
    
    const { prev, updatePrevValues } = useHandlePrevValues({
      positions,
      reposition,
      transformMode,
      transform,
      boundaryElement,
      boundaryInset,
    });
    
    const childRef = useRef<HTMLElement>(undefined);
    
    const [ popoverState, setPopoverState ] = useState<PopoverState>({
      align,
      nudgedLeft: 0,
      nudgedTop: 0,
      position: positions[0],
      padding,
      childRect: EMPTY_RECT,
      popoverRect: EMPTY_RECT,
      parentRect: EMPTY_RECT,
      boundaryRect: EMPTY_RECT,
      boundaryInset,
      violations: EMPTY_RECT,
      hasViolations: false,
    });
    
    const onPositionPopover = useCallback(
      (popoverState: PopoverState) => setPopoverState(popoverState),
      [],
    );
    
    const { positionPopover, popoverRef, scoutRef } = usePopover({
      isOpen,
      childRef,
      containerClassName,
      parentElement,
      boundaryElement,
      transform,
      transformMode,
      positions,
      align,
      padding,
      boundaryInset,
      reposition,
      onPositionPopover,
    });
    
    useLayoutEffect(() => {
      let shouldUpdate = true;
      const updatePopover = () => {
        if (isOpen && shouldUpdate) {
          const childRect = childRef?.current?.getBoundingClientRect();
          const popoverRect = popoverRef?.current?.getBoundingClientRect();
          if (
            childRect != null &&
            popoverRect != null &&
            (!rectsAreEqual(childRect, popoverState.childRect) ||
              popoverRect.width !== popoverState.popoverRect.width ||
              popoverRect.height !== popoverState.popoverRect.height ||
              popoverState.padding !== padding ||
              popoverState.align !== align ||
              positions !== prev.positions ||
              reposition !== prev.reposition ||
              transformMode !== prev.transformMode ||
              transform !== prev.transform ||
              boundaryElement !== prev.boundaryElement ||
              boundaryInset !== prev.boundaryInset)
          ) {
            positionPopover();
          }
          
          updatePrevValues();
          
          if (shouldUpdate) {
            window.requestAnimationFrame(updatePopover);
          }
        }
      };
      
      window.requestAnimationFrame(updatePopover);
      
      return () => {
        shouldUpdate = false;
      };
    }, [
      align,
      boundaryElement,
      boundaryInset,
      isOpen,
      padding,
      popoverRef,
      popoverState.align,
      popoverState.childRect,
      popoverState.padding,
      popoverState.popoverRect.height,
      popoverState.popoverRect.width,
      positionPopover,
      positions,
      prev.boundaryElement,
      prev.boundaryInset,
      prev.positions,
      prev.reposition,
      prev.transform,
      prev.transformMode,
      reposition,
      transform,
      transformMode,
      updatePrevValues,
    ]);
    
    useEffect(() => {
      const popoverElement = popoverRef.current;
      
      Object.assign(popoverElement.style, containerStyle);
      
      return () => {
        Object.keys(containerStyle ?? {}).forEach(
          (key) =>
            delete popoverElement.style[
              key as keyof Omit<typeof containerStyle, 'length' | 'parentRule'>
              ],
        );
      };
    }, [ containerStyle, isOpen, popoverRef ]);
    
    const handleOnClickOutside = useCallback(
      (e: MouseEvent) => {
        if (
          isOpen &&
          !popoverRef.current?.contains(e.target as Node) &&
          !childRef.current?.contains(e.target as Node)
        ) {
          onClickOutside?.(e);
        }
      },
      [ isOpen, onClickOutside, popoverRef ],
    );
    
    const handleWindowResize = useCallback(() => {
      if (childRef.current) {
        window.requestAnimationFrame(() => positionPopover());
      }
    }, [ positionPopover ]);
    
    useEffect(() => {
      const body = parentElement?.ownerDocument?.body;
      body?.addEventListener('click', handleOnClickOutside, clickOutsideCapture);
      body?.addEventListener('contextmenu', handleOnClickOutside, clickOutsideCapture);
      body?.addEventListener('resize', handleWindowResize);
      
      return () => {
        body?.removeEventListener('click', handleOnClickOutside, clickOutsideCapture);
        body?.removeEventListener('contextmenu', handleOnClickOutside, clickOutsideCapture);
        body?.removeEventListener('resize', handleWindowResize);
      };
    }, [ clickOutsideCapture, handleOnClickOutside, handleWindowResize, parentElement ]);
    
    const handleRef = useCallback(
      (node: HTMLElement) => {
        childRef.current = node;
        if (externalRef != null) {
          if (typeof externalRef === 'object') {
            (externalRef as React.MutableRefObject<HTMLElement>).current = node;
          } else if (typeof externalRef === 'function') {
            (externalRef as (instance: HTMLElement) => void)(node);
          }
        }
      },
      [ externalRef ],
    );
    
    const renderChild = () => cloneElement(children, { ref: handleRef } as ReactElement<{}>['props']);
    
    const isY = popoverState.position === 'bottom' || popoverState.position === 'top';
    const ANIMATION = {
      collapse: {
        initial: isY
          ? { height: 0, boxShadow: 'none', y: 0 }
          : { height: 0, boxShadow: 'none', x: 0 },
        show: {
          height: 'auto',
          width: 'auto',
          boxShadow: showPopperArrow ? undefined : '0 0 2px 0 var(--t-color-highlight-light), 0 1px 3px 1px var(--t-color-highlight-light)',
          y: 0,
          x: 0,
        },
        exit: isY
          ? {
            height: 0,
            boxShadow: 'none',
            y: popoverState.position === 'top' ? popoverState.popoverRect.height : showPopperArrow ? 3 : 0,
          }
          : {
            height: 0,
            boxShadow: 'none',
            x: 0,
            y: popoverState.align === 'start' ? 0 : popoverState.align === 'end' ? popoverState.popoverRect.height : popoverState.popoverRect.height / 2,
          },
      },
      fade: {
        initial: { opacity: 0 },
        show: { opacity: 1 },
        exit: { opacity: 0 },
      },
      expand: {
        initial: { scale: 0 },
        show: { scale: 1 },
        exit: { scale: 0 },
      },
    };
    
    return (
      <>
        {renderChild()}
        <PopoverPortal
          element={popoverRef.current}
          scoutElement={scoutRef.current}
          container={parentElement}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={showPopperArrow ? ANIMATION.expand.initial : ANIMATION.collapse.initial}
                animate={showPopperArrow ? ANIMATION.expand.show : ANIMATION.collapse.show}
                exit={showPopperArrow ? ANIMATION.expand.exit : ANIMATION.collapse.exit}
                className="jk-motion-popover-layout jk-br-ie"
                // style={{ margin: _padding }}
                style={showPopperArrow ? { padding: isY ? '3px  0' : '0 3px' } : {}}
              >
                {typeof content === 'function' ? content(popoverState) : content}
              </motion.div>
            )}
          </AnimatePresence>
        </PopoverPortal>
      </>
    );
  },
);

export const Popover = forwardRef<HTMLElement, ReactTinyPopoverProps>((props, ref) => {
  if (typeof window === 'undefined') return props.children;
  return <PopoverInternal {...props} ref={ref} />;
});
