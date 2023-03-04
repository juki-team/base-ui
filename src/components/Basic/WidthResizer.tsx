import { MutableRefObject, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { isOverflowed } from '../../helpers';

export interface WidthResizerProps {
  targetRef: MutableRefObject<any>,
  onOverflow: () => void,
  unOverflow: () => void,
  trigger: any,
}

export const WidthResizer = ({ onOverflow, unOverflow, trigger, targetRef }: WidthResizerProps) => {
  
  const { width = 0 } = useResizeDetector({ targetRef });
  const widthRef = useRef(0);
  useEffect(() => {
    if (width && targetRef.current) {
      if (isOverflowed(targetRef)) {
        widthRef.current = targetRef.current?.offsetWidth;
        onOverflow();
      } else if (targetRef.current?.scrollWidth === targetRef.current?.offsetWidth) {
        if (targetRef.current?.offsetWidth > widthRef.current) {
          unOverflow();
        }
      }
    }
  }, [width, onOverflow, unOverflow, trigger, targetRef]);
  
  return null;
};
