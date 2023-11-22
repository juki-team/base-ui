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
import { JukiUIProvider, JukiUIProviderProps } from './JukiUIProvider';
import { JukiUserProvider, JukiUserProviderProps } from './JukiUserProvider';

type JukiProvidersProps = JukiUIProviderProps & JukiUserProviderProps & {
  searchParam: {
    searchParams: URLSearchParams,
    appendSearchParams: AppendSearchParamsType,
    setSearchParams: SetSearchParamsType,
    deleteSearchParams: DeleteSearchParamsType,
  },
  pathname: string,
  routeParam: {
    routeParams: ParsedUrlQuery,
    routerPush: RouterFn<string>,
    routerReplace: RouterFn<string>
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
    searchParam,
    routeParam,
    pathname,
  } = props;
  
  return (
    <JukiRouterProvider
      searchParams={searchParam?.searchParams}
      appendSearchParams={searchParam?.appendSearchParams}
      setSearchParams={searchParam?.setSearchParams}
      deleteSearchParams={searchParam?.deleteSearchParams}
      routeParams={routeParam.routeParams}
      routerPush={routeParam.routerPush}
      routerReplace={routeParam.routerReplace}
      pathname={pathname}
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
            <DndProvider backend={HTML5Backend}>
              {children}
            </DndProvider>
          </JukiUIProvider>
        </JukiUserProvider>
      </JukiPageProvider>
    </JukiRouterProvider>
  )
}
