import { MotionConfig } from 'motion/react';
import { type FC, lazy, type PropsWithChildren, Suspense, useCallback, useMemo, useRef } from 'react';
import { T } from '../../components/atoms/T/T';
import { usePageFocus } from '../../components/hooks/usePageFocus';
import { LineLoader } from '../../components/server';
import { Duration } from '../../enums';
import { classNames } from '../../helpers';
import { persistGlobalURLSearchParams } from '../../settings';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { NotificationProvider } from '../NotificationProvider/NotificationProvider';
import { SoundProvider } from '../SoundProvider/SoundProvider';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import type { JukiUIProviderProps, LinkCmpProps } from './types';
import { useViewPortSize } from './useViewPortSize';

const ReactTooltip = lazy(() => import('react-tooltip').then(module => ({ default: module.Tooltip })));

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  usePageFocus();
  const { viewPortSize, viewPortHeight, viewPortWidth } = useViewPortSize();
  const { Image: ImageCmp = Image, Link: LinkCMP = Link } = components || { Image, Link };
  const isLoadingRoute = useRouterStore(state => state.isLoadingRoute);
  const ref = useRef<HTMLDivElement>(null);
  
  const LinkCmp: FC<LinkCmpProps> = useCallback(({ href, ...restProps }) => {
    let pathname;
    let sp;
    if (typeof href === 'string') {
      const [ p, s ] = href.split('?');
      pathname = p;
      sp = new URLSearchParams(s);
    } else {
      pathname = href?.pathname ?? '';
      sp = new URLSearchParams('?' + (href?.query || ''));
    }
    
    const query = persistGlobalURLSearchParams(sp);
    
    return <LinkCMP href={{ pathname, query }} {...restProps} />;
  }, [ LinkCMP ]);
  
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
            {isLoadingRoute && <div className="page-line-loader"><LineLoader delay={2} /></div>}
            <div id="juki-app" translate="no" className={classNames({ 'loading-route': isLoadingRoute })} ref={ref}>
              {/*<div className="loading-route-overlay" />*/}
              {children}
              <Suspense>
                <ReactTooltip
                  id="jk-tooltip"
                  opacity={1}
                  // isOpen
                  positionStrategy="fixed"
                  clickable
                  // disableStyleInjection
                  render={({ content, activeAnchor }) => (
                    content ?
                      activeAnchor?.getAttribute('data-tooltip-t') === 'false'
                        ? content
                        :
                        <T className={activeAnchor?.getAttribute('data-tooltip-t-class-name') ?? 'tt-se tx-s'}>{content}</T>
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
