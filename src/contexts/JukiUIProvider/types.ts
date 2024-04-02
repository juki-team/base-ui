import { CSSProperties, FC, HTMLAttributeAnchorTarget, MouseEventHandler, PropsWithChildren } from 'react';
import { UrlObject } from 'url';

export interface ImageCmpProps {
  src?: string,
  className?: string,
  alt: string,
  height: number,
  width: number,
  style?: CSSProperties,
}

type Url = string | UrlObject;

export interface LinkCmpProps {
  href: Url,
  target?: HTMLAttributeAnchorTarget,
  rel?: string,
  as?: Url,
  replace?: boolean,
  locale?: string | false,
  className?: string,
  style?: CSSProperties,
  onClick?: MouseEventHandler<HTMLAnchorElement>,
  scroll?: boolean,
}

export interface UIComponentsContextInterface {
  Image: FC<ImageCmpProps>;
  Link: FC<PropsWithChildren<LinkCmpProps>>;
}

export interface JukiUIProviderProps {
  components?: Partial<UIComponentsContextInterface>,
}
