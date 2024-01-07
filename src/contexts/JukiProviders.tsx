import { ParsedUrlQuery } from 'querystring';
import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { JukiLastPathProvider, LastPathProviderProps } from './JukiLastPathProvider';
import { JukiPageProvider } from './JukiPageProvider';
import {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  JukiRouterProvider,
  RouterFn,
  SetSearchParamsType,
} from './JukiRouterProvider';
import { JukiTProvider, JukiTProviderProps } from './JukiTProvider';
import { JukiUIProvider, JukiUIProviderProps } from './JukiUIProvider';
import { JukiUserProvider, JukiUserProviderProps } from './JukiUserProvider';

export type JukiProvidersProps<T extends string | number> =
  JukiUIProviderProps
  & JukiUserProviderProps
  & Partial<JukiTProviderProps>
  & LastPathProviderProps<T>
  & {
  router: {
    searchParams: URLSearchParams,
    appendSearchParams: AppendSearchParamsType,
    setSearchParams: SetSearchParamsType,
    deleteSearchParams: DeleteSearchParamsType,
    pathname: string,
    routeParams: ParsedUrlQuery,
    pushRoute: RouterFn<string>,
    replaceRoute: RouterFn<string>,
    reloadRoute: RouterFn<void>,
    isLoadingRoute?: boolean,
  } | {
    searchParams?: never,
    appendSearchParams?: never,
    setSearchParams?: never,
    deleteSearchParams?: never,
    pathname: string,
    routeParams: ParsedUrlQuery,
    pushRoute: RouterFn<string>,
    replaceRoute: RouterFn<string>,
    reloadRoute: RouterFn<void>,
    isLoadingRoute?: boolean,
  }
};

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
