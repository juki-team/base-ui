import { createContext, MutableRefObject } from 'react';
import { ViewPortSizeType } from '../../types';
import { Image } from './Image';
import { Link } from './Link';
import { UIComponentsContextInterface } from './types';

export interface UIContextInterface {
  ref: MutableRefObject<any>,
  viewPortSize: ViewPortSizeType,
  components: UIComponentsContextInterface,
}

export const UIContext = createContext<UIContextInterface>({
  ref: null as unknown as MutableRefObject<any>,
  viewPortSize: '',
  components: { Image, Link },
});
