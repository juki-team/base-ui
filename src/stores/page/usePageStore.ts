import { create } from 'zustand';
import { getHandlerArgs } from '../../components/helpers/visibility';
import type { ViewPortSizeType } from '../../components/types';

type ViewPort = {
  screen: ViewPortSizeType,
  height: number,
  width: number,
  isSmallScreen: boolean,
  isMediumScreen: boolean,
  isLargeScreen: boolean,
  isHugeScreen: boolean,
};

interface PageState {
  isOnline: boolean,
  setOnline: (isOnline: boolean) => void,
  isVisible: boolean,
  setIsVisible: (isVisible: boolean) => void,
  isFocus: boolean,
  setIsFocus: (isFocus: boolean) => void,
  isMouseInside: boolean,
  setIsMouseInside: (isMouseInside: boolean) => void,
  isFullscreen: boolean,
  setIsFullscreen: (isFullscreen: boolean) => void,
  viewPort: ViewPort,
  setViewPort: (viewPort: ViewPort) => void,
}

export const usePageStore = create<PageState>((set) => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : false,
  setOnline: (isOnline) => set({ isOnline }),
  isVisible: getHandlerArgs()[0],
  setIsVisible: (isVisible) => set({ isVisible }),
  isFocus: true,
  setIsFocus: (isFocus) => set({ isFocus }),
  isMouseInside: true,
  setIsMouseInside: (isMouseInside) => set({ isMouseInside }),
  isFullscreen: false,
  setIsFullscreen: (isFullscreen) => set({ isFullscreen }),
  viewPort: {
    screen: '',
    height: 0,
    width: 0,
    isSmallScreen: false,
    isMediumScreen: false,
    isLargeScreen: false,
    isHugeScreen: false,
  },
  setViewPort: (viewPort) => set({ viewPort }),
}));
