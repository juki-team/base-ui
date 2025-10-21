import { PropsWithChildren } from 'react';
import { JukiAblyProvider } from './AblyProvider/AblyProvider';
import { JukiI18nProvider } from './JukiI18nProvider';
import { JukiLastPathProvider } from './JukiLastPathProvider';
import { JukiPageProvider } from './JukiPageProvider';
import { JukiRouterProvider } from './JukiRouterProvider';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { JukiProvidersProps } from './types';

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => {
  
  const {
    children,
    components,
    router,
    initialLastPath,
  } = props;
  
  return (
    <JukiPageProvider>
      <JukiI18nProvider>
        <JukiUserProvider>
          <JukiAblyProvider />
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
            <JukiUIProvider components={components}>
              <JukiLastPathProvider initialLastPath={initialLastPath}>
                {children}
              </JukiLastPathProvider>
            </JukiUIProvider>
          </JukiRouterProvider>
        </JukiUserProvider>
      </JukiI18nProvider>
    </JukiPageProvider>
  );
};
