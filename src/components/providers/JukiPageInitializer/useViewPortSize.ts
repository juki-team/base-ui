import { useEffect } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import type { ViewPortSizeType } from '../../types';

export const useViewPortSize = () => {
  
  const setViewPort = usePageStore(store => store.setViewPort);
  
  useEffect(() => {
    // at most one store update per frame: resize fires continuously while dragging the window and on
    // mobile while the address bar shows/hides during scroll
    let frame = 0;
    const update = () => {
      frame = 0;
      // First we get the viewport height and multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document?.documentElement.style.setProperty('--vh', `${vh}px`);
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let size: ViewPortSizeType;
      if (width >= 1920) {
        size = 'hg';
      } else if (width >= 1280) {
        size = 'lg';
      } else if (width >= 640) {
        size = 'md';
      } else {
        size = 'sm';
      }
      setViewPort({
        screen: size,
        height,
        width,
        isSmallScreen: size === 'sm',
        isMediumScreen: size === 'md',
        isLargeScreen: size === 'lg',
        isHugeScreen: size === 'hg',
      });
    };
    const listener = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [ setViewPort ]);
};
