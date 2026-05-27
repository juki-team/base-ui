import { type ReactNode, type RefObject, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../constants';
import { isOverflowed } from '../helpers/commons';

export interface WidthResizerProps {
  targetRef: RefObject<HTMLElement | null>;
  onOverflow: () => void;
  unOverflow: () => void;
  trigger?: number | string | ReactNode | (number | string | ReactNode)[];
}

export const useOverflowDetector = ({ onOverflow, unOverflow, trigger, targetRef }: WidthResizerProps) => {
  const { width = 0 } = useResizeDetector({ targetRef, ...RESIZE_DETECTOR_PROPS });
  const widthRef = useRef(0);
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger is a custom render trigger from the consumer
  useEffect(() => {
    const handleEvent = () => {
      const target = targetRef.current;
      if (!target || width === 0) return;
      if (isOverflowed(targetRef)) {
        widthRef.current = target.clientWidth;
        onOverflow();
        return;
      }
      if (target.scrollWidth === target.clientWidth && target.clientWidth > widthRef.current) {
        unOverflow();
      }
    };
    const timeoutId = setTimeout(handleEvent, 0);
    return () => clearTimeout(timeoutId);
  }, [width, onOverflow, unOverflow, trigger, targetRef]);
};
