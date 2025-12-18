import { CSSProperties, FC, HTMLAttributeAnchorTarget, MouseEventHandler, PropsWithChildren } from 'react';
import { UrlObject } from 'url';

export interface ImageCmpProps1 {
  src?: string,
  className?: string,
  alt: string,
  height: number,
  width: number,
  style?: CSSProperties,
  fill?: never,
}

export interface ImageCmpProps2 {
  src?: string,
  className?: string,
  alt: string,
  height?: never,
  width?: never,
  style?: CSSProperties,
  fill: true,
}

export type ImageCmpProps = ImageCmpProps1 | ImageCmpProps2;

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
  loaded: boolean,
}

export type OnSeeMyProfileType = (nickname: string, companyKey: string) => (Promise<void> | void);

export interface JukiUIProviderProps {
  components?: Partial<UIComponentsContextInterface>,
  multiCompanies: boolean,
  onSeeMyProfile: OnSeeMyProfileType,
}
