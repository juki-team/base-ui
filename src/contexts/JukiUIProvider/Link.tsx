import React, { CSSProperties, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import { UrlObject } from 'url';

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
}

export const Link = (props: PropsWithChildren<LinkCmpProps>) => {
  const {
    href,
    children,
    className,
    style,
    target,
    rel,
  } = props;
  
  let url = '';
  if (typeof href === 'string') {
    url = href;
  } else {
    url = href.href || '';
  }
  
  return (
    <a href={url} className={className} style={style} target={target} rel={rel}>
      {children}
    </a>
  );
};
