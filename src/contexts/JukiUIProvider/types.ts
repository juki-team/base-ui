import { FC, PropsWithChildren } from 'react';
import { ImageCmpProps } from './Image';
import { LinkCmpProps } from './Link';

export interface UIComponentsContextInterface {
  Image: FC<ImageCmpProps>;
  Link: FC<PropsWithChildren<LinkCmpProps>>;
}

export interface JukiUIProviderProps {
  components?: Partial<UIComponentsContextInterface>,
}
