import React, { FC, PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import { LineLoader, NotificationProvider } from '../../components';
import { classNames } from '../../helpers';
import { useJukiRouter } from '../../hooks';
import { QueryParamKey } from '../../types';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { JukiUIProviderProps, LinkCmpProps } from './types';
import { useViewPortSize } from './useViewPortSize';

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const { viewPortSize, viewPortHeight, viewPortWidth } = useViewPortSize();
  const { searchParams } = useJukiRouter();
  const { Image: ImageCmp = Image, Link: _LinkCmp = Link } = components || { Image, Link };
  const { isLoadingRoute } = useJukiRouter();
  
  const ref = useRef(null);
  
  const LinkCmp: FC<LinkCmpProps> = useCallback(({ href, ...restProps }, ...rest) => {
    let pathname;
    let sp;
    if (typeof href === 'string') {
      const [ p, s ] = href.split('?');
      pathname = p;
      sp = new URLSearchParams(s);
    } else {
      pathname = href.pathname;
      sp = new URLSearchParams('?' + (href.query || ''));
    }
    const token = searchParams.get(QueryParamKey.TOKEN);
    if (token) {
      sp.set(QueryParamKey.TOKEN, token);
    }
    const company = searchParams.get(QueryParamKey.COMPANY);
    if (company) {
      sp.set(QueryParamKey.COMPANY, company);
    }
    return _LinkCmp({ href: { pathname, query: sp.toString() }, ...restProps }, ...rest);
  }, [ _LinkCmp, searchParams ]);
  
  const value = useMemo(() => ({
    jukiAppDiv: ref.current ? ref.current : undefined,
    viewPortSize,
    viewPortHeight,
    viewPortWidth,
    components: { Image: ImageCmp, Link: LinkCmp },
  }), [ viewPortSize, viewPortHeight, viewPortWidth, ImageCmp, LinkCmp ]);
  
  return (
    <UIContext.Provider value={value}>
      <NotificationProvider>
        {isLoadingRoute && <div className="page-line-loader"><LineLoader delay={1} /></div>}
        <div id="juki-app" className={classNames({ 'loading-route': isLoadingRoute })} ref={ref}>
          <div className="loading-route-overlay" />
          {children}
        </div>
      </NotificationProvider>
    </UIContext.Provider>
  );
};
