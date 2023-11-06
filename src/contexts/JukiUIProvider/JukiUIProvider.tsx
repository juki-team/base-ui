import React, { PropsWithChildren, useRef } from 'react';
import { NotificationProvider } from '../../components';
import { UIContext } from './context';
import { Image } from './Image';
import { Link } from './Link';
import { JukiUIProviderProps } from './types';
import { useViewPortSize } from './useViewPortSize';

export const JukiUIProvider = ({ children, components }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const viewPortSize = useViewPortSize();
  
  const { Image: ImageCmp = Image, Link: LinkCmp = Link } = components || { Image, Link };
  
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
          {children}
        </div>
      </NotificationProvider>
    </UIContext.Provider>
  );
};
