import React, { PropsWithChildren, useRef } from 'react';
import { LineLoader, NotificationProvider } from '../../components';
import { classNames } from '../../helpers';
import { useJukiRouter } from '../../hooks';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { JukiUIProviderProps } from './types';
import { useViewPortSize } from './useViewPortSize';

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const viewPortSize = useViewPortSize();
  
  const { Image: ImageCmp = Image, Link: LinkCmp = Link } = components || { Image, Link };
  const { isLoadingRoute } = useJukiRouter();
  
  const ref = useRef(null);
  
  return (
    <UIContext.Provider
      value={{
        ref,
        viewPortSize,
        components: { Image: ImageCmp, Link: LinkCmp },
      }}
    >
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
