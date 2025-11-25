import { useFullscreen } from './useFullscreen';
import { useMouseInsidePage } from './useMouseInsidePage';
import { useOnline } from './useOnline';
import { usePageFocus } from './usePageFocus';
import { usePageVisibility } from './usePageVisibility';
import { useViewPortSize } from './useViewPortSize';

export const JukiPageInitializer = () => {
  
  useOnline();
  usePageVisibility();
  usePageFocus();
  useMouseInsidePage();
  useFullscreen();
  useViewPortSize();
  
  return null;
};
