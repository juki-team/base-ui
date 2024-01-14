import { createContext } from 'react';
import { ViewPortSizeType } from '../../types';
import { Image } from './Image';
import { Link } from './Link';
import { UIComponentsContextInterface } from './types';

export interface UIContextInterface {
  jukiAppDiv: HTMLDivElement | undefined,
  viewPortSize: ViewPortSizeType,
  viewPortHeight: number,
  viewPortWidth: number,
  components: UIComponentsContextInterface,
}

export const UIContext = createContext<UIContextInterface>({
  jukiAppDiv: undefined,
  viewPortSize: '',
  viewPortHeight: 0,
  viewPortWidth: 0,
  components: { Image, Link },
});
