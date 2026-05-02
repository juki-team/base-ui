import type { RefObject } from 'react';
import { create } from 'zustand';
import { Image } from '../../components/providers/server/Image/Image';
import { Link } from '../../components/providers/JukiUIProvider/Link';
import type { UIComponentsContextInterface } from '../../components/providers/JukiUIProvider/types';

interface UIStore {
  jukiAppDivRef: RefObject<HTMLDivElement | null>;
  components: UIComponentsContextInterface;
  setProps: (props: Partial<Omit<UIStore, 'setProps'>>) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  jukiAppDivRef: { current: null },
  components: { Image, Link, loaded: false },
  setProps: (props) => {
    set(props);
  },
}));
