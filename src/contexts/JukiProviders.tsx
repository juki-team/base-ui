import React, { PropsWithChildren } from 'react';
import { JukiLastPathProvider } from './JukiLastPathProvider';
import { JukiPageProvider } from './JukiPageProvider';
import { JukiRouterProvider } from './JukiRouterProvider';
import { JukiTasksProvider } from './JukiTasksProvider/JukiTasksProvider';
import { JukiTProvider } from './JukiTProvider';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { JukiProvidersProps } from './types';

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => {
  
  const {
    children,
    serviceApiUrl,
    socketServiceUrl,
    serviceApiV2Url,
    tokenName,
    components,
    router,
    i18n,
    initialLastPath,
  } = props;
  
  return (
    <JukiPageProvider>
      <JukiTProvider i18n={i18n ?? null}>
        <JukiRouterProvider
          searchParams={router.searchParams}
          appendSearchParams={router.appendSearchParams}
          setSearchParams={router.setSearchParams}
          deleteSearchParams={router.deleteSearchParams}
          routeParams={router.routeParams}
          pushRoute={router.pushRoute}
          replaceRoute={router.replaceRoute}
          reloadRoute={router.reloadRoute}
          isLoadingRoute={router.isLoadingRoute}
          pathname={router.pathname}
        >
          <JukiUserProvider
            socketServiceUrl={socketServiceUrl}
            serviceApiUrl={serviceApiUrl}
            serviceApiV2Url={serviceApiV2Url}
            tokenName={tokenName}
          >
            <JukiUIProvider components={components}>
              <JukiLastPathProvider initialLastPath={initialLastPath}>
                <JukiTasksProvider>
                  {children}
                </JukiTasksProvider>
              </JukiLastPathProvider>
            </JukiUIProvider>
          </JukiUserProvider>
        </JukiRouterProvider>
      </JukiTProvider>
    </JukiPageProvider>
  );
};
