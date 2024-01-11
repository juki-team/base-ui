import { createContext, MutableRefObject } from 'react';
import { ViewPortSizeType } from '../../types';
import { Image } from './Image';
import { Link } from './Link';
import { UIComponentsContextInterface } from './types';

export interface UIContextInterface {
  ref: MutableRefObject<any>,
  viewPortSize: ViewPortSizeType,
  viewPortHeight: number,
  viewPortWidth: number,
  components: UIComponentsContextInterface,
}

export const UIContext = createContext<UIContextInterface>({
  ref: null as unknown as MutableRefObject<any>,
  viewPortSize: '',
  viewPortHeight: 0,
  viewPortWidth: 0,
  components: { Image, Link },
});
