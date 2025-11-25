import { RefObject } from 'react';
import { create } from 'zustand';
import { Image } from '../../providers/JukiUIProvider/Image';
import { Link } from '../../providers/JukiUIProvider/Link';
import { UIComponentsContextInterface } from '../../providers/JukiUIProvider/types';

interface UIStore {
  jukiAppDivRef: RefObject<HTMLDivElement | null>,
  components: UIComponentsContextInterface,
  setProps: (props: Partial<Omit<UIStore, 'setProps'>>) => void,
}

export const useUIStore = create<UIStore>((set) => ({
  jukiAppDivRef: { current: null },
  components: { Image, Link, loaded: false },
  setProps: (props) => {
    set(props);
  },
}));
