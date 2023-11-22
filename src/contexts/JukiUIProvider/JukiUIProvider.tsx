import React, { PropsWithChildren, useRef } from 'react';
import { LineLoader, NotificationProvider } from '../../components';
import { useJukiRouter } from '../../hooks';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { JukiUIProviderProps } from './types';
import { useViewPortSize } from './useViewPortSize';

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const viewPortSize = useViewPortSize();
  
  const { Image: ImageCmp = Image, Link: LinkCmp = Link } = components || { Image, Link };
  const { routeIsLoading } = useJukiRouter();
  
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
        <div id="juki-app" ref={ref}>
          {routeIsLoading && <div className="page-line-loader"><LineLoader delay={3} /></div>}
          {children}
        </div>
      </NotificationProvider>
    </UIContext.Provider>
  );
};
