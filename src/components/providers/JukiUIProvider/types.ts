import type { UrlObject } from 'node:url';
import type { CSSProperties, FC, HTMLAttributeAnchorTarget, MouseEventHandler, PropsWithChildren } from 'react';
import type { ImageCmpProps } from '../server/Image/types';

export type { ImageCmpProps, ImageCmpProps1, ImageCmpProps2 } from '../server/Image/types';

type Url = string | UrlObject;

export interface LinkCmpProps {
  href: Url;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  as?: Url;
  replace?: boolean;
  locale?: string | false;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  scroll?: boolean;
}

export interface UIComponentsContextInterface {
  Image: FC<ImageCmpProps>;
  Link: FC<PropsWithChildren<LinkCmpProps>>;
  loaded: boolean;
}

export type OnSeeMyProfileType = (nickname: string, organizationKey: string) => Promise<void> | void;

export interface JukiUIProviderProps {
  components?: Partial<UIComponentsContextInterface>;
  multiOrganizations: boolean;
  onSeeMyProfile: OnSeeMyProfileType;
}
