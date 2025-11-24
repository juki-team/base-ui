import { RefObject } from 'react';
import { create } from 'zustand';
import { ViewPortSizeType } from '../../components/types';
import { Image } from '../../providers/JukiUIProvider/Image';
import { Link } from '../../providers/JukiUIProvider/Link';
import { UIComponentsContextInterface } from '../../providers/JukiUIProvider/types';

interface UIStore {
  jukiAppDivRef: RefObject<HTMLDivElement | null>,
  viewPortSize: ViewPortSizeType,
  viewPortHeight: number,
  viewPortWidth: number,
  components: UIComponentsContextInterface,
  setProps: (props: Partial<Omit<UIStore, 'setProps'>>) => void,
}

export const useUIStore = create<UIStore>((set) => ({
  jukiAppDivRef: { current: null },
  viewPortSize: '',
  viewPortHeight: 0,
  viewPortWidth: 0,
  components: { Image, Link },
  setProps: (props) => {
    set(props);
  },
}));
