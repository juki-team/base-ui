import { ParsedUrlQuery } from 'querystring';
import { LastPathProviderProps } from './JukiLastPathProvider';
import {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  RouterFn,
  SetSearchParamsType,
} from './JukiRouterProvider/types';
import { JukiTProviderProps } from './JukiTProvider/types';
import { JukiUIProviderProps } from './JukiUIProvider/types';
import { JukiUserProviderProps } from './JukiUserProvider/types';

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

export * from './JukiRouterProvider/types';
export * from './JukiUIProvider';
