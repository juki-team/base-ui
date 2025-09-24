import { createContext, RefObject } from 'react';
import { ViewPortSizeType } from '../../components/types';
import { Image } from './Image';
import { Link } from './Link';
import { UIComponentsContextInterface } from './types';

export interface UIContextInterface {
  jukiAppDivRef: RefObject<HTMLDivElement | null>,
  viewPortSize: ViewPortSizeType,
  viewPortHeight: number,
  viewPortWidth: number,
  components: UIComponentsContextInterface,
}

export const UIContext = createContext<UIContextInterface>({
  jukiAppDivRef: { current: null },
  viewPortSize: '',
  viewPortHeight: 0,
  viewPortWidth: 0,
  components: { Image, Link },
});
