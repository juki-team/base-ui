import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../constants';
import { isOverflowed } from '../helpers';

export interface WidthResizerProps {
  targetRef: RefObject<HTMLElement | null>,
  onOverflow: () => void,
  unOverflow: () => void,
  trigger?: number | string | ReactNode | (number | string | ReactNode)[],
}

export const useOverflowDetector = ({ onOverflow, unOverflow, trigger, targetRef }: WidthResizerProps) => {
  
  const { width = 0 } = useResizeDetector({ targetRef, ...RESIZE_DETECTOR_PROPS });
  const widthRef = useRef(0);
  useEffect(() => {
    const handleEvent = () => {
      if (width && targetRef.current) {
        if (isOverflowed(targetRef)) {
          widthRef.current = targetRef.current?.clientWidth;
          onOverflow();
        } else if (targetRef.current?.scrollWidth === targetRef.current?.clientWidth) {
          if (targetRef.current?.clientWidth > widthRef.current) {
            unOverflow();
          }
        }
      }
    };
    const timeoutId = setTimeout(handleEvent, 0);
    return () => clearTimeout(timeoutId);
  }, [ width, onOverflow, unOverflow, trigger, targetRef ]);
  
};
