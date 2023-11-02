import { createContext, MutableRefObject } from 'react';
import { ViewPortSizeType } from '../../types';
import { Image } from './Image';
import { Link } from './Link';
import { UIComponentsContextInterface, UIRouterContextInterface } from './types';

export interface UIContextInterface {
  ref: MutableRefObject<any>,
  isOnline: boolean,
  isPageVisible: boolean,
  isPageFocus: boolean,
  viewPortSize: ViewPortSizeType,
  components: UIComponentsContextInterface,
  router: UIRouterContextInterface,
}

export const UIContext = createContext<UIContextInterface>({
  ref: null as unknown as MutableRefObject<any>,
  isOnline: true,
  isPageVisible: true,
  isPageFocus: true,
  viewPortSize: '',
  components: { Image, Link },
  router: {
    searchParams: new URLSearchParams(''),
    appendSearchParams: () => null,
    deleteSearchParams: () => null,
    setSearchParams: () => null,
  },
});