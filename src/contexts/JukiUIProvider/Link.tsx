import React, { PropsWithChildren } from 'react';
import { LinkCmpProps } from './types';

export const Link = (props: PropsWithChildren<LinkCmpProps>) => {
  
  const {
    href,
    children,
    className,
    style,
    target,
    rel,
  } = props;
  
  let url;
  if (typeof href === 'string') {
    url = href;
  } else {
    url = href.href || (href.pathname + '?' + href.query) || '';
  }
  
  return (
    <a href={url} className={className} style={style} target={target} rel={rel}>
      {children}
    </a>
  );
};
