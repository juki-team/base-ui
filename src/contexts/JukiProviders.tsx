import { ParsedUrlQuery } from 'querystring';
import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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


export type JukiProvidersProps = JukiUIProviderProps & JukiUserProviderProps & Partial<JukiTProviderProps> & {
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

export const JukiProviders = (props: PropsWithChildren<JukiProvidersProps>) => {
  
  const {
    children,
    serviceApiUrl,
    socketServiceUrl,
    utilsUiUrl,
    tokenName,
    components,
    router,
    t,
  } = props;
  
  return (
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
            <DndProvider backend={HTML5Backend}>
              <JukiTProvider t={t}>
                {children}
              </JukiTProvider>
            </DndProvider>
          </JukiUIProvider>
        </JukiUserProvider>
      </JukiPageProvider>
    </JukiRouterProvider>
  );
}
