import React, { PropsWithChildren, useMemo, useRef } from 'react';
import { LineLoader, NotificationProvider } from '../../components';
import { classNames } from '../../helpers';
import { useJukiRouter } from '../../hooks';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { JukiUIProviderProps } from './types';
import { useViewPortSize } from './useViewPortSize';

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const { viewPortSize, viewPortHeight, viewPortWidth } = useViewPortSize();
  
  const { Image: ImageCmp = Image, Link: LinkCmp = Link } = components || { Image, Link };
  const { isLoadingRoute } = useJukiRouter();
  
  const ref = useRef(null);
  
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
