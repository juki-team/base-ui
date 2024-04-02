import { ParsedUrlQuery } from 'querystring';
import { LastPathProviderProps } from './JukiLastPathProvider';
import { AppendSearchParamsType, DeleteSearchParamsType, RouterFn, SetSearchParamsType } from './JukiRouterProvider';
import { JukiTProviderProps } from './JukiTProvider';
import { JukiUIProviderProps } from './JukiUIProvider';
import { JukiUserProviderProps } from './JukiUserProvider';

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
