'use client';

import { create } from 'zustand';
import { getHandlerArgs } from '../../helpers/visibility';

interface PageState {
  isOnline: boolean,
  setOnline: (isOnline: boolean) => void,
  isVisible: boolean,
  setIsVisible: (isVisible: boolean) => void,
  isFocus: boolean,
  setIsFocus: (isFocus: boolean) => void,
}

export const usePageStore = create<PageState>((set) => ({
  isOnline: navigator.onLine,
  setOnline: (isOnline) => set({ isOnline }),
  isVisible: getHandlerArgs()[0],
  setIsVisible: (isVisible) => set({ isVisible }),
  isFocus: true,
  setIsFocus: (isFocus) => set({ isFocus }),
}));
