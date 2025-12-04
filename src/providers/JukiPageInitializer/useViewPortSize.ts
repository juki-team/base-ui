import { useEffect } from 'react';
import type { ViewPortSizeType } from '../../components/types';
import { usePageStore } from '../../stores/page/usePageStore';

export const useViewPortSize = () => {
  
  const setViewPort = usePageStore(store => store.setViewPort);
  
  useEffect(() => {
    const listener = () => {
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
    listener();
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [ setViewPort ]);
};
