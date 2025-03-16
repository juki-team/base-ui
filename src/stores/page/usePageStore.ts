import { create } from 'zustand';
import { getHandlerArgs } from '../../helpers/visibility';

interface PageState {
  isOnline: boolean,
  setOnline: (isOnline: boolean) => void,
  isVisible: boolean,
  setIsVisible: (isPageVisible: boolean) => void,
  isFocus: boolean,
  setIsFocus: (isFocus: boolean) => void,
}

export const usePageStore = create<PageState>((set) => ({
  isOnline: navigator.onLine,
  setOnline: (status) => set({ isOnline: status }),
  isVisible: getHandlerArgs()[0],
  setIsVisible: (status) => set({ isVisible: status }),
  isFocus: true,
  setIsFocus: (status) => set({ isFocus: status }),
}));
