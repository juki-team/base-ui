import React, { JSXElementConstructor, MutableRefObject, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export const WidthResizer = ({
  Component,
  onOverflow,
  unOverflow,
  trigger,
}: { Component: JSXElementConstructor<{ reference: MutableRefObject<any> }>, onOverflow: () => void, unOverflow: () => void, trigger: any }) => {
  const { width = 0, ref } = useResizeDetector();
  const widthRef = useRef(0);
  useEffect(() => {
    if (width && ref.current) {
      if (ref.current?.scrollWidth > ref.current?.offsetWidth) {
        widthRef.current = ref.current?.offsetWidth;
        onOverflow();
      } else if (ref.current?.scrollWidth === ref.current?.offsetWidth) {
        if (ref.current?.offsetWidth > widthRef.current) {
          unOverflow();
        }
      }
    }
  }, [width, onOverflow, unOverflow, trigger, ref]);
  console.log({ width, scrollWidth: ref.current?.scrollWidth, offsetWidth: ref.current?.offsetWidth });
  return (
    <Component reference={ref} />
  );
};
