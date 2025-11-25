import { MotionConfig } from 'motion/react';
import { type FC, type PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { LoginModal, SignUpModal, SubmissionModal, Tooltip, UserPreviewModal, WelcomeModal } from '../../components';
import { classNames } from '../../components/helpers';
import { LineLoader } from '../../components/server';
import { Duration } from '../../enums';
import { persistGlobalURLSearchParams } from '../../settings/AppRoutes';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { useUIStore } from '../../stores/ui/useUIStore';
import { NotificationProvider } from '../NotificationProvider/NotificationProvider';
import { Image } from './Image';
import { Link } from './Link';
import type { JukiUIProviderProps, LinkCmpProps } from './types';

export const JukiUIProvider = ({
                                 children,
                                 components,
                                 multiCompanies,
                                 onSeeMyProfile,
                               }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const { Image: ImageCmp = Image, Link: LinkCMP = Link } = components || { Image, Link };
  const isLoadingRoute = useRouterStore(state => state.isLoadingRoute);
  const ref = useRef<HTMLDivElement>(null);
  const setProps = useUIStore(store => store.setProps);
  const isLoaded = useUIStore(store => store.components.loaded);
  
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
  
  useEffect(() => {
    setProps({ components: { Image: ImageCmp, Link: LinkCmp, loaded: true } });
  }, [ ImageCmp, LinkCmp, setProps ]);
  useEffect(() => {
    setProps({ jukiAppDivRef: ref });
  }, [ ref, setProps ]);
  
  return (
    <MotionConfig transition={{ duration: Duration.NORMAL }}>
      <NotificationProvider>
        {isLoadingRoute && <div className="page-line-loader"><LineLoader delay={2} /></div>}
        <div id="juki-app" translate="no" className={classNames({ 'loading-route': isLoadingRoute })} ref={ref}>
          {/*<div className="loading-route-overlay" />*/}
          {isLoaded && (
            <>
              {children}
              <Tooltip />
              <SignUpModal />
              <LoginModal multiCompanies={multiCompanies} />
              <WelcomeModal onSeeMyProfile={onSeeMyProfile} />
              <UserPreviewModal />
              <SubmissionModal />
            </>
          )}
        </div>
      </NotificationProvider>
    </MotionConfig>
  );
};
