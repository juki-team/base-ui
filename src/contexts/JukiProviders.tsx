import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { JukiLastPathProvider } from './JukiLastPathProvider';
import { JukiPageProvider } from './JukiPageProvider';
import { JukiRouterProvider } from './JukiRouterProvider';
import { JukiTProvider } from './JukiTProvider';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { JukiProvidersProps } from './types';

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => {
  
  const {
    children,
    serviceApiUrl,
    socketServiceUrl,
    utilsUiUrl,
    tokenName,
    components,
    router,
    i18n,
    initialLastPath,
  } = props;
  
  const providers = (
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
      <JukiPageProvider>
        <JukiUserProvider
          socketServiceUrl={socketServiceUrl}
          serviceApiUrl={serviceApiUrl}
          utilsUiUrl={utilsUiUrl}
          tokenName={tokenName}
        >
          <JukiUIProvider components={components}>
            <JukiLastPathProvider initialLastPath={initialLastPath}>
              <DndProvider backend={HTML5Backend}>
                {children}
              </DndProvider>
            </JukiLastPathProvider>
          </JukiUIProvider>
        </JukiUserProvider>
      </JukiPageProvider>
    </JukiRouterProvider>
  );
  
  if (i18n) {
    return (
      <JukiTProvider i18n={i18n}>
        {providers}
      </JukiTProvider>
    );
  }
  
  return providers;
}
