import { useFullscreen } from './useFullscreen';
import { useMouseInsidePage } from './useMouseInsidePage';
import { useOnline } from './useOnline';
import { usePageFocus } from './usePageFocus';
import { usePageVisibility } from './usePageVisibility';

export const JukiPageInitializer = () => {
  
  useOnline();
  usePageVisibility();
  usePageFocus();
  useMouseInsidePage();
  useFullscreen();
  
  return null;
};
