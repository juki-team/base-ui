import type { ParsedUrlQuery } from 'querystring';
import type {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  RouterFn,
  SetSearchParamsType,
} from '../components/types';
import type { LastPathProviderProps } from './JukiLastPathProvider/types';
import type { JukiUIProviderProps } from './JukiUIProvider/types';
import type { JukiUserProviderProps } from './JukiUserProvider/types';

export type JukiProvidersProps<T extends string | number> =
  JukiUIProviderProps
  & JukiUserProviderProps
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

export type * from './JukiUIProvider/types';
export type * from './JukiUserProvider/types';
