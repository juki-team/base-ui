import { MotionConfig } from 'motion/react';
import React, { FC, lazy, PropsWithChildren, Suspense, useCallback, useMemo, useRef } from 'react';
import { LineLoader } from '../../components/atoms/loaders';
import { T } from '../../components/atoms/T';
import { JukiLoadingLayout } from '../../components/molecules/layouts';
import { NotificationProvider } from '../../components/organisms/Notifications/NotificationProvider';
import { SoundProvider } from '../../components/organisms/Notifications/SoundProvider';
import { classNames } from '../../helpers';
import { useJukiRouter } from '../../hooks/useJukiRouter';
import { Duration, QueryParamKey } from '../../types';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { JukiUIProviderProps, LinkCmpProps } from './types';
import { useViewPortSize } from './useViewPortSize';

const ReactTooltip = lazy(() => import('react-tooltip').then(module => ({ default: module.Tooltip })));

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const { viewPortSize, viewPortHeight, viewPortWidth } = useViewPortSize();
  const { searchParams } = useJukiRouter();
  const { Image: ImageCmp = Image, Link: LinkCMP = Link } = components || { Image, Link };
  const { isLoadingRoute } = useJukiRouter();
  
  const ref = useRef<HTMLDivElement>(null);
  
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
    jukiAppDivRef: ref,
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
              <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
                <ReactTooltip
                  id="jk-tooltip"
                  opacity={1}
                  // isOpen
                  positionStrategy="fixed"
                  clickable
                  render={({ content, activeAnchor }) => (
                    content ?
                      <T className={activeAnchor?.getAttribute('data-tooltip-t-class-name') || 'tt-se tx-s'}>{content}</T>
                      : null // Relevant attribute: { || 'not set'}
                  )}
                />
              </Suspense>
            </div>
          </NotificationProvider>
        </SoundProvider>
      </UIContext.Provider>
    </MotionConfig>
  );
};
