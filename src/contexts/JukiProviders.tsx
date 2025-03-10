import React, { PropsWithChildren, useEffect } from 'react';
import { useI18nStore } from '../stores';
import { JukiLastPathProvider } from './JukiLastPathProvider';
import { JukiPageProvider } from './JukiPageProvider';
import { JukiRouterProvider } from './JukiRouterProvider';
import { JukiTasksProvider } from './JukiTasksProvider/JukiTasksProvider';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { JukiWebsocketProvider } from './JukiWebsocketProvider';
import { JukiProvidersProps } from './types';

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => {
  
  const {
    children,
    components,
    router,
    initialLastPath,
  } = props;
  
  const i18nLoadResources = useI18nStore(state => state.loadResources);
  
  useEffect(() => {
    void i18nLoadResources();
  }, [ i18nLoadResources ]);
  
  return (
    <JukiPageProvider>
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
        <JukiUserProvider>
          <JukiWebsocketProvider>
            <JukiUIProvider components={components}>
              <JukiLastPathProvider initialLastPath={initialLastPath}>
                <JukiTasksProvider>
                  {children}
                </JukiTasksProvider>
              </JukiLastPathProvider>
            </JukiUIProvider>
          </JukiWebsocketProvider>
        </JukiUserProvider>
      </JukiRouterProvider>
    </JukiPageProvider>
  );
};
