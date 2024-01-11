import { useEffect, useState } from 'react';
import { ViewPortSizeType } from '../../types';

export const useViewPortSize = () => {
  
  const [ viewPortSize, setViewPortSize ] = useState<ViewPortSizeType>('');
  const [ viewPortWidth, setViewPortWidth ] = useState(0);
  const [ viewPortHeight, setViewPortHeight ] = useState(0);
  
  useEffect(() => {
    const listener = () => {
      // First we get the viewport height and multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document?.documentElement.style.setProperty('--vh', `${vh}px`);
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewPortWidth(width);
      setViewPortHeight(height);
      if (width >= 1920) {
        setViewPortSize('hg');
      } else if (width >= 1280) {
        setViewPortSize('lg');
      } else if (width >= 640) {
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
  
  return { viewPortSize, viewPortWidth, viewPortHeight };
};
