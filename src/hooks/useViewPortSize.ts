import { useEffect, useState } from 'react';
import { ViewPortSizeType } from '../components';

export const useViewPortSize = () => {
  
  const [viewPortSize, setViewPortSize] = useState<ViewPortSizeType>('sm');
  useEffect(() => {
    const listener = () => {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document?.documentElement.style.setProperty('--vh', `${vh}px`);
      const vw = window.innerWidth;
      if (vw >= 1920) {
        setViewPortSize('hg');
      } else if (vw >= 1280) {
        setViewPortSize('lg');
      } else if (vw >= 640) {
        setViewPortSize('md');
      } else {
        setViewPortSize('sm');
      }
    };
    listener();
    window?.addEventListener('resize', listener);
    return () => {
      window?.removeEventListener('resize', listener);
    };
  }, []);
  
  return viewPortSize;
};
