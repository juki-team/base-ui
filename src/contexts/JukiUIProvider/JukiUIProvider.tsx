import { MotionConfig } from 'framer-motion';
import React, { FC, PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { LineLoader, NotificationProvider, T } from '../../components';
import { SoundProvider } from '../../components/organisms/Notifications/SoundProvider';
import { classNames } from '../../helpers';
import { useJukiRouter } from '../../hooks';
import { Duration, QueryParamKey } from '../../types';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { JukiUIProviderProps, LinkCmpProps } from './types';
import { useViewPortSize } from './useViewPortSize';

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const { viewPortSize, viewPortHeight, viewPortWidth } = useViewPortSize();
  const { searchParams } = useJukiRouter();
  const { Image: ImageCmp = Image, Link: LinkCMP = Link } = components || { Image, Link };
  const { isLoadingRoute } = useJukiRouter();
  
  const ref = useRef(null);
  
  const LinkCmp: FC<LinkCmpProps> = useCallback(({ href, ...restProps }) => {
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
    return <LinkCMP href={{ pathname, query: sp.toString() }} {...restProps} />;
  }, [ LinkCMP, searchParams ]);
  
  const value = useMemo(() => ({
    jukiAppDiv: ref.current ? ref.current : undefined,
    viewPortSize,
    viewPortHeight,
    viewPortWidth,
    components: { Image: ImageCmp, Link: LinkCmp },
  }), [ viewPortSize, viewPortHeight, viewPortWidth, ImageCmp, LinkCmp ]);
  
  return (
    <MotionConfig transition={{ duration: Duration.NORMAL }}>
      <UIContext.Provider value={value}>
        <SoundProvider>
          <NotificationProvider>
            {isLoadingRoute && <div className="page-line-loader"><LineLoader delay={800} /></div>}
            <div id="juki-app" className={classNames({ 'loading-route': isLoadingRoute })} ref={ref}>
              {/*<div className="loading-route-overlay" />*/}
              {children}
              <ReactTooltip
                id="jk-tooltip"
                opacity={1}
                // isOpen
                positionStrategy="fixed"
                clickable
                render={({ content, activeAnchor }) => (
                  content ?
                    <T className={activeAnchor?.getAttribute('data-tooltip-t-class-name') || 'tt-se tx-s'}>{content}</T> : null // Relevant attribute: { || 'not set'}
                )}
              />
            </div>
          </NotificationProvider>
        </SoundProvider>
      </UIContext.Provider>
    </MotionConfig>
  );
};
