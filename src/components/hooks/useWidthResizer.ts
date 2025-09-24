import { RefObject, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../constants';
import { isOverflowed } from '../../helpers';

export interface WidthResizerProps {
  targetRef: RefObject<any>,
  onOverflow: () => void,
  unOverflow: () => void,
  trigger?: any,
}

export const useWidthResizer = ({ onOverflow, unOverflow, trigger, targetRef }: WidthResizerProps) => {
  
  const { width = 0 } = useResizeDetector({ targetRef, ...RESIZE_DETECTOR_PROPS });
  const [ now, setNow ] = useState(0);
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
    setTimeout(handleEvent, 0);
  }, [ width, onOverflow, unOverflow, trigger, targetRef, now ]);
  
  useEffect(() => {
    const handleTrigger = () => setNow(Date.now());
    window.addEventListener('resize', handleTrigger);
    return () => {
      window.removeEventListener('resize', handleTrigger);
    };
  }, [ width, onOverflow, unOverflow, trigger, targetRef ]);
};
