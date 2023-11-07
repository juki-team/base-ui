import React, { PropsWithChildren } from 'react';
import { JukiPageProvider } from './JukiPageProvider';
import { JukiRouterProvider, RouterContextInterface } from './JukiRouterProvider';
import { JukiUIProvider, JukiUIProviderProps } from './JukiUIProvider';
import { JukiUserProvider, JukiUserProviderProps } from './JukiUserProvider';

type JukiProvidersProps = JukiUIProviderProps & JukiUserProviderProps & { router?: RouterContextInterface };

export const JukiProviders = (props: PropsWithChildren<JukiProvidersProps>) => {
  
  const {
    children,
    serviceApiUrl,
    socketServiceUrl,
    utilsUiUrl,
    tokenName,
    components,
    router,
  } = props;
  
  return (
    <JukiRouterProvider
      searchParams={router?.searchParams}
      appendSearchParams={router?.appendSearchParams}
      setSearchParams={router?.setSearchParams}
      deleteSearchParams={router?.deleteSearchParams}
    >
      <JukiPageProvider>
        <JukiUserProvider
          socketServiceUrl={socketServiceUrl}
          serviceApiUrl={serviceApiUrl}
          utilsUiUrl={utilsUiUrl}
          tokenName={tokenName}
        >
          <JukiUIProvider
            components={components}
          >
            <div style={{ overflow: 'auto', height: '100%' }}>
              {children}
            </div>
          </JukiUIProvider>
        </JukiUserProvider>
      </JukiPageProvider>
    </JukiRouterProvider>
  )
}